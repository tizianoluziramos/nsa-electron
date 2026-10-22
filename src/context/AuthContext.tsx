import { createContext, useState } from "react";
import type { Context, ReactNode } from "react";
import { postLogin } from "../services/auth.ts";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem("token") !== null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await postLogin(username, password);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setLoading(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}