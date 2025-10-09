import { Contact } from "../models/contactModel.js";

const contactUs = async(req,res)=>{
    const {name,phoneNumber,email,subject,message} = req.body;
    if ([name,phoneNumber,subject,message].some((field) => !field || field.trim() === "")) {
        return res.json({ success: false, message: "All mandatory fields are required" });
    }

    const customer = await Contact.create({
        name,
        phoneNumber,
        email,
        subject,
        message
    })
    const serviceCreated = await Contact.findById(customer._id).select("-name -phoneNumber")
    if(!serviceCreated){
        return res.json({success:false,message:"Something went wrong. Try again"})
    }
    return res.json({success:true,message:"Your service is booked"})
}

export {contactUs}