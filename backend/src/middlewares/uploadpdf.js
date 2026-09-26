import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinary.js';

const MAX_SIZE = 10 * 1024 * 1024; 
const TIMEOUT_MS = 45000;         

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export class UploadError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'UploadError';
    this.status = status;
  }
}

// 1) multer only parses and validates. Nothing goes to Cloudinary yet.
const uploadDocument = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE, files: 2 },
  fileFilter: (req, file, cb) => {
    console.log('Uploaded file:', { name: file.originalname, mimetype: file.mimetype });
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new UploadError('Only PDF, DOC, and DOCX files are allowed'), false);
    }
    cb(null, true);
  },
});

const parseFiles = uploadDocument.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'jobDescription', maxCount: 1 },
]);

// 2) upload one buffer to Cloudinary
const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'prepwise/documents',
        resource_type: 'raw',
        public_id: `${Date.now()}-${name}${ext}`,
        timeout: TIMEOUT_MS,
      },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.on('error', reject);
    
    stream.end(file.buffer);
  });

// 3) map any error to a status and a message the app can show
const sendError = (res, err) => {
  let status = 500;
  let message = 'Something went wrong while uploading. Please try again.';

  if (err instanceof multer.MulterError) {
    status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    message =
      {
        LIMIT_FILE_SIZE: `"${err.field === 'jobDescription' ? 'Job description' : 'Resume'}" is too large. Maximum size is 10MB.`,
        LIMIT_UNEXPECTED_FILE: `Unexpected file field "${err.field}".`,
        LIMIT_FILE_COUNT: 'Too many files uploaded.',
      }[err.code] || err.message;
  } else if (err instanceof UploadError) {
    status = err.status;
    message = err.message;
  } else if (err.http_code) {
    console.error('Cloudinary error:', err);
    status = 502;
    message = 'Could not save your file. Please try again in a moment.';
  } else {
    console.error('Upload error:', err);
  }

  if (!res.headersSent) res.status(status).json({ success: false, message });
};

export const handleUpload = (req, res, next) => {
  let finished = false;

  const timer = setTimeout(() => {
    if (finished) return;
    finished = true;
    console.error('Upload timed out');
    res.status(504).json({
      success: false,
      message: 'Upload timed out. Please check your connection and try again.',
    });
  }, TIMEOUT_MS);

  req.on('aborted', () => {
    finished = true;
    clearTimeout(timer);
  });

  parseFiles(req, res, async (err) => {
    if (finished) return;
    if (err) {
      finished = true;
      clearTimeout(timer);
      if (err.message === 'Request aborted') return;
      return sendError(res, err);
    }

    try {
      for (const field of ['resume', 'jobDescription']) {
        const file = req.files?.[field]?.[0];
        if (!file) continue;
        const result = await uploadToCloudinary(file);
        file.cloudinaryUrl = result.secure_url;
        file.publicId = result.public_id;
      }
      if (finished) return; // timed out while uploading
      finished = true;
      clearTimeout(timer);
      next();
    } catch (e) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      sendError(res, e);
    }
  });
};