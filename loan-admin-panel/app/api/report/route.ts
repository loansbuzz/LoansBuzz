// Install as: app/api/reports/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "../../lib/mongos";
import Report from "../../lib/models/Report";
import { verifyToken } from "../../lib/auth";

export const runtime = "nodejs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "no-store",
};

const send = (value: unknown, status = 200) =>
  NextResponse.json(value, { status, headers: cors });

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

export async function GET(req: NextRequest) {
  try {
    const header = req.headers.get("authorization") || "";
    if (!header.startsWith("Bearer ")) {
      return send({ success: false, error: "Please log in to view reports" }, 401);
    }
    const user = verifyToken(header.slice(7).trim());
    if (!user?.id || !Types.ObjectId.isValid(user.id)) {
      return send({ success: false, error: "Session expired or invalid" }, 401);
    }

    await connectDB();
    const records = await Report.find({ userId: user.id, status: "success" })
      .sort({ createdAt: -1 })
      .lean();

    const reports = records.map((r: any) => {
      const url = typeof r.reportUrl === "string" ? r.reportUrl.trim() : "";
      const hasJson = !!r.reportData && typeof r.reportData === "object";
      const isScore = r.reportType === "cibil-score-only" || r.reportFormat === "score" || url.startsWith("score:");
      const isJson = !isScore && (r.reportType === "cibil-pdf" || r.reportFormat === "json" || hasJson);
      const format = isScore ? "score" : isJson ? "json" : "pdf";
      const scoreFromMarker = url.startsWith("score:") ? Number(url.slice(6)) : NaN;
      const savedScore = typeof r.score === "number" && Number.isFinite(r.score) ? r.score : null;
      const score = savedScore ?? (Number.isFinite(scoreFromMarker) ? scoreFromMarker : null);
      const urlIsHttps = /^https:\/\//i.test(url);

      return {
        id: String(r._id),
        name: r.name,
        reportType: r.reportType,
        reportFormat: format,
        provider: r.provider || (format === "pdf" ? "verifyal" : "optim"),
        score,
        reportData: isJson ? (r.reportData ?? null) : null,
        creditSummary: isJson ? (r.creditSummary ?? null) : null,
        requestId: r.requestId || null,
        createdAt: r.createdAt,
        hasDownloadablePdf: format === "pdf" && urlIsHttps,
        hasSavedReport: format === "score" ? score !== null : format === "json" ? hasJson : urlIsHttps,
        // Do not send third-party signed PDF URLs to the browser.
      };
    });

    return send({ success: true, reports });
  } catch (err) {
    console.error("[REPORTS] Fetch failed", err instanceof Error ? err.name : "Unknown");
    return send({ success: false, error: "Unable to load reports" }, 500);
  }
}
