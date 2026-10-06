import multer from "multer";

// Global error handling middleware
const errorMiddleware = (err, req, res, next) => {
  // Log error
  console.error("Error:", err.message);

  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Handle custom upload errors
  if (err.message === "Only JPG, JPEG, PNG and WEBP images are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;