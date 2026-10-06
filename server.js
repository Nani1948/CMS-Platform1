import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

//Load environment variables
dotenv.config();


//Create a Express
const app = express();

//Enable CORS -Logging and Security
app.use(cors());

//Parse JSON request body
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

//Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio CMS API is running"
    });
});

//Get port form .env
const PORT = process.env.PORT || 5000;

// Start server after successful database connection.
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        // Handle server startup errors
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

// Start the application
startServer();
