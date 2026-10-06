import express from "express";

import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Get all services
router.get("/", getServices);

// GET - Get one service
router.get("/:id", getServiceById);

// POST - Create service
// Admin authentication required
router.post("/", authMiddleware, createService);

// PUT - Update service
// Admin authentication required
router.put("/:id", authMiddleware, updateService);

// DELETE - Delete service
// Admin authentication required
router.delete("/:id", authMiddleware, deleteService);

export default router;