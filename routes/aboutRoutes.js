import express from "express";

import {
  createAbout,
  getAbouts,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all About records
router.get("/", getAbouts);

// GET - Get one About record
router.get("/:id", getAboutById);

// POST - Create About
// Admin authentication required
router.post("/", authMiddleware, createAbout);

// PUT - Update About
// Admin authentication required
router.put("/:id", authMiddleware, updateAbout);

// DELETE - Delete About
// Admin authentication required
router.delete("/:id", authMiddleware, deleteAbout);

export default router;