import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    website: String,
    username: String,
    password: String
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,

    passwords: [passwordSchema]

}, { timestamps: true });

export default mongoose.model("User", userSchema);