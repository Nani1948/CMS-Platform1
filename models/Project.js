import mongoose from "mongoose";

// Define the schema for the Project model
const projectSchema = new mongoose.Schema(
  {
   //Project Title field with validation rules
    title: {
      type: String,
      required: true,
      trim: true,
    },

    //Project Description field with validation rules
    description: {
      type: String,
      required: true,
      trim: true,
    },

    //Project Technologies field with default value
    technologies: {
      type: [String],
      default: [],
    },
    //Project Image field with default value
    image: {
      type: String,
      default: "",
    },

    //Project GitHub URL field with default value
    githubUrl: {
      type: String,
      default: "",
    },

    //Project Live URL field with default value
    liveUrl: {
      type: String,
      default: "",
    },
    //Project Featured field with default value
    featured: {
      type: Boolean,
      default: false,
    },
  },
  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);
// Create the Project model using the defined schema
const Project = mongoose.model("Project", projectSchema);

export default Project;