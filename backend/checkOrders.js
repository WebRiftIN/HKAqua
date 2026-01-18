const mongoose = require('mongoose');
require('dotenv').config();

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    productPrice: Number,
    image: String
  }],
  amount: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number,
  streetAddress: String,
  city: String,
  state: String,
  pinCode: Number,
  landMark: String,
  paymentMethod: String,
  status: { type: String, default: 'Order Placed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

async function checkOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const orders = await Order.find({});

    await mongoose.disconnect();
  } catch (error) {
    // Error handling left for now, as console.error is not console..log
  }
}

checkOrders();
