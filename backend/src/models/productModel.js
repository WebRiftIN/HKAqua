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
    description:{
        type:String,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    orignalPrice:{
        type:Number,
        required:true
    },
    specifications:{
        type:[String],
        default:[]
    },
    isNewProduct:{
        type:Boolean,
        default:false
    },
    isLimited:{
        type:Boolean,
        default:false
    },
    isOutOfStock:{
        type:Boolean,
        default:false
    },
    isInactive:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:false
    }
},{timestamps:true})

export const Product =  mongoose.model("Product",productSchema)