import userRepository from "../repositories/user.repository.js";

import { hashPassword } from "../utils/passwordUtils.js";
import { requestOtp, verifyUserOtp } from "./otp.service.js";

const authService = {
    async signUp({ fullname, email, password }) {
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            if (existingUser.isVerified) {
                return {
                    status: 409,
                    success: false,
                    message: "User already exists",
                };
            }

            return requestOtp(email);
        }

        const hashedPassword = await hashPassword(password);

        try {
            await userRepository.create({
                fullname,
                email,
                password: hashedPassword,
            });
        } catch (err) {
            if (err.code === 11000) {
                return {
                    status: 409,
                    success: false,
                    message: "User already exists",
                };
            }
            throw err;
        }

        return requestOtp(email);

    },
    async verifyOtp({ email, otp }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "No account found with this email.",
            };
        }

        if (user.isVerified) {
            return {
                success: false,
                status: 400,
                message: "Account is already verified.",
            };
        }

        const response = await verifyUserOtp(email, otp);

        if (response.success !== true) {

            return response;
        }

        await user.updateOne({ isVerified: true });

        return {
            success: true,
            status: 200,
            message: "Account verified successfully.",
        };
    }
}
export default authService;