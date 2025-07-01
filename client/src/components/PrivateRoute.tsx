import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  // Read token from localStorage
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Return children instead of Outlet since we're using it as a wrapper
  return <>{children}</>;
};

export default PrivateRoute;
