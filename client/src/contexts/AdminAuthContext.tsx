import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface AdminAuthContextType {
  adminToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create context with default value (will be overridden by Provider)
export const AdminAuthContext = createContext<AdminAuthContextType>({
  adminToken: null,
  login: () => {},
  logout: () => {},
});

// Define props for the Provider component
interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('adminToken'));

  const login = (token: string) => {
    localStorage.setItem('adminToken', token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
