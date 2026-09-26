import Interview from '../schemas/interviewschema.js';

const interviewRepository = {
    create: (data, options) => Interview.create([data], options),

    findById: (id) => Interview.findById(id),

    findByIdForUser: (id, userId) => Interview.findOne({ _id: id, userId }),

    findByUser: (userId, options = {}) =>
        Interview.find({ userId })
            .sort({ createdAt: -1 })
            .limit(options.limit ?? 20)
            .skip(options.skip ?? 0),

    updateStatus: (id, status, options) =>
        Interview.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, ...options }
        ),

    updateResult: (id, result, options) =>
        Interview.findByIdAndUpdate(
            id,
            { $set: { result, status: 'completed' } },
            { new: true, ...options }
        ),

    deleteById: (id, userId) => Interview.findOneAndDelete({ _id: id, userId }),
};

export default interviewRepository;