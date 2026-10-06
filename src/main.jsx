
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

// Render the React application
ReactDOM.createRoot(
  document.getElementById("root")
).render(

  // StrictMode helps identify potential problems during development
  <React.StrictMode>

    {/* AuthProvider makes authentication available
        throughout the application */}
    <AuthProvider>

      {/* Main application */}
      <App />

    </AuthProvider>

  </React.StrictMode>
);