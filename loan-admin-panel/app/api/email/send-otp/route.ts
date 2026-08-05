// app/api/email/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "../../../lib/mongos"; // adjust path to match your project
import Otp from "../../../lib/models/Otp";            // adjust path to match your project

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds between sends

// Keep the transporter outside the handler so the SMTP connection stays warm
// across invocations instead of reconnecting on every request.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL, // Your Gmail address
    pass: process.env.
      GOOGLE_PASSWORD, // Gmail App Password, not your normal login password
  },
});


function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function generateOtp() {
  // 6-digit numeric code, zero-padded
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    await connectDB();

    // Rate-limit: block resend if the most recent OTP for this email
    // was created less than RESEND_COOLDOWN_MS ago
    const recent = await Otp.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
    if (recent && Date.now() - recent.createdAt.getTime() < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - recent.createdAt.getTime())) / 1000
      );
      return NextResponse.json(
        { success: false, error: `Please wait ${waitSeconds}s before requesting another code` },
        { status: 429, headers: corsHeaders() }
      );
    }

    // Invalidate any previous unverified OTPs for this email
    await Otp.deleteMany({ email: normalizedEmail, verified: false });

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await Otp.create({
      email: normalizedEmail,
      otpHash,
      expiresAt,
    });

    // Await the send so the email is confirmed handed off to Gmail's SMTP
    // server before the function returns — matters especially on serverless,
    // where the runtime can freeze/terminate right after the response.
    await transporter.sendMail({
      from: `"Loans Buzz" <${process.env.GMAIL_ID}>`,
      to: normalizedEmail,
      subject: "Your Loans Buzz verification code",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333;">Email Verification</h2>
          <p style="font-size: 16px;">Use the code below to verify your email address.</p>
          <div style="background: #f4f4f4; padding: 10px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px;">
            ${otp}
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">This code expires in 5 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" }, { headers: corsHeaders() });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send verification code" },
      { status: 500, headers: corsHeaders() }
    );
  }
}