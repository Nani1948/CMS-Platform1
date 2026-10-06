import mongoose from "mongoose";

//Define the schema for the Experience model
const experienceSchema = new mongoose.Schema(
  {
    // Experience Company field with validation rules
    company: {
      type: String,
      required: true,
      trim: true,
    },
    // Experience Position field with validation rules
    position: {
      type: String,
      required: true,
      trim: true,
    },

    // Experience Description field with validation rules
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Start date field with validation rules
    startDate: {
      type: Date,
      required: true,
    },

    // End date field with default value
    endDate: {
      type: Date,
      default: null,
    },

    //Currently working field with default value
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
  },

  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);

// Create the Experience model using the defined schema
const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;