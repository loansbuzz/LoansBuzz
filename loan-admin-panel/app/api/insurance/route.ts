import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongos";
import InsuranceQuote from "@/app/lib/models/InsuranceQuote";

/* =========================
   POST – Create Insurance Quote
========================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { fullName, email, phone, insuranceType } = body;

    if (!fullName || !email || !phone || !insuranceType) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    await InsuranceQuote.create({
      fullName,
      email,
      phone,
      insuranceType,
      status: "PENDING",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Insurance quote submitted successfully",
      },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("INSURANCE_POST_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/* =========================
   OPTIONS – CORS Preflight
========================= */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: corsHeaders(),
    }
  );
}

/* =========================
   CORS HEADERS (Reusable)
========================= */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // 🔒 change to domain in prod
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
