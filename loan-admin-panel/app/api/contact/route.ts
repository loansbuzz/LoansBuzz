import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongos";
import ContactMessage from "../../lib/models/ContactMessage";

/**
 * POST /api/contact
 * Receive contact messages from frontend
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    console.log("📩 Incoming Contact Message:", body);

    // Basic validation
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    await ContactMessage.create({
      fullName,
      email,
      phone,
      subject,
      message,
      status: "PENDING",
    });

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("❌ CONTACT_POST_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/**
 * REQUIRED: Handle preflight CORS requests
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders(),
    }
  );
}

/**
 * Centralized CORS headers
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // 🔴 restrict in production
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
