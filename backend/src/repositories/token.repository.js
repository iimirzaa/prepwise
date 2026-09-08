import Token from "../schemas/refreshtokenschema.js";

const tokenRepository = {
    create: (data) => Token.create(data),
    findOne: (filter) => Token.findOne(filter),
    findById: (id) => Token.findById(id),

    deleteById: (id, options) => Token.findByIdAndDelete(id, options),

    async deleteAllByUserId(userId, options) {
        return await Token.deleteMany({ userId }, options);
    }
};

export default tokenRepository;