import { useEffect, useState } from "react";
import api from "../api/axios.js";

const ProjectsSection = () => {
  // Store projects
  const [projects, setProjects] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch projects
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

  // Fetch when component loads
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Projects
          </h2>

          <p className="mt-3 text-gray-600">
            Some of the projects I have developed.
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading projects...
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

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project) => (
              <article
                key={project._id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Project image */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}

                {/* Project content */}
                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* Project links */}
                  <div className="mt-6 flex flex-wrap gap-3">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

        {/* No projects */}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500">
            No projects found.
          </p>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;

