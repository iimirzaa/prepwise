import { verifyAccessToken } from "../utils/tokenUtils.js";
import userRepository from "../repositories/user.repository.js";
export const profileService = {



    async info(accessToken ) {
        if (!accessToken) {
            return { success: false, status: 401, message: 'Access token is required' };
        }

        let decoded;
        try {
            decoded = verifyAccessToken(accessToken);
            if (decoded.success === false || decoded.message) {
           return res.status(401).json({ error: decoded.message || "Invalid token" });
}
          
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return { success: false, status: 401, message: 'Token expired' };
            }
           
            return { success: false, status: 401, message: 'Invalid token' };
        }

        const userId = decoded.id;
        console.log("id passed to findById:", JSON.stringify(userId), typeof userId, userId?.length);

        if (!userId) {
            return { success: false, status: 400, message: 'Token payload missing userId' };
        }

        try {
        
            const userDoc = await userRepository.findById(userId);
            console.log(userDoc)

            if (!userDoc) {
                return { success: false, status: 404, message: 'User not found' };
            }
            console.log(userDoc.toObject());
            const { password, ...safeData } = userDoc.toObject();

            return { success: true, status: 200, message: { id: userDoc.id, ...safeData } };
        } catch (err) {
            console.log(err)
            return { success: false, status: 500, message: 'Failed to fetch user profile' };
        }
    }



};
