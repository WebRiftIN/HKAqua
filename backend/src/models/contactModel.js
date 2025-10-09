import mongoose,{Schema} from "mongoose";

const contactSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    email:{
        type:String
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Contact = mongoose.model("Contact",contactSchema)