import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongos";
import User from "@/app/lib/models/User";
import { consumeOtp, normalizeEmail } from "@/app/lib/otp-store";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, otp, password } = body;

    if (!email || !otp || !password) {
      return NextResponse.json({ success: false, error: "Email, OTP and password are required." }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);
    const isValid = consumeOtp(normalizedEmail, otp.toString());

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP." }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email: normalizedEmail }, { password: hashedPassword });

    return NextResponse.json({ success: true, message: "Password reset successful." }, { status: 200 });
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);
    return NextResponse.json({ success: false, error: "Unable to reset password." }, { status: 500 });
  }
}
