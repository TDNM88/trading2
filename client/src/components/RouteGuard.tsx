import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requiresAuth: boolean;
}

/**
 * RouteGuard component kiểm soát việc truy cập route dựa trên trạng thái xác thực
 * @param children - React component con cần render nếu điều kiện thỏa mãn
 * @param requiresAuth - true nếu route yêu cầu xác thực, false nếu route chỉ dành cho người dùng chưa xác thực
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiresAuth }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  // Hiệu ứng chạy một lần khi component mount để kiểm tra trạng thái xác thực
  useEffect(() => {
    // Thêm một chút độ trễ để đảm bảo AuthContext đã được khởi tạo đầy đủ
    const timer = setTimeout(() => {
      setChecking(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Hiển thị màn hình loading trong khi kiểm tra
  if (checking) {
    return <div className="flex h-screen w-full items-center justify-center">Đang kiểm tra...</div>;
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
