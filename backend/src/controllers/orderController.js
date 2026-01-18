import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";

const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      amount,
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      pinCode,
      landMark,
      paymentMethod,
    } = req.body;

    // ✅ Validate only string fields using trim
    const stringFields = [firstName, streetAddress, city, state, paymentMethod];
    for (const field of stringFields) {
      if (!field || typeof field !== "string" || field.trim() === "") {
        return res.json({ success: false, message: "All  fields are required" });
      }
    }

    // ✅ Validate other required fields
    if (!userId || !phoneNumber || !pinCode) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // ✅ Prepare items with product details
    const items = [];
    for (const [itemId, itemData] of Object.entries(cartItems)) {
      let productId = itemId;
      let quantity = itemData.quantity || itemData;
      let name = itemData.name || '';
      let productPrice = 0;
      let image = '';

      // Handle addons (warranty or maintenance)
      if (itemId.startsWith('warranty:') || itemId.startsWith('maintenance:')) {
        const [type, prodId] = itemId.split(':');
        productId = prodId;
        const product = await Product.findById(prodId);
        if (product) {
          productPrice = type === 'warranty' ? 500 : 1000; // Example prices, adjust as needed
          image = product.image;
          if (!name) {
            name = type === 'warranty'
              ? `Extended Warranty for ${product.name}`
              : `Annual Maintenance for ${product.name}`;
          }
        }
      } else {
        // Regular product
        const product = await Product.findById(itemId);
        if (product) {
          productPrice = product.discountedPrice;
          image = product.image;
          if (!name) {
            name = product.name;
          }
        }
      }

      items.push({
        productId,
        quantity,
        productPrice,
        name,
        image,
      });
    }

    // ✅ Create order
    const order = await Order.create({
      userId,
      items,
      amount,
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      pinCode,
      landMark,
      paymentMethod,
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
    await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });
    return res.json({ success: true, message: "Order Placed", orderId: order._id });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const getOrder = async(req,res) =>{
  try {
          const {userId} = req.params;

    if(!userId){
      return res.json({success:false,message:"User ID is required"})
    }
    const orders = await Order.find({userId}).sort({createdAt:-1}).populate('items.productId', 'name image discountedPrice originalPrice');
    if(!orders || orders.length===0){
      return res.json({success:false,message:"No orders found"})
    }
    return res.json({success:true,orders})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.body; // Assuming userId is sent in body for authentication

    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized to cancel this order" });
    }

    // Check if order can be cancelled (only pending or processing)
    if (order.status !== 'pending' && order.status !== 'processing' && order.status !== 'Order Placed') {
      return res.json({ success: false, message: "Order cannot be cancelled at this stage" });
    }

    // Update order status and cancelled date
    order.status = 'cancelled';
    order.cancelledDate = new Date();
    order.cancelledBy = 'user';
    await order.save();

    return res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orderId || !status) {
      return res.json({ success: false, message: "Order ID and status are required" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    order.status = status;
    if (status === 'cancelled') {
      order.cancelledDate = new Date();
      order.cancelledBy = 'admin';
    }
    await order.save();
    return res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    // Always return a valid JSON response
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

export { placeOrder, getOrder, cancelOrder, updateOrderStatus };
