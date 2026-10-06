import mongoose from "mongoose";

// Define the schema for the Testimonial model
const testimonialSchema = new mongoose.Schema(
  {
    //Testimonial Name field with validation rules
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //Testimonial Position field with default value
    position: {
      type: String,
      default: "",
      trim: true,
    },
    //Testimonial Message field with validation rules
    message: {
      type: String,
      required: true,
      trim: true,
    },

    //Testimonial Image field with default value
    image: {
      type: String,
      default: "",
    },
  },
  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);

// Create the Testimonial model using the defined schema
const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);

export default Testimonial;