import React, { createContext, useContext } from 'react';
import { User } from '../../models/User';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createAccount: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  createAccount: async () => {},
});

export const useAuth = () => useContext(AuthContext);