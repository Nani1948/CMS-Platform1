import { useEffect, useState } from "react";
import api from "../api/axios.js";

const SkillsSection = () => {
  // Store skills
  const [skills, setSkills] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/skills");

      setSkills(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch when component loads
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="bg-gray-50 px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Skills
          </h2>

          <p className="mt-3 text-gray-600">
            My technical skills and areas of expertise.
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading skills...
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

        {/* Skills */}
        {!loading && !error && skills.length > 0 && (
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {skills.map((skill) => (
              <article
                key={skill._id}
                className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-800">
                  {skill.name}
                </h3>

                {skill.category && (
                  <p className="mt-1 text-sm text-gray-500">
                    {skill.category}
                  </p>
                )}

                {skill.level && (
                  <p className="mt-2 text-sm text-blue-600">
                    {skill.level}
                  </p>
                )}
              </article>
            ))}

          </div>
        )}

        {/* No skills */}
        {!loading && !error && skills.length === 0 && (
          <p className="text-center text-gray-500">
            No skills found.
          </p>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;

