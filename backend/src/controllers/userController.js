import { User } from "../models/userModel.js";

const generateAccess = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        return accessToken
    } catch (error) {
        return res.json({message:"something went wrong"})
    }
}

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    if ([name, email, password].some((field) => !field || field.trim() === "")) {
        return res.json({ success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        return res.json({success:false,message:"user already exists"})
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = await generateAccess(user._id)
    const options = {
        httpOnly: true,
        secure: false
    }
    

    const userCreated = await User.findById(user._id).select("-password")
    if(!userCreated){
        return res.json({success:false,message:"something went wrong"})
    }
    res.cookie("accessToken", token, options).json({success:true,message:"user registred successfully",token,user:userCreated})
    // return res.json({success:true,message:"user registred successfully",token})
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success:false,message:"email or password is required"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.json({success:false,message:"user not exists"})
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token = await generateAccess(user._id)
    const options = {
        httpOnly: true,
        secure: false
    }
    const safeUser = await User.findById(user._id).select("-password")
    res.cookie("accessToken", token, options).json({ success: true, message: "user loggedIn", token, user: safeUser});
}

export {registerUser,loginUser}