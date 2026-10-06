import mongoose from "mongoose";

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema(
  {
    // Name of the person sending the message
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email address of the person
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Subject of the message
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // Message content
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // Automatically add createdAt and updatedAt
  { timestamps: true }
);

// Create the Contact model
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
