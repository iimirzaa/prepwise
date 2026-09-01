import authService from "../services/auth.service.js";
import Logger from "../utils/logger.js";
const authController = {
    async signUp(req, res) {
        try {
            Logger.debug("Sign Up Request", req.body);
            const response = await authService.signUp(req.body);
            return res.status(response.status).json({ success: response.success, message: response.message });

        } catch (e) {
            Logger.error("Error in signup controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }

    },
    async verfiyOtp(req, res) {
        try {
            Logger.debug("OTP VERIFY Request", req.body);
            const response = await authService.verifyOtp(req.body);
            return res.status(response.status).json({ success: response.success, message: response.message });


        } catch (e) {
            Logger.error("Error in verify Otp controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }

    },
    async refresh(req, res) {
        try {
            Logger.debug("Refresh Request", req.body);
            const response = await authService.refresh(req.body);
            return res.status(response.status).json({ success: response.success, message: response.message, access: response.access, refresh: response.refresh });


        } catch (e) {
            Logger.error("Error in Refresh controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }


    },
    async login(req, res) {
        try {
            Logger.debug("Login Request", req.body);
            const response = await authService.login(req.body);
            return res.status(response.status).json({ success: response.success, message: response.message, access: response.access, refresh: response.refresh });


        } catch (e) {
            Logger.error("Error in Login controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }
    },
    async logout(req, res) {

        try {
            Logger.debug("Logout Request", req.body);
            const response = await authService.logout(req.body);
            return res.status(response.status).json({ success: response.success, message: response.message, access: response.access, refresh: response.refresh });
            console.log(response);


        } catch (e) {
            Logger.error("Error in Logout controller", e);
            return res.status(501).json({ success: false, message: "Internal Server Error" });

        }
    }

}

export default authController;