import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongos";
import User from "@/app/lib/models/User";
import { consumeOtp, normalizeEmail } from "@/app/lib/otp-store";

// CORS headers configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, otp, password } = body;

    if (!email || !otp || !password) {
      return NextResponse.json(
        { success: false, error: "Email, OTP and password are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const isValid = consumeOtp(normalizedEmail, otp.toString());

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP." },
        { status: 401, headers: corsHeaders }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email: normalizedEmail }, { password: hashedPassword });

    return NextResponse.json(
      { success: true, message: "Password reset successful." },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to reset password." },
      { status: 500, headers: corsHeaders }
    );
  }
}