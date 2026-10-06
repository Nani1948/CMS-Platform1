import Testimonial from "../models/Testimonial.js";

// CREATE - Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    // Create testimonial using request body
    const testimonial = await Testimonial.create(req.body);

    // Send created testimonial
    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Create testimonial error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    // Find all testimonials
    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    // Send testimonials
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Get testimonials error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get testimonials",
    });
  }
};

// READ - Get one testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    // Find testimonial using ID
    const testimonial = await Testimonial.findById(req.params.id);

    // Check if testimonial exists
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Send testimonial
    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Get testimonial error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get testimonial",
    });
  }
};

// UPDATE - Update a testimonial
export const updateTestimonial = async (req, res) => {
  try {
    // Find testimonial by ID and update it
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if testimonial exists
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Send updated testimonial
    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    // Find testimonial by ID and delete it
    const testimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );

    // Check if testimonial exists
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};