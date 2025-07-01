import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Hàm trợ giúp để parse user từ localStorage, bao gồm xử lý lỗi
const parseUserFromStorage = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    // Nếu dữ liệu lưu trữ bị hỏng, xóa để tránh lỗi trong tương lai
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    return parseUserFromStorage();
  });

  useEffect(() => {
    console.log('AuthContext - isAuthenticated state:', isAuthenticated);
    console.log('AuthContext - localStorage isAuthenticated:', localStorage.getItem("isAuthenticated"));
  }, [isAuthenticated]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isAuthenticated") {
        console.log('AuthContext - Storage event isAuthenticated changed:', event.newValue);
        setIsAuthenticated(event.newValue === 'true');
      } else if (event.key === "user") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      console.log(`Đang đăng nhập với email: ${email}...`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Tạo một user giả lập cho mục đích test
      const mockUser = {
        id: '1',
        email,
        name: 'Test User',
      };

      console.log('AuthContext - Đăng nhập thành công, cập nhật state và localStorage');
      
      // Cập nhật state trước
      setUser(mockUser);
      setIsAuthenticated(true);
      
      // Sau đó cập nhật localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", 'true');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
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
