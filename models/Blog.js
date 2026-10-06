import mongoose from "mongoose";

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema(
  {
    // Blog Title field with validation rules
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Blog Slug field with validation rules
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Blog Excerpt field with default value
    excerpt: {
      type: String,
      default: "",
      trim: true,
    },

    // Blog Content field with validation rules
    content: {
      type: String,
      required: true,
    },

    // Blog Image field with default value
    image: {
      type: String,
      default: "",
    },

    // Published field with default value
    published: {
      type: Boolean,
      default: false,
    },

    // Published date field with default value
    publishedAt: {
      type: Date,
      default: null,
    },
  },

  //Automatically add createdAt and updatedAt timestamps to the schema
  { timestamps: true }
);

// Create the Blog model using the defined schema
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;