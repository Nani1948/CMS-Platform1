import { Link, Outlet,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLayout = () => {
  // Get logged-in admin and logout function
   // Create navigation function
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  
  // Handle logout and redirect to login page
    const handleLogout = () => {    
     logout();
     navigate("/login", { replace: true });
   }

  return (
    // Main admin layout
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

        {/* Website title */}
        <h1 className="text-xl font-bold text-gray-900">
          Portfolio CMS
        </h1>

        {/* Admin information and logout */}
        <section className="flex items-center gap-4">

          {/* Display admin username */}
          <p className="text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-semibold text-gray-900">
              {admin?.username}
            </span>
          </p>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </section>
      </header>

      {/* Main admin area */}
      <div className="flex min-h-[calc(100vh-73px)]">

        {/* Sidebar navigation */}
        <aside className="w-64 border-r bg-white p-5">

          {/* Sidebar heading */}
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Admin Menu
          </h2>

          {/* Navigation links */}
          <nav aria-label="Admin navigation">

            <ul className="space-y-2">

              <li>
                <Link
                  to="/dashboard"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/skills"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Skills
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/experience"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Experience
                </Link>
              </li>

              <li>
                <Link
                  to="/testimonials"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Testimonials
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Services
                </Link>
              </li>

            </ul>
          </nav>
        </aside>

        {/* Page content */}
        <main className="flex-1 p-6">

          {/* Outlet renders the current page */}
          <Outlet />

        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
