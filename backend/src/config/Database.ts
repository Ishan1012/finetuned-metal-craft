import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/asde';

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed! ", error);
        process.exit(1);
    }
};

export default connectDB;