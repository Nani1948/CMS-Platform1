// Upload image controller
export const uploadImage = async (req, res) => {
  try {
    // Check whether a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Create the URL of the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        url: imageUrl,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
