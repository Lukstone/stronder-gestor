import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    try {
    console.log(username, password)

      await import('./api').then(({ login }) => login(username, password));
      setIsAuthenticated(true);
    } catch {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
