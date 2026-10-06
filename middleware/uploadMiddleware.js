import multer from "multer";
import path from "path";

// Configure where uploaded files will be stored
const storage = multer.diskStorage({
  // Set upload destination folder
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // Create a unique file name
  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1E9)}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extension = path.extname(file.originalname).toLowerCase();

  const mimeType = allowedTypes.test(file.mimetype);

  const validExtension = allowedTypes.test(extension);

  if (mimeType && validExtension) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
  }
};

// Create multer upload configuration
const upload = multer({
  storage,
  fileFilter,

  // Maximum file size: 5 MB
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;