import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please give name"],
        unique: true
    },
    lastName: {
        type: String,
        required: [true, "please give name"],
        
    },
    email: {
        type: String,
        required: [true, "please give name"]
    },
    
});

// Check if model exists before creating
const User = mongoose.models.employee || mongoose.model("employee", userSchema);
export default User;





