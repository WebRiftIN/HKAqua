import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        index:true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,"password is required"]
    },
    cartData:{
        type: Object,
        default:{}
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_TOKEN,{expiresIn:"30m"})
}

userSchema.methods.generateRefreshToken =function(){
    return jwt.sign({_id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:"7d"})
}

export const User = mongoose.model("User",userSchema)