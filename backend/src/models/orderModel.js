import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    userId:{
        type: String,
        required:true
    },
    cartItems:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    landMark:{
        type:String,
        required:false
    },
    paymentMethod:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:false,
        default:'Order Placed'
    },
    expectedDelivery:{
        type:Date,
        required:false
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)