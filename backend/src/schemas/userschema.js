import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            match: /^[A-Za-z ]+$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false // won't be returned in queries by default
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;