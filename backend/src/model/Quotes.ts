import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    projectType: { type: String, required: true },
    material: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    quantity: { type: Number, required: true },
    design: { type: String, default: "" },
    timeline: { type: String, required: true },
    budget: { type: String, default: "" },
    details: { type: String, required: false },
    image: { type: String, default: "/images/placeholder.png" }
}, { timestamps: true });

export const Quote = mongoose.model('Quotes', quoteSchema);