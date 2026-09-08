import { profileService } from "../services/profile.service.js";
import Logger from "../utils/logger.js";
export const profileController={
    async info(req, res) {
        try {
            
            Logger.debug("Profile Info request",req.headers);
            const authHeader=req.headers.authorization;

            const token= authHeader.split(" ")[1];
            console.log(token);
            const response = await profileService.info(token);
            return res.status(response.status).json({ success: response.success, message: response.message });

        } catch (e) {
            Logger.error("Error in Profile controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }

    },

};