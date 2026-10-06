import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Projects = () => {
  // Store all projects
  const [projects, setProjects] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    technologies: "",
  });

  // Store editing project ID
  const [editingId, setEditingId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // Get access token from localStorage
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  //  Create authorization headers
  const getAuthHeaders = () => {
    return {
      Authorization: `Bearer ${getToken()}`,
    };
  };
  // Get all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      setProjects(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when page loads
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Create or update project
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      // Convert technologies string into array
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
      };

      if (editingId) {
        // Update existing project
        await api.put(
          `/projects/${editingId}`,
          projectData,
          {
            headers: getAuthHeaders(),
          }
        );

        setMessage("Project updated successfully.");
      } else {
        // Create new project
        await api.post("/projects", projectData,{
            headers: getAuthHeaders(),
          });

        setMessage("Project created successfully.");
      }

      // Clear form
      setFormData({
        title: "",
        description: "",
        image: "",
        githubUrl: "",
        liveUrl: "",
        technologies: "",
      });

      setEditingId(null);

      // Refresh projects
      await fetchProjects();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete project
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/projects/${id}`,{
            headers: getAuthHeaders(),
          });

      setMessage("Project deleted successfully.");

      await fetchProjects();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete project."
      );
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      image: "",
      githubUrl: "",
      liveUrl: "",
      technologies: "",
    });

    setMessage("");
    setError("");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <section className="mx-auto max-w-6xl">
          <p className="text-gray-600">
            Loading projects...
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-6xl">

        {/* Page Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Projects
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your portfolio projects.
          </p>
        </header>

        {/* Success Message */}
        {message && (
          <div
            className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Project Form */}
        <article className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            {editingId
              ? "Edit Project"
              : "Create Project"}
          </h2>

          <form onSubmit={handleSubmit}>
            <fieldset className="space-y-5">

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Project Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter project title"
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
                  placeholder="Describe your project"
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Project Image URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/project.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label
                  htmlFor="githubUrl"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  GitHub URL
                </label>

                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Live URL */}
              <div>
                <label
                  htmlFor="liveUrl"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Live Project URL
                </label>

                <input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Technologies */}
              <div>
                <label
                  htmlFor="technologies"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Technologies
                </label>

                <input
                  id="technologies"
                  name="technologies"
                  type="text"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <p className="mt-1 text-sm text-gray-500">
                  Separate technologies with commas.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Project"
                      : "Create Project"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>

            </fieldset>
          </form>
        </article>

        {/* Projects List */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Your Projects
          </h2>

          {projects.length === 0 ? (
            <article className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="text-gray-500">
                No projects found.
              </p>
            </article>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  {/* Project Image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-gray-600">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map(
                          (technology, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex gap-3 border-t pt-5">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </section>
    </main>
  );
};

export default Projects;
