import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        default: "" // Optional field with default empty string
    },
    isApprove: {
        type: Boolean,
        default: false,
    },
});

const adminTable = mongoose.models.adminData || mongoose.model("adminData", userSchema);

export default adminTable;
