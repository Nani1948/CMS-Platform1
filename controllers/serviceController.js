import Service from "../models/Service.js";

// CREATE - Create a new service
export const createService = async (req, res) => {
  try {
    // Create service using request body
    const service = await Service.create(req.body);

    // Send created service
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all services
export const getServices = async (req, res) => {
  try {
    // Find all services
    const services = await Service.find().sort({
      createdAt: -1,
    });

    // Send services
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get services",
    });
  }
};

// READ - Get one service by ID
export const getServiceById = async (req, res) => {
  try {
    // Find service using ID
    const service = await Service.findById(req.params.id);

    // Check if service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Send service
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get service",
    });
  }
};

// UPDATE - Update a service
export const updateService = async (req, res) => {
  try {
    // Find service by ID and update it
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Send updated service
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Delete a service
export const deleteService = async (req, res) => {
  try {
    // Find service by ID and delete it
    const service = await Service.findByIdAndDelete(
      req.params.id
    );

    // Check if service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Confirm deletion
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};