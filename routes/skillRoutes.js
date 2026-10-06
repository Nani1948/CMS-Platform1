import express from "express";

import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all skills
router.get("/", getSkills);

// GET - Get one skill
router.get("/:id", getSkillById);

// POST - Create skill
// Admin authentication required
router.post("/", authMiddleware, createSkill);

// PUT - Update skill
// Admin authentication required
router.put("/:id", authMiddleware, updateSkill);

// DELETE - Delete skill
// Admin authentication required
router.delete("/:id", authMiddleware, deleteSkill);

export default router;