import mongoose from "mongoose";

// Define the schema for the Skill model
const skillSchema = new mongoose.Schema(
  {
    //Skill Name field with validation rules
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //Skill Category field with validation rules
    category: {
      type: String,
      required: true,
      trim: true,
    },
    //Skill Level field with default value
    level: {
      type: Number,
      default: 0,
      min:0,
      max:100,
    },
  },
  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);

// Create the Skill model using the defined schema
const Skill = mongoose.model("Skill", skillSchema);

export default Skill;