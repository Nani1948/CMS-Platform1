import express from "express";

import { loginAdmin ,refreshAccessToken} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

// Create router
const router = express.Router();

// Public login route
router.post("/login", loginAdmin);
router.post("/refresh", refreshAccessToken);

// Protected route for testing authentication
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

// Export router
export default router;