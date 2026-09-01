import userRepository from "../repositories/user.repository.js";
import tokenRepository from "../repositories/token.repository.js";
import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/passwordUtils.js";
import { generateAccessToken, generateRefreshToken, hashToken, verifyRefreshToken, verifyToken } from "../utils/tokenUtils.js";
import { requestOtp, verifyUserOtp } from "./otp.service.js";
import jwt from 'jsonwebtoken';

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
    },
    async login({ email, password }) {
        const user = await userRepository.findByEmail(email).select("+password");

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "No account found with this email.",
            };
        }
        if (!user.isVerified) {
            return {
                success: false,
                status: 404,
                message: "Please verify your email.",
            };
        }
        if (user.isVerified) {
            if (await verifyPassword(user.password, password)) {
                const tokenId = new mongoose.Types.ObjectId();

                const payload = { id: user.id, username: user.fullname, email: user.email };
                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken({ ...payload, jti: tokenId.toString() });

                const { exp } = jwt.decode(refreshToken);
                const refreshHash = await hashToken(refreshToken);
                await tokenRepository.create({
                    _id:tokenId,
                    userId: user.id,
                    tokenHash: refreshHash,
                    expiresAt: new Date(exp * 1000),

                });

                return {
                    success: true,
                    status: 200,
                    message: "Login Successful.",
                    access: accessToken,
                    refresh: refreshToken
                };
            }
        }

    },
    async refresh({ token }) {
        if (!token) {
            return {
                success: false,
                status: 401,
                message: "No refresh token provided.",
            };
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (e) {
            return {
                success: false,
                status: 401,
                message: "Invalid or expired refresh token.",
            };
        }

        const user = await userRepository.findById(decoded.id).select("+tokenHash +expiresAt");

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "No account found.",
            };
        }

        if (!user.tokenHash || await verifyToken(user.tokenHash, token)) {
            return {
                success: false,
                status: 401,
                message: "Refresh token not recognized. Please log in again.",
            };
        }

        if (user.expiresAt < new Date()) {
            return {
                success: false,
                status: 401,
                message: "Refresh token expired. Please log in again.",
            };
        }

        const payload = { id: user.id, username: user.fullname, email: user.email };
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        user.tokenHash = hashToken(newRefreshToken);
        user.expiresAt = new Date(jwt.decode(newRefreshToken).exp * 1000);
        await user.save();

        return {
            success: true,
            status: 200,
            access: newAccessToken,
            refresh: newRefreshToken,
        };
    },
    async logout({ token }) {
        if (!token) {
            return {
                success: false,
                status: 400,
                message: "No refresh token provided.",
            };
        }


        const decoded = verifyRefreshToken(token);
        if (!decoded || !decoded.jti) {
            return { success: false, status: 401, message: "Invalid or expired refresh token." };
        }

        // find candidate token doc(s) for this user, not yet revoked
        const tokenDoc = await tokenRepository.findOne({ _id: decoded.jti, revoked: false });
        console.log(tokenDoc)

        if (!tokenDoc || !(await verifyToken(tokenDoc.tokenHash, token))) {
            return {
                success: false,
                status: 404,
                message: "Refresh token not found.",
            };
        }

        tokenDoc.revoked = true;
        await tokenDoc.save();

        return {
            success: true,
            status: 200,
            message: "Logged out successfully.",
        };
    }
}
export default authService;