import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongos";
import User from "@/app/lib/models/User";

// Define CORS headers to allow all origins
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
    const { name, email, password } = body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already registered.",
          message: "Email already registered.",
        },
        { status: 409, headers: corsHeaders }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    };

    return NextResponse.json(
      { success: true, user: safeUser },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("AUTH_SIGNUP_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}