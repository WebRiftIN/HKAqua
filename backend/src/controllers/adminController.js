import jwt from 'jsonwebtoken'
import { Order } from '../models/orderModel.js'
import { Contact } from '../models/contactModel.js'

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Email or password is incorrect" })
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET_TOKEN)
        const options = {
            httpOnly: true,
            secure: false
        }
        return res.cookie("accessToken",token,options).json({success:true,message:"LogedIn successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const getAllContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find({}).sort({createdAt:-1})
        return res.json({success:true,contacts})
    } catch (error) {
        return res.json({success:false,message:"Something went wrong"})
    }
}

export {adminLogin,getAllOrders,getAllContacts}