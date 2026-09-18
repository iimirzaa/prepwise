import { verifyAccessToken } from "../utils/tokenUtils.js";
import userRepository from "../repositories/user.repository.js";
export const profileService = {



    async info(decodedToken) {


        let decoded = decodedToken


        const userId = decoded.id;


        if (!userId) {
            return { success: false, status: 401, message: 'Token payload missing userId' };
        }

        try {

            const userDoc = await userRepository.findById(userId);
            console.log(userDoc)

            if (!userDoc) {
                return { success: false, status: 404, message: 'User not found' };
            }

            const { password, ...safeData } = userDoc.toObject();

            return { success: true, status: 200, message: { id: userDoc.id, ...safeData } };
        } catch (err) {

            return { success: false, status: 500, message: 'Failed to fetch user profile' };
        }
    },


    async uploadPic(user, file) {
        try {
            if (!file) {
                console.log("No file found")
                return { success: false, status: 400, message: 'No image Uploaded' };
            }

            const existing = await userRepository.findById(user.id);
            if (!existing) {
                return { success: false, status: 404, message: 'User not found' };
            }
            if (existing?.avatarPublicId) {
                await cloudinary.uploader.destroy(existing.avatarPublicId).catch(() => { });
            }

            const dbuser = await userRepository.updateAvatar(user.id, {
                avatarUrl: file.path,
                avatarPublicId: file.filename,
            });

            return { success: true, status: 200, message: "Image Updated", url: dbuser.avatarUrl, publicId: dbuser.avatarPublicId };
        } catch (err) {
            console.log(err);
            return { success: false, status: 500, message: 'Failed to upload picture' };
        }
    }



};
