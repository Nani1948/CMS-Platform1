import { useEffect, useState } from "react";
import api from "../api/axios.js";

const About = () => {
  // About form data
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    profileImage: "",
    resumeUrl: "",
    location: "",
    email: "",
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Saving state
  const [saving, setSaving] = useState(false);

  // Success message
  const [message, setMessage] = useState("");

  // Error message
  const [error, setError] = useState("");

  // Check whether About information already exists
  const [aboutExists, setAboutExists] = useState(false);


  // Fetch About information
  const fetchAbout = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/about");

      const about = response.data.data;

      if (about) {
        // About record exists
        setAboutExists(true);

        setFormData({
          name: about.name || "",
          title: about.title || "",
          bio: about.bio || "",
          profileImage: about.profileImage || "",
          resumeUrl: about.resumeUrl || "",
          location: about.location || "",
          email: about.email || "",
        });
      }
    } catch (err) {
      // 404 means About record does not exist yet
      if (err.response?.status === 404) {
        setAboutExists(false);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load About information."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  // Fetch About information when page loads
  useEffect(() => {
    fetchAbout();
  }, []);


  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // Create or Update About information
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (aboutExists) {
        //  UPDATE existing About
        await api.put("/about", formData);

        setMessage(
          "About information updated successfully."
        );
      } else {
        // CREATE first About
        await api.post("/about", formData);

        setAboutExists(true);

        setMessage(
          "About information created successfully."
        );
      }

      //  Reload latest information
      await fetchAbout();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save About information."
      );
    } finally {
      setSaving(false);
    }
  };


  // Show loading message
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <section className="mx-auto max-w-4xl">
          <p className="text-gray-600">
            Loading About information...
          </p>
        </section>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-4xl">

        {/* Page Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            About
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your personal information and profile details.
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


        {/* About Form */}
        <article className="rounded-xl bg-white p-6 shadow-sm">

          <form onSubmit={handleSubmit}>

            <fieldset className="space-y-6">

              <legend className="mb-4 text-xl font-semibold text-gray-900">
                About Information
              </legend>


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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your name"
                />
              </div>


              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Professional Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Example: Junior Software Developer"
                />
              </div>


              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Write your professional bio"
                />
              </div>


              {/* Profile Image */}
              <div>
                <label
                  htmlFor="profileImage"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Profile Image URL
                </label>

                <input
                  id="profileImage"
                  name="profileImage"
                  type="url"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>


              {/* Resume URL */}
              <div>
                <label
                  htmlFor="resumeUrl"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Resume URL
                </label>

                <input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="https://example.com/resume.pdf"
                />
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your location"
                />
              </div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your email"
                />
              </div>


              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : aboutExists
                    ? "Save Changes"
                    : "Create About"}
                </button>
              </div>

            </fieldset>
          </form>

        </article>


        {/* Footer */}
        <footer className="mt-6 text-sm text-gray-500">
          {aboutExists
            ? "Your About information is currently saved."
            : "No About information exists yet. Create your profile information."}
        </footer>

      </section>
    </main>
  );
};

export default About;