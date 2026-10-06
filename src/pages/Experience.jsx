import { useEffect, useState } from "react";
import api from "../api/axios.js";

// Experience management page
const Experience = () => {
  // Store all experiences
  const [experiences, setExperiences] = useState([]);
  // Store form values
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  // Store the ID of the experience being edited
  const [editingId, setEditingId] = useState(null);
  // Store loading and saving states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // Store success and error messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get all experiences
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");
      // Send GET request to backend
      const response = await api.get("/experience");

      setExperiences(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load experience."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch experiences when page loads
  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create or update experience
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (editingId) {
        // Update
        await api.put(
          `/experience/${editingId}`,
          formData
        );

        setMessage(
          "Experience updated successfully."
        );
      } else {
        // Create
        await api.post("/experience", formData);

        setMessage(
          "Experience created successfully."
        );
      }

      resetForm();

      await fetchExperiences();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save experience."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit experience
  const handleEdit = (experience) => {
    setEditingId(experience._id);
    // Populate form with existing experience data
    setFormData({
      company: experience.company || "",
      position: experience.position || "",
      description: experience.description || "",
      startDate: experience.startDate
        ? experience.startDate.substring(0, 10)
        : "",
      endDate: experience.endDate
        ? experience.endDate.substring(0, 10)
        : "",
      location: experience.location || "",
    });

    setMessage("");
    setError("");
   // Scroll to top of the page for better user experience
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete experience
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/experience/${id}`);

      setMessage(
        "Experience deleted successfully."
      );

      await fetchExperiences();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete experience."
      );
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
    });

    setEditingId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    resetForm();
    setMessage("");
    setError("");
  };

  if (loading) {
    return (
      <main>
        <p className="text-gray-600">
          Loading experience...
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Page heading */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Experience
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your professional experience.
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

      {/* Form */}
      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {editingId
            ? "Edit Experience"
            : "Add Experience"}
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-5">

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Enter company name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Position */}
            <div>
              <label
                htmlFor="position"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Position
              </label>

              <input
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="Example: Junior Software Developer"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe your responsibilities and achievements"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Start date */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* End date */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                End Date
              </label>

              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <p className="mt-1 text-sm text-gray-500">
                Leave empty if this is your current position.
              </p>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Vijayawada, India"
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
                  ? "Update Experience"
                  : "Add Experience"}
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

      {/* Experience list */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Your Experience
        </h2>

        {experiences.length === 0 ? (
          <article className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-gray-500">
              No experience found.
            </p>
          </article>
        ) : (
          <div className="space-y-5">
            {experiences.map((experience) => (
              <article
                key={experience._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {experience.position}
                    </h3>

                    <p className="mt-1 font-medium text-blue-600">
                      {experience.company}
                    </p>

                    {experience.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        {experience.location}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-gray-500">
                      {experience.startDate
                        ? new Date(
                            experience.startDate
                          ).toLocaleDateString()
                        : "N/A"}

                      {" - "}

                      {experience.endDate
                        ? new Date(
                            experience.endDate
                          ).toLocaleDateString()
                        : "Present"}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(experience)
                      }
                      className="h-fit rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(experience._id)
                      }
                      className="h-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-5 border-t pt-5">
                  <p className="whitespace-pre-line text-gray-600">
                    {experience.description}
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

export default Experience;
