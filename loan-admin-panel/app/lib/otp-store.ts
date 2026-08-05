// app/lib/otp-store.ts
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "@/app/lib/mongos";
import Otp from "@/app/lib/models/Otp"; // reuse your existing Mongoose model

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function createOtp(email: string) {
  await connectDB();
  const normalizedEmail = normalizeEmail(email);
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // remove any previous unconsumed OTPs for this email, then create fresh
  await Otp.deleteMany({ email: normalizedEmail });
  await Otp.create({ email: normalizedEmail, otpHash, expiresAt, verified: false });

  return otp;
}

export async function consumeOtp(email: string, otp: string) {
  await connectDB();
  const normalizedEmail = normalizeEmail(email);
  const record = await Otp.findOne({ email: normalizedEmail });

  if (!record) return false;
  if (record.expiresAt.getTime() < Date.now()) {
    await record.deleteOne();
    return false;
  }
  if (record.otpHash !== hashOtp(otp)) return false;

  await record.deleteOne();
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