import mongoose from "mongoose";

// Function to establish connection with MongoDB
const connectDB = async () => {   
    // Connect to MongoDB using the connection string from .env
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // Stop the application if database connection fails
        process.exit(1);
    }
};
export default connectDB;
