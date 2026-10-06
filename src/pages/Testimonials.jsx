import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Testimonials = () => {
  // Store all testimonials
  const [testimonials, setTestimonials] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    image: "",
  });

  // Store the ID of the testimonial being edited
  const [editingId, setEditingId] = useState(null);

  // Loading and saving states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Success and error messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get testimonials from backend
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/testimonials");

      setTestimonials(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch testimonials when page loads
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create or update testimonial
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (editingId) {
        // Update existing testimonial
        await api.put(
          `/testimonials/${editingId}`,
          formData
        );

        setMessage(
          "Testimonial updated successfully."
        );
      } else {
        // Create new testimonial
        await api.post(
          "/testimonials",
          formData
        );

        setMessage(
          "Testimonial created successfully."
        );
      }

      // Clear form
      resetForm();

      // Reload testimonials
      await fetchTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save testimonial."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);

    setFormData({
      name: testimonial.name || "",
      role: testimonial.role || "",
      message: testimonial.message || "",
      image: testimonial.image || "",
    });

    setMessage("");
    setError("");

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/testimonials/${id}`);

      setMessage(
        "Testimonial deleted successfully."
      );

      await fetchTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete testimonial."
      );
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      message: "",
      image: "",
    });

    setEditingId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    resetForm();
    setMessage("");
    setError("");
  };

  // Loading screen
  if (loading) {
    return (
      <main>
        <p className="text-gray-600">
          Loading testimonials...
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Page heading */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Testimonials
        </h1>

        <p className="mt-2 text-gray-600">
          Manage client and customer testimonials.
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

      {/* Testimonial form */}
      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {editingId
            ? "Edit Testimonial"
            : "Add Testimonial"}
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter person's name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Role
              </label>

              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="Example: Project Manager"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Testimonial
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Enter testimonial message"
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
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Testimonial"
                  : "Add Testimonial"}
              </button>

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

      {/* Testimonials list */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Your Testimonials
        </h2>

        {testimonials.length === 0 ? (
          <article className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-gray-500">
              No testimonials found.
            </p>
          </article>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {/* Person information */}
                <div className="flex items-start gap-4">
                  {/* Profile image */}
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-500">
                      {testimonial.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>

                    {testimonial.role && (
                      <p className="text-sm text-blue-600">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Testimonial message */}
                <blockquote className="mt-5 border-l-4 border-blue-500 pl-4 text-gray-600">
                  "{testimonial.message}"
                </blockquote>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(testimonial)
                    }
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(testimonial._id)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Testimonials;
