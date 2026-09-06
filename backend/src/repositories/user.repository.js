import User from '../schemas/userschema.js';
const userRepository = {
    findByEmail: (email) => User.findOne({ email }).select('+password'),
    findById: (id) => User.findById({ id }).select('-password'),
    create: (data) => User.create(data),

    async updatePasswordByEmail(email, hashedPassword,options) {
        return await User.updateOne(
            { email },
            { $set: { password: hashedPassword } },
            options
        );
    }


};
export default userRepository;
