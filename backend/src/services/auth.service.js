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

         
            const payload = {
                id: user.id,
                username: user.fullname,
                email: user.email,
                tokenVersion: user.tokenVersion,
            };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken({ ...payload, jti: tokenId.toString() });

            const { exp } = jwt.decode(refreshToken);
            const refreshHash = await hashToken(refreshToken);
            await tokenRepository.create({
                _id: tokenId,
                userId: user.id,
                tokenHash: refreshHash,
                expiresAt: new Date(exp * 1000),
            });

            return {
                success: true,
                status: 200,
                message: "Login Successful.",
                access: accessToken,
                refresh: refreshToken,
            };
        } else {
            return {
                success: false,
                status: 401,
                message: "Incorrect Password.",
            };
        }
    }
},
  async refresh({ refreshToken }) {
    console.log("Trying to refresh");
    if (!refreshToken) {
        return {
            success: false,
            status: 401,
            message: "No refresh token provided.",
        };
    }

    let decoded;
    try {
        decoded = verifyRefreshToken(refreshToken);
    } catch (e) {
        console.log(e);
        return {
            success: false,
            status: 401,
            message: "Invalid or expired refresh token.",
        };
    }

    const tokenDoc = await tokenRepository.findById(decoded.jti).select("+tokenHash +expiresAt");

    if (!tokenDoc) {
        return {
            success: false,
            status: 401,
            message: "Refresh token not recognized. Please log in again.",
        };
    }

    const isValid = tokenDoc.tokenHash && (await verifyToken(tokenDoc.tokenHash, refreshToken));
    if (!isValid) {
        return {
            success: false,
            status: 401,
            message: "Refresh token not recognized. Please log in again.",
        };
    }

    if (tokenDoc.expiresAt < new Date()) {
        return {
            success: false,
            status: 401,
            message: "Refresh token expired. Please log in again.",
        };
    }

    const user = await userRepository.findById(tokenDoc.userId).select("+tokenVersion");
    if (!user) {
        return {
            success: false,
            status: 404,
            message: "No account found.",
        };
    }

    console.log(decoded);
    console.log(user);
    if (decoded.tokenVersion !== user.tokenVersion) {
        return {
            success: false,
            status: 401,
            message: "Session expired. Please log in again.",
        };
    }

    const newTokenId = new mongoose.Types.ObjectId();
    const payload = {
        id: user.id,
        username: user.fullname,
        email: user.email,
        tokenVersion: user.tokenVersion,
    };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken({ ...payload, jti: newTokenId.toString() });

    const newHash = await hashToken(newRefreshToken);
    const { exp } = jwt.decode(newRefreshToken);

    await tokenRepository.deleteById(tokenDoc._id);
    await tokenRepository.create({
        _id: newTokenId,
        userId: user.id,
        tokenHash: newHash,
        expiresAt: new Date(exp * 1000),
    });

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


        const tokenDoc = await tokenRepository.findById( decoded.jti);
        console.log(tokenDoc)

        if (!tokenDoc || !(await verifyToken(tokenDoc.tokenHash, token))) {
            return {
                success: false,
                status: 404,
                message: "Refresh token not found.",
            };
        }

        await tokenDoc.updateOne({ revoked: true });

        return {
            success: true,
            status: 200,
            message: "Logged out successfully.",
        };
    },
    async sendOtp({ email }) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "No account found.",
            };
        }

        if (!user.isVerified) {
            return {
                success: false,
                status: 403,
                message: "Please verify your email.",
            };
        }
        return await requestOtp(email);
    },
   async changePassword({ email, otp, password }) {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        return {
            success: false,
            status: 404,
            message: "No account found.",
        };
    }

    const response = await verifyUserOtp(email, otp);

    if (response.success !== true) {
        return response;
    }

    const hashedPassword = await hashPassword(password);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await userRepository.updatePasswordByEmail(
            email,
            hashedPassword,
            { session }
        );

       
        await userRepository.incrementTokenVersion(
            user._id,
            { session }
        );

        await tokenRepository.deleteAllByUserId(
            user._id,
            { session }
        );

        if (!user.isVerified) {
            await userRepository.markAsVerified(
                user._id,
                { session }
            );
        }

        await session.commitTransaction();

        return {
            success: true,
            status: 200,
            message: "Password changed successfully.",
        };

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {
        session.endSession();
    }
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
}
export default authService;