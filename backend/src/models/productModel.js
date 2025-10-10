import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name:{
        tpye:String,
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
    isNew:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:false
    }
},{timestamps:true})

export const Product = new mongoose.Schema("Product",productSchema)