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

const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({})
        return res.json({success:true,orders})
    } catch (error) {
        return res.json({success:false,message:"Something went wrong"})
    }
}

const getAllContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find({}).sort({createdAt:-1})
        return res.json({success:true,contacts})
    } catch (error) {
        return res.json({success:false,message:"Something went wrong"})
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({ success: false, message: "Order ID and status are required" });
        }

        const updateData = { status };

        // If status is being changed to 'cancelled', set the cancelledDate
        if (status === 'cancelled') {
            updateData.cancelledDate = new Date();
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        return res.json({ success: true, message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.json({ success: false, message: error.message });
    }
};

const updateDeliveryInfo = async (req, res) => {
    try {
        const { orderId, deliveryDate } = req.body;

        if (!orderId) {
            return res.json({ success: false, message: "Order ID is required" });
        }

        const updateData = {};
        if (deliveryDate) {
            updateData.expectedDelivery = new Date(deliveryDate);
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        return res.json({ success: true, message: "Delivery information updated successfully", order });
    } catch (error) {
        console.error("Error updating delivery info:", error);
        return res.json({ success: false, message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.json({ success: false, message: "Order ID is required" });
        }

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        return res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.json({ success: false, message: error.message });
    }
};

export {adminLogin,getAllOrders,getAllContacts,updateOrderStatus,updateDeliveryInfo,deleteOrder}
