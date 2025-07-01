import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  // Kiểm tra trạng thái đăng nhập từ localStorage
  const authStatus = localStorage.getItem("isAuthenticated");
  
  const isAuthenticated = authStatus === 'true';

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Return children instead of Outlet since we're using it as a wrapper
  return <>{children}</>;
};

export default PrivateRoute;
