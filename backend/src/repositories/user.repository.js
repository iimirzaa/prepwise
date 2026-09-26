import User from '../schemas/userschema.js';

const userRepository = {
       updateUser:(userId,data)=>
        User.findByIdAndUpdate(
            userId,
            {$set: data},
            {new:true,runValidator:true}
        ).select('-password -isVerified'),
      
      updateAvatar: (userId, { avatarUrl, avatarPublicId }) =>
        User.findByIdAndUpdate(
            userId,
            { avatarUrl, avatarPublicId },
            { new: true }
        ).select('avatarUrl avatarPublicId'),
    findByEmail: (email,options) => User.findOne({ email }, null, options).select('+password'),

    findById: (id) => User.findById(id).select('-password -isVerified'),

    create: (data) => User.create(data),

    async updatePasswordByEmail(email, hashedPassword, options) {
        return await User.updateOne(
            { email },
            { $set: { password: hashedPassword } },
            options
        );
    },

    async markAsVerified(userId, options) {
        return await User.updateOne(
            { _id: userId },
            { $set: { isVerified: true } },
            options
        );
    },

    async incrementTokenVersion(userId, options) {
        return await User.updateOne(
            { _id: userId },
            { $inc: { tokenVersion: 1 } },
            options
        );
    },
};

export default userRepository;