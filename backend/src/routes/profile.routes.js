import express from 'express';
import { profileController } from '../controllers/profile.controller.js';
import { ProfileLimiter } from '../utils/rate_limiter.js';
import { uploadAvatar } from '../middlewares/uploadavatar.js';
import verifyToken from '../middlewares/tokenverifier.js';
const ProfileRouter=express.Router();
ProfileRouter.get('/me',ProfileLimiter,verifyToken,profileController.info);
ProfileRouter.post('/upload',ProfileLimiter,verifyToken,uploadAvatar.single('image'),profileController.uploadPic);
ProfileRouter.patch('/update',ProfileLimiter,verifyToken,profileController.updateUser)
export default ProfileRouter;