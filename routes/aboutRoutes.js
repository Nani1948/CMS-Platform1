import express from "express";

import {
  createAbout,
  getAbouts,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// GET - Get About information
// Public route
router.get("/", getAbouts);


// POST - Create About
// Admin authentication required
router.post("/", authMiddleware, createAbout);


// PUT - Update About
// Admin authentication required
router.put("/", authMiddleware, updateAbout);


// DELETE - Delete About
// Admin authentication required
router.delete("/", authMiddleware, deleteAbout);


export default router;