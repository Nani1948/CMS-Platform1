import { useEffect, useState } from "react";
import api from "../api/axios";

// Skills management page
const SkillsManagement = () => {
  // Store all skills
  const [skills, setSkills] = useState([]);

  // Store form values
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
  });

  // Store the ID of the skill being edited
  // null means we are adding a new skill
  const [editingId, setEditingId] = useState(null);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Store error message
  const [error, setError] = useState("");

  // Get access token from localStorage
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  // Create authorization headers
  const getAuthHeaders = () => {
    return {
      Authorization: `Bearer ${getToken()}`,
    };
  };

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      // Send GET request to backend
      const response = await api.get("/skills");

      // Save skills returned from API
      setSkills(response.data.data || []);
    } catch (error) {
      console.error("Fetch skills error:", error);

      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  // Fetch skills when page loads
  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      // Check whether we are editing or adding
      if (editingId) {
        // Update existing skill
        await api.put(
          `/skills/${editingId}`,
          {
            name: formData.name,
            category: formData.category,
            level: Number(formData.level),
          },
          {
            headers: getAuthHeaders(),
          }
        );

        alert("Skill updated successfully");
      } else {
        // Create new skill
        await api.post(
          "/skills",
          {
            name: formData.name,
            category: formData.category,
            level: Number(formData.level),
          },
          {
            headers: getAuthHeaders(),
          }
        );

        alert("Skill added successfully");
      }

      // Clear form
      setFormData({
        name: "",
        category: "",
        level: "",
      });

      // Exit edit mode
      setEditingId(null);

      // Reload skill list
      fetchSkills();
    } catch (error) {
      console.error("Save skill error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save skill"
      );
    }
  };

  // Start editing a skill
  const handleEdit = (skill) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "",
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      level: "",
    });
  };

  // Delete a skill
  const handleDelete = async (id) => {
    // Ask for confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    // Stop if user clicks Cancel
    if (!confirmed) {
      return;
    }

    try {
      setError("");

      // Delete skill
      await api.delete(`/skills/${id}`, {
        headers: getAuthHeaders(),
      });

      alert("Skill deleted successfully");

      // Reload skills
      fetchSkills();
    } catch (error) {
      console.error("Delete skill error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete skill"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">
          Skills Management
        </h1>

        <p className="text-gray-600">
          Add, edit and delete your portfolio skills.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* Skill form */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          {editingId ? "Edit Skill" : "Add Skill"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Skill name */}
          <div>
            <label className="mb-1 block font-medium">
              Skill Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="React"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Frontend"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Skill level */}
          <div>
            <label className="mb-1 block font-medium">
              Level (%)
            </label>

            <input
              type="number"
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="80"
              min="0"
              max="100"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              {editingId ? "Update Skill" : "Add Skill"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Skills list */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          All Skills
        </h2>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-500">
            No skills found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Skill</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {skills.map((skill) => (
                  <tr
                    key={skill._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {skill.name}
                    </td>

                    <td className="p-3">
                      {skill.category}
                    </td>

                    <td className="p-3">
                      {skill.level}%
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleEdit(skill)
                          }
                          className="rounded bg-blue-600 px-3 py-1 text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(skill._id)
                          }
                          className="rounded bg-red-600 px-3 py-1 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManagement;