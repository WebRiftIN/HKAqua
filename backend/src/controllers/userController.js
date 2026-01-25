import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const generateAccess = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        return accessToken
    } catch (error) {
        return res.json({message:"something went wrong"})
    }
}

const generateRefresh = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()
        return refreshToken
    } catch (error) {
        throw new Error("Failed to generate refresh token");
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
    const refreshToken = await generateRefresh(user._id)
    const options = {
        httpOnly: true,
        secure: false
    }
    user.refreshToken = refreshToken
    await user.save()

    const userCreated = await User.findById(user._id).select("-password")
    if(!userCreated){
        return res.json({success:false,message:"something went wrong"})
    }
    res.cookie("accessToken", token, options).cookie("refreshToken",refreshToken,options).json({success:true,message:"user registred successfully",token,user:userCreated})
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
    const refresh = await generateRefresh(user._id)
    user.refreshToken = refresh
    await user.save()
    const options = {
        httpOnly: true,
        secure: false
    }
    const safeUser = await User.findById(user._id).select("-password")
    res.cookie("accessToken", token, options).cookie("refreshToken",refresh,options).json({ success: true, message: "user loggedIn", token, user: safeUser});
}

const logout = async(req,res) =>{
    try {
        res.clearCookie("accessToken",{httpOnly:true,sameSite:"lax",secure:false}).clearCookie("refreshToken",{httpOnly:true,sameSite:"lax",secure:false})
        return res.status(200).json({success:true,message:"logout successfully"})
    } catch (error) {
        return res.status(401).json({success:false,message:"something went wrong"})
    }
}

const refreshAccessToken = async(req,res)=>{
    const refreshToken = req.cookies?.refreshToken
    if(!refreshToken){
        return res.status(401).json({success:false,message:"login required"})
    }
    try {
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)
        const user = await User.findById(decoded._id)
        if(user.refreshToken!==refreshToken){
            return res.json({success:false,message:"Invalid refresh token"})
        }
        const newAccessToken = jwt.sign({_id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:"30m"})
        return res.cookie("accessToken",newAccessToken,{httpOnly:true,secure:false}).json({success:true,message:"new token generated successfully"})
    } catch (error) {
        return res.json({success:false,message:"session expired"})
    }
}

export {registerUser,loginUser,logout,refreshAccessToken}