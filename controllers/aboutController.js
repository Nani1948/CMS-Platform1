import About from "../models/About.js";

// CREATE - Create a new About record
export const createAbout = async (req, res) => {
  try {
    // Check whether an About record already exists
    const existingAbout = await About.findOne();

    // Prevent creating multiple About records
    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: "About information already exists",
      });
    }

    // Create About document
    const about = await About.create(req.body);

    return res.status(201).json({
      success: true,
      message: "About created successfully",
      data: about,
    });
  } catch (error) {
    console.error("Create About error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// READ - Get About information
export const getAbouts = async (req, res) => {
  try {
    // Find the single About record
    const about = await About.findOne();

    // Check whether About exists
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    // Send About information
    return res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error("Get About error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get About information",
    });
  }
};


// UPDATE - Update About information
export const updateAbout = async (req, res) => {
  try {
    // Find the existing About record
    const existingAbout = await About.findOne();

    // Check whether About exists
    if (!existingAbout) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    // Update the existing About record
    const about = await About.findByIdAndUpdate(
      existingAbout._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Update About error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE - Delete About information
export const deleteAbout = async (req, res) => {
  try {
    // ⭐ Find and delete the single About record
    const about = await About.findOneAndDelete();

    // Check whether About exists
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "About deleted successfully",
    });
  } catch (error) {
    console.error("Delete About error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete About",
    });
  }
};