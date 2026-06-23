import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    title: { type: String, required: true },
    category: { type: String, default: "Custom" },
    material: { type: String, required: true },
    projectType: { type: String, required: true },
    location: { type: String, required: true },
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);