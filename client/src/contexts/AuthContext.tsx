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


  const login = async (email: string, password: string): Promise<boolean> => {
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

    setUser(testUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(testUser));
    localStorage.setItem('isAuthenticated', 'true');
    console.log('Đã đăng nhập với tài khoản test:', testUser);
    return true;
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
