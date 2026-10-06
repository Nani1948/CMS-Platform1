import express from "express";

import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Create a contact message
// Public route
router.post("/", createContact);

// GET - Get all contact messages
// Admin authentication required
router.get("/", authMiddleware, getContacts);

export default router;