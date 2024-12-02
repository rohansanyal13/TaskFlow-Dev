// src/providers/AuthProvider.tsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { LoginHandler } from '../../services/LoginHandler';
import { User } from '../../models/User';
import { ErrorHandler } from '../../utils/ErrorHandler';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = new LoginHandler();
  const errorHandler = ErrorHandler.getInstance();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(new User(parsedUser));
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('user');
        errorHandler.addError('Session expired, please login again');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = loginHandler.login(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
    } catch (error) {
      if (error instanceof Error) {
        errorHandler.addError(error.message, 'login');
      }
      throw error;
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const newUser = loginHandler.createAccount({ email, password });
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser.toJSON()));
    } catch (error) {
      if (error instanceof Error) {
        errorHandler.addError(error.message, 'registration');
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout,
        createAccount 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};