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
    // TODO: Replace this with real API call & validation
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        tradingViewId: 'tv123456',
        tradingStyle: 'Swing',
        capital: '5000',
        experience: '2 years'
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
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
