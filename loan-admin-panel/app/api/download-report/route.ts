// app/api/download-report/route.ts
import { NextRequest, NextResponse } from "next/server";

// Only allow proxying from Verifyal's own upload host — prevents this
// route being abused as an open proxy for arbitrary URLs.
const ALLOWED_HOST = "console.verifyal.com";

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
    const { searchParams } = new URL(req.url);
    const reportUrl = searchParams.get("url");
    const mode = searchParams.get("mode") === "view" ? "inline" : "attachment";

    if (!reportUrl) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400, headers: corsHeaders() });
    }

    let parsed: URL;
    try {
      parsed = new URL(reportUrl);
    } catch {
      return NextResponse.json({ error: "Invalid url" }, { status: 400, headers: corsHeaders() });
    }

    if (parsed.hostname !== ALLOWED_HOST) {
      return NextResponse.json({ error: "URL not allowed" }, { status: 400, headers: corsHeaders() });
    }

    const upstream = await fetch(parsed.toString());

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "Could not fetch report" }, { status: 502, headers: corsHeaders() });
    }

    const filename = parsed.pathname.split("/").pop() || "cibil-report.pdf";

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/pdf",
        "Content-Disposition": `${mode}; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("download-report error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500, headers: corsHeaders() });
  }
}