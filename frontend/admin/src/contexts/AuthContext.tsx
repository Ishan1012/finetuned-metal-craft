import { createContext, useContext, useState, ReactNode } from "react";
import apiClient from "@/lib/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  tempToken: string | null; // Stores the token after step 1
  login: (email: string, password: string) => Promise<{ requires2FA: boolean }>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
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
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      const response = await apiClient.post('/auth/verify', { otp, tempToken });
      const data = response.data;
      localStorage.setItem("token", data.token); // Store permanent token
      localStorage.setItem("adminToken", data.token);
      setIsAuthenticated(true);
      setTempToken(null);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid OTP");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, tempToken, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};