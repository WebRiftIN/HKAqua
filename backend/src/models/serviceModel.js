import mongoose,{Schema} from "mongoose";

const serviceSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    serviceType:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Service = mongoose.model("Service",serviceSchema)