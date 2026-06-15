import crypto from 'crypto';
import { saveUserOtp } from './userService';
import bcrypt from 'bcrypt';
import { sendEmail } from './emailService';

export const generateAndSendOtp = async (adminId: string, email: string) => {
  // 1. Generate a 6-digit code
  const otp = crypto.randomInt(100000, 999999).toString();

  await saveUserOtp(adminId, otp);

  const subject = "Your Admin Login Code";
  const text = `Your authentication code is: ${otp}. It will expire in 5 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Admin Authentication</h2>
      <p>ASDE Laser Cutting requested an authentication code for your admin account.</p>
      <h1 style="color: #333; letter-spacing: 5px;">${otp}</h1>
      <p>This code will expire in 5 minutes. If this was not you, please secure your account.</p>
    </div>
  `;

  await sendEmail(email, subject, text, html);

  return true;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};