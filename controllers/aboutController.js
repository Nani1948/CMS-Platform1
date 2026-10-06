import About from "../models/About.js";

// CREATE - Create a new About record
export const createAbout = async (req, res) => {
  try {
    // Create About document using request body
    const about = await About.create(req.body);

    // Send created About data
    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: about,
    });
  } catch (error) {
    // Handle validation/database errors
    console.error("Create About error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all About records
export const getAbouts = async (req, res) => {
  try {
    // Find all About records
    const abouts = await About.find().sort({ createdAt: -1 });

    // Send About records
    res.status(200).json({
      success: true,
      data: abouts,
    });
  } catch (error) {
    // Handle database errors
    console.error("Get Abouts error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get About information",
    });
  }
};

// READ - Get one About record by ID
export const getAboutById = async (req, res) => {
  try {
    // Find About using ID from URL
    const about = await About.findById(req.params.id);

    // Check if About exists
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    // Send About data
    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    // Handle invalid ID/database errors
    console.error("Get About error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get About",
    });
  }
};

// UPDATE - Update an About record
export const updateAbout = async (req, res) => {
  try {
    // Find About by ID and update it
    const about = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if About exists
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    // Send updated About
    res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    // Handle validation errors
    console.error("Update About error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete an About record
export const deleteAbout = async (req, res) => {
  try {
    // Find About by ID and delete it
    const about = await About.findByIdAndDelete(req.params.id);

    // Check if About exists
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "About deleted successfully",
    });
  } catch (error) {
    // Handle database errors
    console.error("Delete About error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete About",
    });
  }
};