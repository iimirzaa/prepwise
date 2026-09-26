import { interviewService } from "../services/interview.service.js";
import Logger from "../utils/logger.js";
export const interviewController={
 async generateQuestion(req,res){
       try {
            
            Logger.debug("Generate Question request",req.body);
        
            const response = await interviewService.generateMcqs(req.user,req.files,req.body);
            return res.status(response.status).json({ success: response.success, message: response.message });

        } catch (e) {
            Logger.error("Error in Question controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }
 }

};