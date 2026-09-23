import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "../lib/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  tempToken: string | null; // Stores the token after step 1
  login: (email: string, password: string) => Promise<{ requires2FA: boolean }>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    if (payload.exp && typeof payload.exp === 'number') {
      return Date.now() < payload.exp * 1000;
    }
    return true;
  } catch {
    return Boolean(token);
  }
};

const getInitialAuthState = (): boolean => {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  if (!token) return false;
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    return false;
  }
  return true;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialAuthState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempToken, setTempToken] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(getInitialAuthState());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('/auth/login', { email, password });
      const data = response.data;
      if (data.requires2FA) {
        setTempToken(data.tempToken);
        return { requires2FA: true };
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        setTempToken(null);
        return { requires2FA: false };
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('/auth/verify', { otp, tempToken });
      const data = response.data;
      localStorage.setItem("token", data.token); // Store permanent token
      localStorage.setItem("adminToken", data.token);
      setIsAuthenticated(true);
      setTempToken(null);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, tempToken, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};