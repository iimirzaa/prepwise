import express from 'express';
import { profileController } from '../controllers/profile.controller.js';
import { ProfileLimiter } from '../utils/rate_limiter.js';
const ProfileRouter=express.Router();
ProfileRouter.get('/me',profileController.info);
export default ProfileRouter;