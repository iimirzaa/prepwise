import { profileService } from "../services/profile.service.js";
import Logger from "../utils/logger.js";
export const profileController={
    async info(req, res) {
        try {
            
            Logger.debug("Profile Info request",req.user);
        
            const response = await profileService.info(req.user);
            return res.status(response.status).json({ success: response.success, message: response.message });

        } catch (e) {
            Logger.error("Error in Profile controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }

    },
    async uploadPic(req, res) {
        try {
            
            Logger.debug("Profile Picture  request",req.file);
          
            const response = await profileService.uploadPic(req.user,req.file);
            return res.status(response.status).json({ success: response.success, message: response.message });

        } catch (e) {
            Logger.error("Error in Profile  Picture controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }

    },

};