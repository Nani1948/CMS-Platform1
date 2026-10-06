import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  // Create navigation function
  const navigate = useNavigate();

  // Get login function from AuthContext
  const { login } = useAuth();

  // Store username input value
  const [username, setUsername] = useState("");

  // Store password input value
  const [password, setPassword] = useState("");

  // Store login error message
  const [error, setError] = useState("");

  // Store loading state
  const [loading, setLoading] = useState(false);

  // Handle login form submission
  const handleSubmit = async (event) => {
    // Prevent browser from refreshing the page
    event.preventDefault();

    // Clear previous error message
    setError("");

    // Show loading state
    setLoading(true);

    try {
      // Send username and password to the backend
      await login(username, password);

      // Login successful
      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      // Get error message returned by backend
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      // Stop loading after login request completes
      setLoading(false);
    }
  };

  return (
    // Main content of the login page
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      {/* Login section */}
      <section
        className="w-full max-w-md"
        aria-labelledby="login-title"
      >

        {/* Login page heading */}
        <header className="mb-8 text-center">

          {/* Main heading */}
          <h1
            id="login-title"
            className="text-3xl font-bold text-gray-900"
          >
            Admin Login
          </h1>

          {/* Login description */}
          <p className="mt-2 text-gray-600">
            Sign in to manage your portfolio.
          </p>

        </header>

        {/* Login card */}
        <article className="rounded-xl bg-white p-8 shadow-md">

          {/* Display error message when login fails */}
          {error && (
            <p
              className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit}>

            {/* Group related form fields */}
            <fieldset className="space-y-5">

              {/* Accessible description for the fieldset */}
              <legend className="sr-only">
                Admin login information
              </legend>

              {/* Username field */}
              <div>

                {/* Username label */}
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                {/* Username input */}
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

              </div>

              {/* Password field */}
              <div>

                {/* Password label */}
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                {/* Password input */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {/* Change button text while login is processing */}
                {loading ? "Logging in..." : "Login"}
              </button>

            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Login;