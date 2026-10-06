import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all projects
router.get("/", getProjects);

// GET - Get one project
router.get("/:id", getProjectById);

// POST - Create project
// Admin authentication required
router.post("/", authMiddleware, createProject);

// PUT - Update project
// Admin authentication required
router.put("/:id", authMiddleware, updateProject);

// DELETE - Delete project
// Admin authentication required
router.delete("/:id", authMiddleware, deleteProject);

export default router;