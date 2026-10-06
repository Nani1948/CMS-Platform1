import express from "express";

import { uploadImage } from "../controllers/uploadController.js";

import upload from "../middleware/uploadMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload image
// Authentication required
// upload.single("image") accepts one image
router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;
