import { createContext, useContext, useState, ReactNode } from "react";

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
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    if (data.requires2FA) {
      setTempToken(data.tempToken);
      return { requires2FA: true };
    }
    else {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setTempToken(null);
      return { requires2FA: false };
    }
  };

  const verifyOtp = async (otp: string) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, tempToken }),
    });

    if (!response.ok) throw new Error("Invalid OTP");

    const data = await response.json();
    localStorage.setItem("token", data.token); // Store permanent token
    setIsAuthenticated(true);
    setTempToken(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
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