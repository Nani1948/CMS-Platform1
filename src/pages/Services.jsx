import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Services = () => {
  // Store all services
  const [services, setServices] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // Store the ID of the service being edited
  const [editingId, setEditingId] = useState(null);

  // Loading and saving states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Success and error messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get services from backend
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/services");

      setServices(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch services when page loads
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create or update service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (editingId) {
        // Update existing service
        await api.put(
          `/services/${editingId}`,
          formData
        );

        setMessage(
          "Service updated successfully."
        );
      } else {
        // Create new service
        await api.post(
          "/services",
          formData
        );

        setMessage(
          "Service created successfully."
        );
      }

      // Clear form
      resetForm();

      // Reload services
      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit service
  const handleEdit = (service) => {
    setEditingId(service._id);

    setFormData({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "",
    });

    setMessage("");
    setError("");

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete service
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/services/${id}`);

      setMessage(
        "Service deleted successfully."
      );

      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete service."
      );
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "",
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
          Loading services...
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Page heading */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Services
        </h1>

        <p className="mt-2 text-gray-600">
          Manage the services you offer.
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

      {/* Service form */}
      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {editingId
            ? "Edit Service"
            : "Add Service"}
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-5">
            {/* Service title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Service Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Example: Web Development"
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
                placeholder="Describe the service you provide"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Icon */}
            <div>
              <label
                htmlFor="icon"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Icon
              </label>

              <input
                id="icon"
                name="icon"
                type="text"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Example: 💻 or Code"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <p className="mt-1 text-sm text-gray-500">
                Enter an emoji, icon name, or icon value.
              </p>
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
                  ? "Update Service"
                  : "Add Service"}
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

      {/* Services list */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Your Services
        </h2>

        {services.length === 0 ? (
          <article className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-gray-500">
              No services found.
            </p>
          </article>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {/* Icon */}
                {service.icon && (
                  <div className="mb-4 text-4xl">
                    {service.icon}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 whitespace-pre-line text-gray-600">
                  {service.description}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(service)
                    }
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(service._id)
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

export default Services;

