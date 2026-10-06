
import mongoose from "mongoose";

// Define the schema for the Admin model
const adminSchema = new mongoose.Schema(
  { 
    //Admin Username field with validation rules
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    //Admin Email field with validation rules
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    //Admin Password field with validation rules
    password: {
      type: String,
      required: true,
      select: false,
    },
    //User role field with default value set to "admin"
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },//Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);
// Create the Admin model using the defined schema
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;