import mongoose from "mongoose";

// Define the schema for the About model
const aboutSchema = new mongoose.Schema(
  {
    //About Name field with validation rules
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //About Title field with validation rules
    title: {
      type: String,
      required: true,
      trim: true,
    },
    //About Bio field with validation rules
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    //About Profile Image field with default value
    profileImage: {
      type: String,
      default: "",
    },
    //About Resume URL field with default value
    resumeUrl: {
      type: String,
      default: "",
    },
    //About Location field with default value
    location: {
      type: String,
      default: "",
      trim: true,
    },
    //About Email field with default value
    email: {
      type: String,
      default: "",
      trim: true,
    },
  },
  //Automatically add createdAt and updatedAt timestamps to the schema
  {
    timestamps: true,
  }
);

// Create the About model using the defined schema
const About = mongoose.model("About", aboutSchema);

export default About;