import express from 'express';
import { AuthLimiter } from '../utils/rate_limiter.js';
import Logger from '../utils/logger.js';
import { validateSignup } from '../middlewares/signupvalidator.js';
const AuthRouter=express.Router();
AuthRouter.post('/signup',AuthLimiter,validateSignup);
AuthRouter.post('/login',(req,res)=>{
    Logger.debug("Login request received");
     res.status(200).json({
        message: 'Login request received'
    });
})
export default AuthRouter;