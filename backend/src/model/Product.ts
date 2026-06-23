import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  isDigital: { type: Boolean, default: false },
  price: { type: Number, required: true },
  status: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
  material: { type: String, required: false },
  image: { type: String, required: true },
  url: { type: String, required: false },
  description: { type: String, required: false },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);