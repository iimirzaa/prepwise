import express from 'express';
import { AuthLimiter } from '../utils/rate_limiter.js';
import Logger from '../utils/logger.js';
const AuthRouter=express.Router();
AuthRouter.post('/signup',AuthLimiter);
AuthRouter.post('/login',(req,res)=>{
    Logger.debug("Login request received");
     res.status(200).json({
        message: 'Login request received'
    });
})
export default AuthRouter;