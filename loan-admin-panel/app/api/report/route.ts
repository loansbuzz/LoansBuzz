// app/api/reports/route.ts
import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "../../lib/mongos";   // adjust path to match your project
import Report from "../../lib/models/Report";       // adjust path to match your project
import { verifyToken } from "../../lib/auth";   // adjust path to match your project

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
    }
    const user = verifyToken(authHeader.split(" ")[1]);
    if (!user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
    }

    await connectDB();

    const reports = await Report.find({ userId: user.id, status: "success" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        reports: reports.map((r: any) => ({
          id: r._id.toString(),
          name: r.name,
          reportType: r.reportType,
          reportUrl: r.reportUrl,
          requestId: r.requestId,
          createdAt: r.createdAt,
        })),
      },
      { headers: corsHeaders() }
    );
  } catch (err) {
    console.error("reports lookup error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500, headers: corsHeaders() }
    );
  }
}