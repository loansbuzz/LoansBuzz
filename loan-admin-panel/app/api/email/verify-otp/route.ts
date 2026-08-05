import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "../../../lib/mongos"; // adjust path to match your project
import Otp from "../../../lib/models/Otp"; // adjust path to match your project

const MAX_ATTEMPTS = 5;

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

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { success: false, error: "Verification code is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    await connectDB();

    const record = await Otp.findOne({ email: normalizedEmail, verified: false }).sort({ createdAt: -1 });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "No active code found — please request a new one" },
        { status: 400, headers: corsHeaders }
      );
    }

    // expiresAt is also enforced by MongoDB's TTL index, but check explicitly
    // too since TTL cleanup runs on a background sweep (~every 60s), not instantly
    if (record.expiresAt.getTime() < Date.now()) {
      await record.deleteOne();
      return NextResponse.json(
        { success: false, error: "Code has expired — please request a new one" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      await record.deleteOne();
      return NextResponse.json(
        { success: false, error: "Too many incorrect attempts — please request a new code" },
        { status: 429, headers: corsHeaders }
      );
    }

    const isMatch = record.otpHash === hashOtp(otp.trim());

    if (!isMatch) {
      record.attempts += 1;
      await record.save();
      const remaining = MAX_ATTEMPTS - record.attempts;
      return NextResponse.json(
        { success: false, error: `Incorrect code${remaining > 0 ? ` — ${remaining} attempt(s) left` : ""}` },
        { status: 400, headers: corsHeaders }
      );
    }

    record.verified = true;
    await record.save();

    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}