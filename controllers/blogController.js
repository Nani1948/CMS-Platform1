import Blog from "../models/Blog.js";

// CREATE - Create a new blog
export const createBlog = async (req, res) => {
  try {
    // Create blog using request body
    const blog = await Blog.create(req.body);

    // Send created blog
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all blogs
export const getBlogs = async (req, res) => {
  try {
    // Find all blogs
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Send blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Get blogs error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get blogs",
    });
  }
};

// READ - Get one blog by ID
export const getBlogById = async (req, res) => {
  try {
    // Find blog using ID
    const blog = await Blog.findById(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Send blog
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get blog error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get blog",
    });
  }
};

// UPDATE - Update a blog
export const updateBlog = async (req, res) => {
  try {
    // Find blog by ID and update it
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Send updated blog
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Update blog error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    // Find blog by ID and delete it
    const blog = await Blog.findByIdAndDelete(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};