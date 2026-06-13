import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true } 
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
  },

  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true }, // The final amount paid

  razorpayOrderId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Created', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Created' 
  },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);