import express from "express";

import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all testimonials
router.get("/", getTestimonials);

// GET - Get one testimonial
router.get("/:id", getTestimonialById);

// POST - Create testimonial
// Admin authentication required
router.post("/", authMiddleware, createTestimonial);

// PUT - Update testimonial
// Admin authentication required
router.put("/:id", authMiddleware, updateTestimonial);

// DELETE - Delete testimonial
// Admin authentication required
router.delete("/:id", authMiddleware, deleteTestimonial);

export default router;