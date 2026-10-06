import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import validatePassword from "./utils/validatePassword.js";

// Load environment variables from .env
dotenv.config();

// Function to create the first admin account
const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get admin details from environment variables
    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // Check whether all required admin details are available
    if (!username || !email || !password) {
      throw new Error(
        "ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD are required"
      );
    }

    // Validate the password using our strict password rules
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be 12–128 characters and contain uppercase, lowercase, a number, and a special character. Spaces are not allowed."
      );
    }

    // Check whether an admin with this email already exists
    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    // Stop if the admin already exists
    if (existingAdmin) {
      console.log("Admin already exists. No changes made.");
      return;
    }

    // Hash the password before storing it in MongoDB
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin account
    const admin=await Admin.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    console.log("Admin created successfully");
  } catch (error) {
    // Display any error that occurs during admin creation
    console.error("Admin creation failed:", error.message);

    // Set a failed process exit code
    process.exitCode = 1;
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
  }
};

// Run the function
seedAdmin();