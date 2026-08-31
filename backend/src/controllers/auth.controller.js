import authService from "../services/auth.service.js";
import Logger from "../utils/logger.js";
const authController={
    async signUp(req,res){
        try{
          Logger.debug("Sign Up Request",req.body);
          const response=await authService.signUp(req.body);
          return res.status(response.status).json({success:response.success,message:response.message});
          
        }catch(e){
            Logger.error("Error in signup controller",e);
            return res.status(501).json({success:false,message:"Internal Server Error"});

        }

    },
    async verfiyOtp(req,res){
         try{
          Logger.debug("OTP VERIFY Request",req.body);
          const response=await authService.verifyOtp(req.body);
          return res.status(response.status).json({success:response.success,message:response.message});

          
        }catch(e){
            Logger.error("Error in verify Otp controller",e);
            return res.status(501).json({success:false,message:"Internal Server Error"});

        }

    }
}
export default authController;