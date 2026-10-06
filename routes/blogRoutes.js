import express from "express";

import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all blogs
router.get("/", getBlogs);

// GET - Get one blog
router.get("/:id", getBlogById);

// POST - Create blog
// Admin authentication required
router.post("/", authMiddleware, createBlog);

// PUT - Update blog
// Admin authentication required
router.put("/:id", authMiddleware, updateBlog);

// DELETE - Delete blog
// Admin authentication required
router.delete("/:id", authMiddleware, deleteBlog);

export default router;