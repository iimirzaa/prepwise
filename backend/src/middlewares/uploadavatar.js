import multer from 'multer';
import {CloudinaryStorage}  from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
console.log('cloudinary config:', cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'prepwise/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    // public_id: `${req.user.id}-${Date.now()}`,
    // transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }],
    overwrite: true,
  }),
});

export const uploadAvatar = multer({
  
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

