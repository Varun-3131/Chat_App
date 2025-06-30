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
        default: "",
    },

},
    {
        timestamps: true,
    }
)

const user = mongoose.model("User", userSchema);

export default user;


