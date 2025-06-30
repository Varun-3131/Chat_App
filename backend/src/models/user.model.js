import mongoose from "mongoose";

const  userSchema = new mongoose.Schema(
    {
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    fullName:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        default: "https://avatars1.githubusercontent.com/u/64?v=4",
    },

},
    {
        timestamps: true,
    }
)

const user = mongoose.model("User", userSchema);

export default user;


