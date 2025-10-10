import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    orignalPrice:{
        type:Number,
        required:true
    },
    features:{
        type:[String],
        default:[]
    },
    isNewProduct:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Product =  mongoose.model("Product",productSchema)