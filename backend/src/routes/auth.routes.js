import express from 'express';
import { AuthLimiter } from '../utils/rate_limiter.js';
import { validateSignup } from '../middlewares/signupvalidator.js';
import { validateOtp } from '../middlewares/otpvalidator.js';
import { validateLogin } from '../middlewares/loginvalidator.js';
import { validateToken } from '../middlewares/tokenvalidator.js';
import { validateEmail } from '../middlewares/emailvalidator.js';
import authController from '../controllers/auth.controller.js';
import { validateChangePassword } from '../middlewares/passwordvalidator.js';
const AuthRouter=express.Router();
AuthRouter.post('/signup',AuthLimiter,validateSignup,authController.signUp);
AuthRouter.post('/verifyotp',AuthLimiter,validateOtp,authController.verfiyOtp);
AuthRouter.post('/verifypasswordotp',AuthLimiter,validateOtp,authController.verifyOtp)
AuthRouter.post('/login',AuthLimiter,validateLogin,authController.login);
AuthRouter.post('/sendotp',AuthLimiter,validateEmail,authController.sendOtp);
AuthRouter.post('/changepassword',AuthLimiter,validateChangePassword,authController.changePassword);
AuthRouter.post('/refresh',AuthLimiter,validateToken,authController.refresh);
AuthRouter.post('/logout',AuthLimiter,authController.logout);

export default AuthRouter;