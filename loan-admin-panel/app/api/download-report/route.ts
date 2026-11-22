// Install as: app/api/download-report/route.ts
// Authenticated PDF proxy by saved report ID (never a caller-supplied URL).
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
const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers: cors });

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

export async function GET(req: NextRequest) {
  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) {
    return json({ error: "Please log in again" }, 401);
  }
  const user = verifyToken(header.slice(7).trim());
  if (!user?.id || !Types.ObjectId.isValid(user.id)) {
    return json({ error: "Session expired or invalid" }, 401);
  }

  const id = new URL(req.url).searchParams.get("id") || "";
  if (!Types.ObjectId.isValid(id)) {
    return json({ error: "Invalid report ID" }, 400);
  }

  try {
    await connectDB();
    const record = await Report.findOne({ _id: id, userId: user.id, status: "success" })
      .select("reportType reportFormat reportUrl")
      .lean();
    if (!record) return json({ error: "Report not found" }, 404);

    if (record.reportType === "cibil-pdf" || record.reportType === "cibil-score-only" ||
        record.reportFormat === "json" || record.reportFormat === "score") {
      return json({ error: "This report is JSON/score data. Use its in-app viewer and Save as PDF." }, 409);
    }

    const url = typeof record.reportUrl === "string" ? record.reportUrl : "";
    let parsed: URL;
    try { parsed = new URL(url); } catch { return json({ error: "Saved PDF URL is missing or invalid" }, 422); }

    // Provider host allowlist protects against SSRF. Add a provider-confirmed
    // file host ONLY after checking the exact official report URL domain.
    const allowedHosts = new Set(["console.verifyal.com"]);
    if (parsed.protocol !== "https:" || !allowedHosts.has(parsed.hostname) ||
        parsed.port !== "" || parsed.username || parsed.password) {
      return json({ error: "This PDF host is not approved; verify the provider's report domain" }, 422);
    }

    const upstream = await fetch(parsed.toString(), {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });
    if (!upstream.ok) {
      return json({ error: upstream.status === 403 || upstream.status === 404
        ? "Saved PDF link has expired or is unavailable" : "Provider could not deliver the saved PDF" }, 502);
    }

    // Verify the response is a PDF, not an HTML login page or JSON error.
    const bytes = new Uint8Array(await upstream.arrayBuffer());
    const isPdf = bytes.length >= 5 && bytes[0] === 37 && bytes[1] === 80 &&
      bytes[2] === 68 && bytes[3] === 70 && bytes[4] === 45;
    if (!isPdf) return json({ error: "Provider returned something other than a PDF" }, 502);
    if (bytes.length > 20 * 1024 * 1024) return json({ error: "PDF exceeds maximum supported size" }, 413);

    const disposition = new URL(req.url).searchParams.get("mode") === "download" ? "attachment" : "inline";
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        ...cors,
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="credit-report-${id}.pdf"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[DOWNLOAD REPORT] Failure", err instanceof Error ? err.name : "Unknown");
    return json({ error: "Unable to retrieve PDF. Check provider access and the saved link." }, 502);
  }
}
