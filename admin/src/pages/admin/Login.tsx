import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { requires2FA } = await login(email, password);
      if (requires2FA) {
        navigate("/verify");
      } else {
        navigate("/admin");
      }
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF9F3] px-4">
      <Card className="w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.07)] border-none rounded-3xl p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="20" y1="0" x2="20" y2="40" stroke="#000" strokeWidth="1" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="#000" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <CardHeader className="space-y-1 text-center pb-8 pt-4 relative z-10">
          <div className="flex justify-center mb-6">
            {/* Replace with your actual logo component or <img> */}
            <img src="/logo2.jpeg" alt="Company Logo" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-3xl text-neutral-950">ASDE Laser Cutting</CardTitle>
          <CardDescription className="text-neutral-600 text-base">
            Admin Portal
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-950 font-medium text-base">Email Address</Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-[#FFF8ED] border-r border-[#F3E5D5] rounded-l-2xl">
                  <Mail className="h-6 w-6 text-[#D29D5B]" />
                </div>
                <Input
                  id="email"
                  type="email"
                  className="pl-20 pr-4 py-7 text-base border-[#F3E5D5] focus:border-[#D29D5B] focus:ring-[#D29D5B] rounded-2xl bg-white w-full"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-950 font-medium text-base">Password</Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-[#FFF8ED] border-r border-[#F3E5D5] rounded-l-2xl">
                  <Lock className="h-6 w-6 text-[#D29D5B]" />
                </div>
                <Input
                  id="password"
                  type="password"
                  className="pl-20 pr-4 py-7 text-base border-[#F3E5D5] focus:border-[#D29D5B] focus:ring-[#D29D5B] rounded-2xl bg-white w-full"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#E4A143] hover:bg-[#D29D5B] text-white text-lg font-semibold py-7 rounded-2xl mt-4" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}