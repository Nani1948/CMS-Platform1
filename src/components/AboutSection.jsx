import { useEffect, useState } from "react";
import api from "../api/axios.js";

const AboutSection = () => {
  // Store About information
  const [about, setAbout] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch About information
  const fetchAbout = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/about");

      setAbout(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load About information."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch when component loads
  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <section
      id="about"
      className="bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            About Me
          </h2>

          <p className="mt-3 text-gray-600">
            Get to know me and my development journey.
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading About information...
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            className="text-center text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* About content */}
        {!loading && !error && about && (
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">

            {/* Profile image */}
            <div className="flex justify-center">
              {about.profileImage ? (
                <img
                  src={about.profileImage}
                  alt={about.name}
                  className="h-72 w-72 rounded-2xl object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-72 w-72 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* About details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {about.name}
              </h3>

              <p className="mt-2 text-lg font-medium text-blue-600">
                {about.title}
              </p>

              <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">
                {about.bio}
              </p>

              {/* Additional information */}
              <div className="mt-6 space-y-2 text-gray-600">

                {about.location && (
                  <p>
                    <span className="font-semibold">
                      Location:
                    </span>{" "}
                    {about.location}
                  </p>
                )}

                {about.email && (
                  <p>
                    <span className="font-semibold">
                      Email:
                    </span>{" "}
                    {about.email}
                  </p>
                )}

              </div>

              {/* Resume */}
              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  View Resume
                </a>
              )}
            </div>

          </div>
        )}

        {/* No About data */}
        {!loading && !error && !about && (
          <p className="text-center text-gray-500">
            About information is not available.
          </p>
        )}

      </div>
    </section>
  );
};

export default AboutSection;

