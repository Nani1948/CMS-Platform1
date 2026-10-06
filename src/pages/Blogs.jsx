import { useEffect, useState } from "react";
import api from "../api/axios.js";

// Blogs page
const Blogs = () => {
  // Store all blog records
  const [blogs, setBlogs] = useState([]);

  // Store form input values
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    published: false,
    publishedAt: "",
  });

  // Store the ID of the blog being edited
  const [editingId, setEditingId] = useState(null);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Store saving state
  const [saving, setSaving] = useState(false);

  // Store success message
  const [message, setMessage] = useState("");

  // Store error message
  const [error, setError] = useState("");

  // Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      // GET request to /api/blogs
      const response = await api.get("/blogs");

      // Store blogs returned by backend
      setBlogs(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs when page loads
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle text input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle published checkbox
  const handlePublishedChange = (event) => {
    const { checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      published: checked,
    }));
  };

  // Create or update blog
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      // Prepare data for backend
      const blogData = {
        ...formData,

        // Send null when published date is empty
        publishedAt: formData.publishedAt
          ? formData.publishedAt
          : null,
      };

      // Update existing blog
      if (editingId) {
        await api.put(
          `/blogs/${editingId}`,
          blogData
        );

        setMessage(
          "Blog updated successfully."
        );
      } else {
        // Create new blog
        await api.post("/blogs", blogData);

        setMessage(
          "Blog created successfully."
        );
      }

      // Clear form
      resetForm();

      // Reload blogs
      await fetchBlogs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  // Start editing a blog
  const handleEdit = (blog) => {
    setEditingId(blog._id);

    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      published: blog.published || false,

      // Convert MongoDB date into date input format
      publishedAt: blog.publishedAt
        ? blog.publishedAt.substring(0, 10)
        : "",
    });

    setMessage("");
    setError("");

    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete a blog
  const handleDelete = async (id) => {
    // Ask for confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      // DELETE request
      await api.delete(`/blogs/${id}`);

      setMessage(
        "Blog deleted successfully."
      );

      // Reload blogs
      await fetchBlogs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete blog."
      );
    }
  };

  // Reset form values
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      published: false,
      publishedAt: "",
    });

    setEditingId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    resetForm();
    setMessage("");
    setError("");
  };

  // Display loading message
  if (loading) {
    return (
      <main>
        <p className="text-gray-600">
          Loading blogs...
        </p>
      </main>
    );
  }

  return (
    <main>

      {/* Page heading */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Blogs
        </h1>

        <p className="mt-2 text-gray-600">
          Create and manage your blog posts.
        </p>
      </header>

      {/* Success message */}
      {message && (
        <div
          className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Blog form */}
      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {editingId
            ? "Edit Blog"
            : "Add Blog"}
        </h2>

        <form onSubmit={handleSubmit}>

          <fieldset className="space-y-5">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="Example: my-first-blog"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <p className="mt-1 text-sm text-gray-500">
                Use lowercase words separated by hyphens.
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Excerpt
              </label>

              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                placeholder="Short description of the blog"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Content
              </label>

              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Write your blog content"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/blog-image.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Published checkbox */}
            <div className="flex items-center gap-3">

              <input
                id="published"
                name="published"
                type="checkbox"
                checked={formData.published}
                onChange={handlePublishedChange}
                className="h-4 w-4"
              />

              <label
                htmlFor="published"
                className="text-sm font-medium text-gray-700"
              >
                Publish this blog
              </label>

            </div>

            {/* Published date */}
            <div>
              <label
                htmlFor="publishedAt"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Published Date
              </label>

              <input
                id="publishedAt"
                name="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <p className="mt-1 text-sm text-gray-500">
                Leave empty if the blog is not published yet.
              </p>
            </div>

            {/* Form buttons */}
            <div className="flex gap-3 pt-4">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Blog"
                  : "Add Blog"}
              </button>

              {/* Cancel button appears only during editing */}
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}

            </div>

          </fieldset>
        </form>
      </section>

      {/* Blog list */}
      <section>

        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Your Blogs
        </h2>

        {/* Display message when no blogs exist */}
        {blogs.length === 0 ? (
          <article className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-gray-500">
              No blogs found.
            </p>
          </article>
        ) : (
          <div className="space-y-5">

            {/* Display each blog */}
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  {/* Blog information */}
                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-gray-900">
                      {blog.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Slug: {blog.slug}
                    </p>

                    {/* Published status */}
                    <p className="mt-2 text-sm font-medium">
                      Status:{" "}
                      <span
                        className={
                          blog.published
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {blog.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </p>

                    {/* Published date */}
                    {blog.publishedAt && (
                      <p className="mt-1 text-sm text-gray-500">
                        Published:{" "}
                        {new Date(
                          blog.publishedAt
                        ).toLocaleDateString()}
                      </p>
                    )}

                  </div>

                  {/* Edit and Delete buttons */}
                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(blog)
                      }
                      className="h-fit rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(blog._id)
                      }
                      className="h-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                {/* Blog image */}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="mt-5 h-48 w-full rounded-lg object-cover"
                  />
                )}

                {/* Blog excerpt */}
                {blog.excerpt && (
                  <p className="mt-5 text-gray-600">
                    {blog.excerpt}
                  </p>
                )}

                {/* Blog content */}
                <div className="mt-5 border-t pt-5">
                  <p className="whitespace-pre-line text-gray-600">
                    {blog.content}
                  </p>
                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default Blogs;
