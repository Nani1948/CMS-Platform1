import jwt from "jsonwebtoken";

//Function to generate JWT token for admin authentication
const generateToken = (adminId) => {
    // Generate a JWT token using the admin's ID, secret key, and expiration time
    return jwt.sign(
        { adminId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};

// Function to generate a refresh token
export const generateRefreshToken = (adminId) => {
    // Create a JWT refresh token
    return jwt.sign(
        {
            // Store admin ID inside the token
            adminId,

            // Identify this as a refresh token
            tokenType: "refresh",
        },

        // Separate secret used for refresh tokens
        process.env.JWT_REFRESH_SECRET,

        // Refresh token expiration
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        }
    );
};
export default generateToken;