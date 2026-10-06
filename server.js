import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//Load environment variables
dotenv.config();

//Connect MongoDB
connectDB();

//Create a Express
const app=express();

//Enable CORS -Logging and Security
app.use(cors());

//Parse JSON request body
app.use(express.json());

//Test route
app.get("/",(req,res) =>{
    res.status(200).json({
         success: true,
        message: "Portfolio CMS API is running"
    });
});

//Get port form .env
 const PORT=process.env.PORT || 5000;

 //Start server
 app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
 });
