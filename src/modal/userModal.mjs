import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name : {
        type: String,
        require: true,
    },
    password : {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ["admin","manager", "user"]
    }
}, 
{
    timestamps: true,
})

const UserModal = mongoose.model('User', userSchema);
export default UserModal;