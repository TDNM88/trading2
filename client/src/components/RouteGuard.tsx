import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactElement;
  requiresAuth: boolean; // true: cần đăng nhập, false: không cần đăng nhập (redirect nếu đã đăng nhập)
}

// Component loading hiển thị khi đang xác định trạng thái
const AuthLoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center w-full h-screen bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Đang xác thực...</p>
    </div>
  </div>
);

/**
 * RouteGuard component kiểm soát việc truy cập route dựa trên trạng thái xác thực
 * @param children - React component con cần render nếu điều kiện thỏa mãn
 * @param requiresAuth - true nếu route yêu cầu xác thực, false nếu route chỉ dành cho người dùng chưa xác thực
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiresAuth }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Debug log
  console.log(`RouteGuard check - requiresAuth: ${requiresAuth}, isAuthenticated: ${isAuthenticated}, isLoading: ${isLoading}, path: ${location.pathname}`);

  // Thêm delay nhỏ để đảm bảo trạng thái xác thực đã ổn định
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Chỉ thiết lập timer nếu không còn đang loading
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Nếu đang loading từ AuthContext, hiển thị loading screen
  if (isLoading) {
    console.log('RouteGuard - AuthContext đang loading...');
    return <AuthLoadingScreen />;
  }

  // Chờ một chút trước khi đưa ra quyết định chuyển hướng
  if (!isReady) {
    console.log('RouteGuard - Đang đợi trạng thái ổn định...');
    return <AuthLoadingScreen />;
  }

  // Logic xác thực:
  // 1. Nếu route yêu cầu xác thực và người dùng chưa đăng nhập -> chuyển hướng đến login
  // 2. Nếu route dành cho người dùng chưa xác thực (như login) và người dùng đã đăng nhập -> chuyển hướng đến dashboard
  if (requiresAuth && !isAuthenticated) {
    console.log('RouteGuard: Chuyển hướng đến login vì yêu cầu xác thực nhưng chưa đăng nhập');
    // Chuyển đến trang login, lưu địa chỉ hiện tại vào state để có thể quay lại sau
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requiresAuth && isAuthenticated) {
    console.log('RouteGuard: Chuyển hướng đến dashboard vì đã đăng nhập nhưng đang truy cập trang dành cho người dùng chưa xác thực');
    // Nếu đã đăng nhập nhưng truy cập vào trang login -> chuyển hướng đến dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Nếu điều kiện xác thực phù hợp -> hiển thị nội dung
  return <>{children}</>;
};

export default RouteGuard;
