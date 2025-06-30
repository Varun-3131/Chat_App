import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";

export const signup=async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName||!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }
        if (password.length < 5) {
            return res.status(400).json({
                message: "Password must be more than 5 length..."
            })
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error In Signup controller",error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
}

export const login=async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(401).json({message:"Invalid Credentials"});
        }

        generateToken(user._id ,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })

    }catch (error) {
        console.log("Error Login Controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out"});
    }catch(error){
        console.log("Error Logout Controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}


export const updateProfile=async (req,res)=>{

}