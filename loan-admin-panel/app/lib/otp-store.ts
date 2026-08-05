import { randomInt } from "crypto";
import nodemailer from "nodemailer";

export type OtpRecord = {
  otp: string;
  expiresAt: number;
};

const otpStore = new Map<string, OtpRecord>();

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function createOtp(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const otp = randomInt(100000, 999999).toString();
  otpStore.set(normalizedEmail, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
  return otp;
}

export function getOtp(email: string) {
  const normalizedEmail = normalizeEmail(email);
  return otpStore.get(normalizedEmail);
}

export function consumeOtp(email: string, otp: string) {
  const normalizedEmail = normalizeEmail(email);
  const record = otpStore.get(normalizedEmail);

  if (!record) {
    return false;
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  if (record.otp !== otp) {
    return false;
  }

  otpStore.delete(normalizedEmail);
  return true;
}

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `LoansBuzz Support <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: "Your LoansBuzz password reset OTP",
    html: `<p>Your password reset OTP is <strong>${otp}</strong>.</p><p>This code will expire in 10 minutes.</p>`,
  });
}
