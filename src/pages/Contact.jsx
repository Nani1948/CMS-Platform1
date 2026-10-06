import { useState } from "react";
import api from "../api/axios.js";

// Contact form page
const Contact = () => {
  // Store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Store loading state
  const [sending, setSending] = useState(false);

  // Store success message
  const [success, setSuccess] = useState("");

  // Store error message
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();

    // Clear previous messages
    setSuccess("");
    setError("");

    try {
      // Start loading
      setSending(true);

      // Send contact form data to backend
      await api.post("/contact", formData);

      // Show success message
      setSuccess(
        "Your message has been sent successfully."
      );

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      // Display backend error message
      setError(
        err.response?.data?.message ||
          "Failed to send your message. Please try again."
      );
    } finally {
      // Stop loading
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">

      {/* Contact section */}
      <section className="mx-auto max-w-3xl">

        {/* Page heading */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Contact Me
          </h1>

          <p className="mt-3 text-gray-600">
            Have a question or want to work together?
            Send me a message.
          </p>
        </header>

        {/* Success message */}
        {success && (
          <div
            className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
            role="alert"
          >
            {success}
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

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-sm md:p-8"
        >

          <fieldset className="space-y-5">

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
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter message subject"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Write your message"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

          </fieldset>
        </form>

      </section>
    </main>
  );
};

export default Contact;

