import express from "express";

import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all experiences
router.get("/", getExperiences);

// GET - Get one experience
router.get("/:id", getExperienceById);

// POST - Create experience
// Admin authentication required
router.post("/", authMiddleware, createExperience);

// PUT - Update experience
// Admin authentication required
router.put("/:id", authMiddleware, updateExperience);

// DELETE - Delete experience
// Admin authentication required
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
