import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    console.log("Access Token:", token);
    console.log("Request URL:", config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log("Authorization header added");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;