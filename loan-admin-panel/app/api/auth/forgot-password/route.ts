import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongos";
import User from "@/app/lib/models/User";
import { createOtp, normalizeEmail, sendOtpEmail } from "@/app/lib/otp-store";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json({ success: false, error: "No account found with that email." }, { status: 404 });
    }

    const otp = await createOtp(normalizedEmail);
    await sendOtpEmail(normalizedEmail, otp);

    return NextResponse.json({ success: true, message: "OTP sent to your email." }, { status: 200 });
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);
    return NextResponse.json({ success: false, error: "Unable to send OTP right now." }, { status: 500 });
  }
}
