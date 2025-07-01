import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Ghi log để debug
  console.log("PrivateRoute - isAuthenticated từ AuthContext:", isAuthenticated);
  console.log("PrivateRoute - path hiện tại:", location.pathname);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Return children instead of Outlet since we're using it as a wrapper
  return <>{children}</>;
};

export default PrivateRoute;
