import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import contactRoutes from "./routes/contactRoute.js";
//Load environment variables
dotenv.config();


//Create a Express
const app = express();
    
//Enable CORS -Logging and Security
app.use(cors());

//Parse JSON request body
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Authentication routes
app.use("/api/auth", authRoutes);

// About routes
app.use("/api/about", aboutRoutes);

// Skill routes
app.use("/api/skills", skillRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Blog routes
app.use("/api/blogs", blogRoutes);

// Experience routes
app.use("/api/experience", experienceRoutes);

// Testimonial routes
app.use("/api/testimonials", testimonialRoutes);

// Service routes
app.use("/api/services", serviceRoutes);

// Upload routes
app.use("/api/upload", uploadRoutes);
// Contact routes
app.use("/api/contact", contactRoute);

// Global error middleware
app.use(errorMiddleware);
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
