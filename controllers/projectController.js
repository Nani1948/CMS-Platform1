import Project from "../models/Project.js";

// CREATE - Create a new project
export const createProject = async (req, res) => {
  try {
    // Create project using request body
    const project = await Project.create(req.body);

    // Send created project
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Create project error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all projects
export const getProjects = async (req, res) => {
  try {
    // Find all projects
    const projects = await Project.find().sort({ createdAt: -1 });

    // Send projects
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get projects",
    });
  }
};

// READ - Get one project by ID
export const getProjectById = async (req, res) => {
  try {
    // Find project using ID
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Send project
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get project",
    });
  }
};

// UPDATE - Update a project
export const updateProject = async (req, res) => {
  try {
    // Find project by ID and update it
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Send updated project
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Update project error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete a project
export const deleteProject = async (req, res) => {
  try {
    // Find project by ID and delete it
    const project = await Project.findByIdAndDelete(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};