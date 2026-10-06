import Skill from "../models/Skill.js";

// CREATE - Create a new skill
export const createSkill = async (req, res) => {
  try {
    // Create skill using request body
    const skill = await Skill.create(req.body);

    // Send created skill
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Create skill error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all skills
export const getSkills = async (req, res) => {
  try {
    // Find all skills
    const skills = await Skill.find().sort({ createdAt: -1 });

    // Send skills
    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Get skills error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get skills",
    });
  }
};

// READ - Get one skill by ID
export const getSkillById = async (req, res) => {
  try {
    // Find skill using ID
    const skill = await Skill.findById(req.params.id);

    // Check if skill exists
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Send skill
    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    console.error("Get skill error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get skill",
    });
  }
};

// UPDATE - Update a skill
export const updateSkill = async (req, res) => {
  try {
    // Find skill by ID and update it
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if skill exists
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Send updated skill
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Update skill error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    // Find skill by ID and delete it
    const skill = await Skill.findByIdAndDelete(req.params.id);

    // Check if skill exists
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
};