import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  tradingViewId?: string;
  tradingStyle?: string;
  capital?: string;
  experience?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getInitialAuth = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuth());
  const [user, setUser] = useState<User | null>(getInitialUser());
  console.log('AuthProvider - isAuthenticated:', isAuthenticated);
  console.log('AuthProvider - user:', user);
  
  // Kiểm tra trạng thái đăng nhập khi component mount
  React.useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');
      
      if (authStatus === 'true' && storedUser) {
        setIsAuthenticated(true);
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    // Kiểm tra ngay khi component mount
    checkAuth();
    
    // Thêm event listener để theo dõi thay đổi trong localStorage từ các tab/window khác
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);


  const login = async (email: string, _password: string): Promise<boolean> => {
    // Test user mode - allow easy login with any credentials
    // For demo/test purposes, we create a rich user profile
    const testUser: User = {
      id: '123456',
      email: email || 'test@example.com',
      tradingViewId: 'tradingview_premium',
      tradingStyle: 'Đa chiến lược',
      capital: '100000',
      experience: '5+ năm',
      // Thêm các thông tin phụ để test tính năng
      fullName: 'Người Dùng Test',
      memberSince: '01/01/2023',
      isPremium: true,
      role: 'premium_user'
    } as User;

    try {
      // Đảm bảo thứ tự cập nhật: trước tiên localStorage, sau đó state
      localStorage.setItem('user', JSON.stringify(testUser));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authTimestamp', Date.now().toString());
      
      // Sau đó mới cập nhật state
      setUser(testUser);
      setIsAuthenticated(true);
      
      console.log('Đã đăng nhập với tài khoản test:', testUser);
      return true;
    } catch (error) {
      console.error('Lỗi khi lưu thông tin đăng nhập:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    if (!userData.email) return false;

    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
