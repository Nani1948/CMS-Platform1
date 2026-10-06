import Experience from "../models/Experience.js";

// CREATE - Create a new experience
export const createExperience = async (req, res) => {
  try {
    // Create experience using request body
    const experience = await Experience.create(req.body);

    // Send created experience
    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Create experience error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all experiences
export const getExperiences = async (req, res) => {
  try {
    // Find all experiences and sort by start date
    const experiences = await Experience.find().sort({
      startDate: -1,
    });

    // Send experiences
    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Get experiences error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get experiences",
    });
  }
};

// READ - Get one experience by ID
export const getExperienceById = async (req, res) => {
  try {
    // Find experience using ID
    const experience = await Experience.findById(req.params.id);

    // Check if experience exists
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Send experience
    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("Get experience error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get experience",
    });
  }
};

// UPDATE - Update an experience
export const updateExperience = async (req, res) => {
  try {
    // Find experience by ID and update it
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if experience exists
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Send updated experience
    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Update experience error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    // Find experience by ID and delete it
    const experience = await Experience.findByIdAndDelete(
      req.params.id
    );

    // Check if experience exists
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};