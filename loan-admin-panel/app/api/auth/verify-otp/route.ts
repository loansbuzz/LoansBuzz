import { NextResponse } from "next/server";
import { consumeOtp, normalizeEmail } from "@/app/lib/otp-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ success: false, error: "Email and OTP are required." }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);
    const isValid = consumeOtp(normalizedEmail, otp.toString());

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP." }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "OTP verified successfully." }, { status: 200 });
  } catch (error) {
    console.error("VERIFY_OTP_ERROR:", error);
    return NextResponse.json({ success: false, error: "Unable to verify OTP." }, { status: 500 });
  }
}
