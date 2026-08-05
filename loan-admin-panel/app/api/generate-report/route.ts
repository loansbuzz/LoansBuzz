import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongos";
import Report from "../../lib/models/Report";
import { verifyToken } from "../../lib/auth";

const VERIFYAL_TOKEN = process.env.VERIFYAL_TOKEN!;
const VERIFYAL_API_KEY = process.env.VERIFYAL_API_KEY!;

function corsHeaders(origin?: string) {
  return {
    "Access-Control-Allow-Origin": origin || "http://localhost:3001",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin") || undefined),
  });
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || undefined;
    const authHeader = req.headers.get("authorization");

    // --- AUTHENTICATION CHECK ---
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Authorization header",
        },
        {
          status: 401,
          headers: corsHeaders(origin),
        }
      );
    }

    let user;
    try {
      user = verifyToken(authHeader.split(" ")[1]);
    } catch (e) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid token",
        },
        {
          status: 401,
          headers: corsHeaders(origin),
        }
      );
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
          headers: corsHeaders(origin),
        }
      );
    }

    const body = await req.json();

    const {
      name,
      mobile,
      pan_card,
      gender,
      consent,
      reportType,
      dob,
      address,
      state,
      pincode,
    } = body;

    // --- BASIC VALIDATION ---
    if (!name || !mobile || !pan_card || !gender || consent !== "Y") {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
          headers: corsHeaders(origin),
        }
      );
    }

    if (!reportType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing report type",
        },
        {
          status: 400,
          headers: corsHeaders(origin),
        }
      );
    }

    await connectDB();

    try {
      // --- ROUTE TO APPROPRIATE VENDOR ---
      let vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError;

      switch (reportType.toLowerCase()) {
        case "cibil-pdf":
          ({ vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError } =
            await generateCIBILReport(name, mobile, pan_card, gender, consent));
          break;

        case "experian-pdf":
          ({ vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError } =
            await generateExperianReport(name, mobile, pan_card, gender, consent));
          break;

        case "crif-pdf":
          ({ vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError } =
            await generateCRIFReport(name, mobile, reportType, consent));
          break;

        case "equifax-pdf":
          ({ vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError } =
            await generateEquifaxReport(name, mobile, pan_card, gender, dob, address, state, pincode, consent));
          break;

        case "cibil-score-only":
          ({ vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError } =
            await generateCIBILScoreOnly(name, mobile, pan_card, consent));
          break;

        default:
          return NextResponse.json(
            {
              success: false,
              error: "Invalid report type",
            },
            {
              status: 400,
              headers: corsHeaders(origin),
            }
          );
      }

      // --- SAVE TO DATABASE ---
      if (vendorRes.status !== 200 || !reportUrl) {
        await Report.create({
          userId: user.id,
          name,
          mobile,
          panCard: pan_card,
          reportType,
          reportUrl: "",
          requestId,
          status: "failed",
          // vendorMessage: vendorMessage || vendorError,
        });

        return NextResponse.json(
          {
            success: false,
            error: vendorError || vendorMessage || "Failed to generate report",
          },
          {
            status: 400,
            headers: corsHeaders(origin),
          }
        );
      }

      // Success - save report record
      await Report.create({
        userId: user.id,
        name,
        mobile,
        panCard: pan_card,
        reportType,
        reportUrl,
        requestId,
        status: "success",
      });

      return NextResponse.json(
        {
          success: true,
          reportUrl,
          requestId,
          reportType,
        },
        {
          headers: corsHeaders(origin),
        }
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Vendor API error";
      
      await Report.create({
        userId: user.id,
        name,
        mobile,
        panCard: pan_card,
        reportType,
        reportUrl: "",
        requestId: null,
        status: "failed",
        // vendorMessage: errorMsg,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
        },
        {
          status: 400,
          headers: corsHeaders(origin),
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Server Error",
      },
      {
        status: 500,
        headers: corsHeaders(req.headers.get("origin") || undefined),
      }
    );
  }
}

// ============================================
// VENDOR-SPECIFIC IMPLEMENTATIONS
// ============================================

async function generateCIBILReport(
  name: string,
  mobile: string,
  pan_card: string,
  gender: string,
  consent: string
) {
  const form = new FormData();
  form.append("name", name);
  form.append("mobile", mobile);
  form.append("pan_card", pan_card);
  form.append("report_type", "cibil");
  form.append("gender", gender);
  form.append("consent", consent);

  const vendorRes = await fetch(
    "https://console.verifyal.com/vendor-api/generate-report",
    {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
    }
  );

  const vendorJson = await vendorRes.json();
  const reportUrl = vendorJson?.data?.report_url;
  const requestId = vendorJson?.request_uid ?? null;
  const vendorMessage = vendorJson?.message ?? "";
  const vendorError = vendorJson?.error ?? "";

console.log("REPORT TYPE: cibil");
console.log("STATUS:", vendorRes.status);
console.log("VERIFYAL RESPONSE:", JSON.stringify(vendorJson, null, 2));
  return { vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError };
}

async function generateExperianReport(
  name: string,
  mobile: string,
  pan_card: string,
  gender: string,
  consent: string
) {
  const form = new FormData();
  form.append("name", name);
  form.append("mobile", mobile);
  form.append("pan_card", pan_card);
  form.append("report_type", "experian");
  form.append("gender", gender);
  form.append("consent", consent);

  const vendorRes = await fetch(
    "https://console.verifyal.com/vendor-api/generate-report",
    {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
    }
  );

  const vendorJson = await vendorRes.json();
  const reportUrl = vendorJson?.data?.report_url;
  const requestId = vendorJson?.request_uid ?? null;
  const vendorMessage = vendorJson?.message ?? "";
  const vendorError = vendorJson?.error ?? "";

console.log("REPORT TYPE: experian");
console.log("STATUS:", vendorRes.status);
console.log("VERIFYAL RESPONSE:", JSON.stringify(vendorJson, null, 2));
  return { vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError };
}

async function generateCRIFReport(
  name: string,
  mobile: string,
  report_type: string,
  consent: string
) {
  const form = new FormData();
  form.append("name", name);
  form.append("mobile", mobile);
  form.append("report_type", "crif");
  form.append("consent", consent);

  const vendorRes = await fetch(
    "https://console.verifyal.com/vendor-api/generate-report",
    {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
    }
  );

  const vendorJson = await vendorRes.json();
  const reportUrl = vendorJson?.data?.report_url;
  const requestId = vendorJson?.request_uid ?? null;
  const vendorMessage = vendorJson?.message ?? "";
  const vendorError = vendorJson?.error ?? "";

console.log("REPORT TYPE: crif");
console.log("STATUS:", vendorRes.status);
console.log("VERIFYAL RESPONSE:", JSON.stringify(vendorJson, null, 2));

  return { vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError };
}

async function generateEquifaxReport(
  name: string,
  mobile: string,
  pan_card: string,
  gender: string,
  dob: string,
  address: string,
  state: string,
  pincode: string,
  consent: string
) {
  const form = new FormData();
  form.append("name", name);
  form.append("mobile", mobile);
  form.append("pan_card", pan_card);
  form.append("report_type", "equifax");
  form.append("gender", gender);
  form.append("dob", dob);
  form.append("address", address);
  form.append("state", state);
  form.append("pincode", pincode);
  form.append("consent", consent);

  const vendorRes = await fetch(
    "https://console.verifyal.com/vendor-api/generate-report",
    {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
    }
  );

  const vendorJson = await vendorRes.json();
  const reportUrl = vendorJson?.data?.report_url;
  const requestId = vendorJson?.request_uid ?? null;
  const vendorMessage = vendorJson?.message ?? "";
  const vendorError = vendorJson?.error ?? "";

  console.log("REPORT TYPE: equifax");
  console.log("STATUS:", vendorRes.status);
  console.log("VERIFYAL RESPONSE:", JSON.stringify(vendorJson, null, 2));

  return { vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError };
}

async function generateCIBILScoreOnly(
  name: string,
  mobile: string,
  pan_card: string,
  consent: string
) {
  const form = new FormData();
  form.append("name", name);
  form.append("mobile", mobile);
  form.append("pan_card", pan_card);
  form.append("consent", consent);

  const vendorRes = await fetch(
    "https://console.verifyal.com/vendor-api/cibil-score-only",
    {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
    }
  );

  const vendorJson = await vendorRes.json();
  // Score-only returns score in response, not a URL
  const score = vendorJson?.data?.score;
  const reportUrl = vendorJson?.data?.report_url || `score:${score}`;
  const requestId = vendorJson?.request_uid ?? null;
  const vendorMessage = vendorJson?.message ?? "";
  const vendorError = vendorJson?.error ?? "";

  console.log("REPORT TYPE: cibil-score-only");
  console.log("STATUS:", vendorRes.status);
  console.log("VERIFYAL RESPONSE:", JSON.stringify(vendorJson, null, 2));

  return { vendorRes, vendorJson, reportUrl, requestId, vendorMessage, vendorError };
}