import { Order } from "../models/orderModel.js";

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

    // ✅ Create order
    const order = await Order.create({
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
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }

    return res.json({ success: true, message: "Order Placed", orderId: order._id });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { placeOrder };
