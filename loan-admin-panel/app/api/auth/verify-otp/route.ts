import { NextResponse } from "next/server";
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
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required." },
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

    return NextResponse.json(
      { success: true, message: "OTP verified successfully." },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("VERIFY_OTP_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unable to verify OTP." },
      { status: 500, headers: corsHeaders }
    );
  }
}