import express from 'express';
import { AuthLimiter } from '../utils/rate_limiter.js';
import Logger from '../utils/logger.js';
import { validateSignup } from '../middlewares/signupvalidator.js';
import { validateOtp } from '../middlewares/otpvalidator.js';
import { validateLogin } from '../middlewares/loginvalidator.js';
import { validateToken } from '../middlewares/tokenvalidator.js';
import authController from '../controllers/auth.controller.js';
const AuthRouter=express.Router();
AuthRouter.post('/signup',AuthLimiter,validateSignup,authController.signUp);
AuthRouter.post('/verifyotp',AuthLimiter,validateOtp,authController.verfiyOtp)
AuthRouter.post('/login',AuthLimiter,validateLogin,authController.login);
AuthRouter.post('/sendotp',AuthLimiter,validateLogin,authController.login);
AuthRouter.post('/changepassword',AuthLimiter,validateLogin,authController.login);
AuthRouter.post('/refresh',AuthLimiter,validateToken,authController.refresh);
AuthRouter.post('/logout',AuthLimiter,authController.logout);

export default AuthRouter;