import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAndSendOtp, verifyPassword } from '../services/authService';
import { clearUserOtp, getUserByEmail, getUserById } from '../services/userService';
import { generateToken } from '../services/tokenService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userId = user._id.toString();

    await generateAndSendOtp(userId, user.email);

    const tempToken = generateToken({ userId, step: "2FA" }, '5m');

    res.json({ message: "OTP sent", tempToken, requires2FA: true });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { otp, tempToken } = req.body;

  try {
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET!) as any;
    const user = await getUserById(decoded.userId);

    if (decoded.step !== "2FA") {
      return res.status(401).json({ error: "Invalid token type" });
    }

    if (!user || user.otpCode !== otp || (user.otpExpiry && new Date() > user.otpExpiry)) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    const userId = user._id.toString();

    await clearUserOtp(userId);

    const finalToken = jwt.sign(
      { userId: user._id, role: "user" },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' }
    );

    res.json({ message: "Login successful", token: finalToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};