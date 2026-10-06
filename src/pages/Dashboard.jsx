import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  // Get the logged-in admin information
  const { admin } = useAuth();

  return (
    // Main content of the dashboard
    <main className="min-h-screen bg-gray-100 p-6">

      {/* Dashboard header section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome to your Portfolio CMS.
        </p>
      </header>

      {/* Admin information section */}
      <section
        aria-labelledby="admin-welcome"
        className="mb-8 rounded-xl bg-white p-6 shadow"
      >
        <h2
          id="admin-welcome"
          className="text-xl font-semibold text-gray-900"
        >
          Welcome, {admin?.username}
        </h2>

        <p className="mt-2 text-gray-600">
          You can manage your portfolio content from the admin panel.
        </p>
      </section>

      {/* CMS statistics section */}
      <section aria-labelledby="cms-overview">

        <header className="mb-4">
          <h2
            id="cms-overview"
            className="text-xl font-semibold text-gray-900"
          >
            CMS Overview
          </h2>
        </header>

        {/* Statistics cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Projects card */}
          <article className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Projects
            </h3>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total projects
            </p>
          </article>

          {/* Skills card */}
          <article className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Skills
            </h3>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total skills
            </p>
          </article>

          {/* Blogs card */}
          <article className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Blogs
            </h3>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total blogs
            </p>
          </article>

          {/* Testimonials card */}
          <article className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Testimonials
            </h3>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total testimonials
            </p>
          </article>

        </div>
      </section>

      {/* Quick actions section */}
      <section
        aria-labelledby="quick-actions"
        className="mt-8 rounded-xl bg-white p-6 shadow"
      >
        <header className="mb-4">
          <h2
            id="quick-actions"
            className="text-xl font-semibold text-gray-900"
          >
            Quick Actions
          </h2>
        </header>

        <nav
          aria-label="Quick actions"
          className="flex flex-wrap gap-3"
        >
          <a
            href="/projects"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Manage Projects
          </a>

          <a
            href="/skills"
            className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-900"
          >
            Manage Skills
          </a>

          <a
            href="/blogs"
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Manage Blogs
          </a>
        </nav>
      </section>
    </main>
  );
};

export default Dashboard;