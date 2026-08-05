import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // 👈 1. Import jsonwebtoken
import { connectDB } from "@/app/lib/mongos";
import User from "@/app/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

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

    // 👈 2. Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { id: safeUser.id, email: safeUser.email },
      JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 👈 3. Return BOTH token and user in the response
    return NextResponse.json(
      { success: true, token, user: safeUser },
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