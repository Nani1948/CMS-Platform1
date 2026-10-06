import mongoose from "mongoose";

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema(
  {
    //Service Title field with validation rules
    title: {
      type: String,
      required: true,
      trim: true,
    },

    //Service Description field with validation rules
    description: {
      type: String,
      required: true,
      trim: true,
    },

    //Service Icon field with default value
    icon: {
      type: String,
      default: "",
    },
  },
  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);

// Create the Service model using the defined schema
const Service = mongoose.model("Service", serviceSchema);

export default Service;