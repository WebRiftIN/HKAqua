import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

const verifyToken = async(req,res,next)=>{
    try {
const token =
      req.cookies?.accessToken || (req.headers.authorization? req.headers.authorization.replace("Bearer ", ""): null)
        if(!token){
            return res.status(401).json({success:false,message:"unauthorized access"})
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_TOKEN)

        const user = await User.findById(decodedToken._id).select("-password")
        if(!user){
            return res.status(401).json({success:false,message:"Invalid token"})
        }
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({success:false,message:"Token invalid or expired"})
    }
}

export default verifyToken