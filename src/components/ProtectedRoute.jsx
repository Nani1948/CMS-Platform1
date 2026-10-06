import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  // Get the access token from AuthContext
  const { accessToken } = useAuth();

  // If there is no access token,
  // redirect the user to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated,
  // render the protected route
  return <Outlet />;
};

export default ProtectedRoute;