import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken,{generateRefreshToken,} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

//Function to handle admin login
export const loginAdmin = async (req, res) => {
    try {

        // Get username and password from request body
        const { username, password } = req.body;
        // Validate that username and password are provided and are of type string

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            // Return a 400 Bad Request response.
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        // Find the admin by username and include the password field for comparison
        const admin = await Admin.findOne({
            username: username.trim().toLowerCase(),
        }).select("+password");

        // If admin is not found, return a 401 Unauthorized response
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        // If the passwords do not match, return a 401 Unauthorized response
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Generate a JWT token for the authenticated admin
        const accessToken = generateToken(admin._id.toString());
        
        // Generate a refresh token for the authenticated admin
        const refreshToken = generateRefreshToken(admin._id.toString());

        // Return successful login response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
        });
    }
   
    // Catch any unexpected errors and return a 500 Internal Server Error response
    catch (error) {
        // Log the actual error for debugging
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};

// Function to create a new access token
// using a valid refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    // Get refresh token from request body
    const { refreshToken } = req.body;

    // Validate refresh token
    if (
      typeof refreshToken !== "string" ||
      !refreshToken.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Make sure this is actually a refresh token
    if (decoded.tokenType !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Find the admin using the ID inside the token
    const admin = await Admin.findById(decoded.adminId);

    // Check whether admin still exists
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found",
      });
    }

    // Generate a new access token
    const accessToken = generateToken(
      admin._id.toString()
    );

    // Return the new access token
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    // Refresh token is invalid or expired
    console.error("Refresh token error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};