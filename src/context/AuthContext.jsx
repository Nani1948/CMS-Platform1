import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

// Create authentication context
const AuthContext = createContext();

// Authentication provider
export const AuthProvider = ({ children }) => {
  // Store logged-in admin
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  // Store access token
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  // Login function
  const login = async (username, password) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const data = response.data;

    // Save authentication information
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem(
      "refreshToken",
      data.refreshToken
    );
    localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

    // Update React state
    setAccessToken(data.accessToken);
    setAdmin(data.admin);

    return data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("admin");

    setAccessToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom authentication hook
export const useAuth = () => {
  return useContext(AuthContext);
};
