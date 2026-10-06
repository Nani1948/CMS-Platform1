import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Middleware to protect admin routes
const authMiddleware = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
    }

    // Extract token from:
    // Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find admin from decoded ID
    const admin = await Admin.findById(decoded.adminId);

    // Admin doesn't exist
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found",
      });
    }

    // Store admin information in request
    req.admin = {
      id: admin._id.toString(),
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    // Continue to requested route
    next();
  }
     catch {
    
    // Token invalid or expired
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;