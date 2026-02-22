import { Navigate } from "react-router-dom";

const isAuthenticated = false; // Change to true to test access

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;