import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';

const verifyJWT = async(req,_,next)=>{
    try {
       const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ","")
       if(!token){
          return res.json({success:false,message:"unauthorized request"})
      }
       const decodedToken = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        const user = await User.findById(decodedToken?._id).select("-password")
       if(!user){
                    return res.json({success:true,message:"invalid access token"})
                        }
        req.user = user
        next()
    } catch (error) {
        res.json(error.message)
   }
}

export default verifyJWT