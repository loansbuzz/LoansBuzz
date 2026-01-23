import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongos";
import Partner from "../../lib/models/PartnerApplication";

/* =========================
   CORS – Preflight
========================= */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

/* =========================
   POST – Create Partner
========================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      city,
      experience,
      panNumber,
      aadhaarNumber,
      message,
    } = body;

    // Validation
    if (!fullName || !email || !phone || !city || !panNumber || !aadhaarNumber) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const partner = await Partner.create({
      fullName,
      email,
      phone,
      city,
      experience,
      panNumber,
      aadhaarNumber,
      message,
      status: "PENDING",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Partner request submitted successfully",
        data: partner,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("PARTNER_POST_ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
