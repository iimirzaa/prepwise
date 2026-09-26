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
    },
    async updateUser(user,field) {
    try {
        if(!user.id){
            return { success: false, status: 401, message: 'User not found' };
        }
        const updates = {};

        if (field.fullname) updates.fullname = field.fullname;
        if (field.email) updates.email = field.email;

        if (Object.keys(updates).length === 0) {
            return { success: false, status: 400, message: 'No valid fields to update' };
        }

        
        if (updates.email) {
            const existing = await userRepository.findByEmail(updates.email);
            console.log(existing._id +user.id)
            if (existing && existing._id.toString() !== user.id) {
                return { success: false, status: 409, message: 'Email is already in use' };
            }
        }

        const updatedUser =   await userRepository.updateUser(user.id, updates);
     

        if (!updatedUser) {
            return { success: false, status: 404, message: 'User not found' };
        }

        return {
            success: true,
            status: 200,
            message: 'Profile updated successfully',
            data: {
                fullname: updatedUser.fullname,
                email: updatedUser.email,
            },
        };
    } catch (err) {
        console.log(err);
        return { success: false, status: 500, message: 'Failed to update user profile' };
    }
}



};
