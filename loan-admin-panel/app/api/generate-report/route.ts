import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongos";
import Report from "../../lib/models/Report";
import { verifyToken } from "../../lib/auth";

const VERIFYAL_TOKEN = process.env.VERIFYAL_TOKEN;
const VERIFYAL_API_KEY = process.env.VERIFYAL_API_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

const VERIFYAL_GENERATE_URL =
  "https://console.verifyal.com/vendor-api/generate-report";
const OPTIM_URL = "https://optim.co.in/custom_api/";
const OPTIM_PUBLIC_KEY = process.env.OPTIM_API_PUBLIC_KEY;
const OPTIM_SECRET_KEY = process.env.OPTIM_API_SECRET_KEY;

type ReportType =
  | "cibil-pdf"
  | "experian-pdf"
  | "crif-pdf"
  | "equifax-pdf"
  | "cibil-score-only";

type VerifyAlResponse = {
  status?: number;
  message?: string;
  data?: any;
  error?: string;
  request_uid?: string;
  debited?: boolean;
};

type VendorResult = {
  ok: boolean;
  httpStatus: number;
  vendorStatus: number | null;
  reportUrl: string | null;
  score: number | string | null;
  requestId: string | null;
  message: string;
  error: string;
  debited: boolean | null;
  raw: VerifyAlResponse;
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { ...corsHeaders, "Cache-Control": "no-store" },
  });
}

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeReportType(value: unknown): ReportType | null {
  const type = cleanString(value).toLowerCase();

  const aliases: Record<string, ReportType> = {
    "cibil-pdf": "cibil-pdf",
    cibil: "cibil-pdf",
    "experian-pdf": "experian-pdf",
    experian: "experian-pdf",
    "crif-pdf": "crif-pdf",
    crif: "crif-pdf",
    "equifax-pdf": "equifax-pdf",
    equifax: "equifax-pdf",
    "cibil-score-only": "cibil-score-only",
    "cibil-score": "cibil-score-only",
  };

  return aliases[type] ?? null;
}

function validatePan(pan: string) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());
}

function validateMobile(mobile: string) {
  return /^[6-9]\d{9}$/.test(mobile);
}

function getVendorFailureStatus(result: VendorResult) {
  const message = `${result.message} ${result.error}`.toLowerCase();

  if (
    message.includes("temporary") ||
    message.includes("try again") ||
    message.includes("service issue") ||
    result.vendorStatus === 503
  ) {
    return 503;
  }

  if (
    result.vendorStatus === 401 ||
    result.vendorStatus === 403 ||
    result.httpStatus === 401 ||
    result.httpStatus === 403
  ) {
    return 502;
  }

  if (result.vendorStatus === 422) return 422;
  if (result.vendorStatus === 400) return 400;

  return 502;
}

async function safeSaveReport(data: {
  userId: string;
  name: string;
  mobile: string;
  panCard: string;
  reportType: ReportType;
  reportUrl?: string;
  reportFormat?: "pdf" | "json" | "score";
  reportData?: Record<string, unknown> | null;
  creditSummary?: Record<string, unknown> | null;
  score?: number | null;
  provider?: string;
  requestId: string | null;
  status: "success" | "failed";
}) {
  try {
    await Report.create({ ...data, reportUrl: data.reportUrl ?? "" });
  } catch (error) {
    // Do not hide a provider result behind a history-saving failure.
    console.error("Report history persistence failed");
  }
}

type OptimResult = {
  providerStatus?: number | null;
  missingFields?: string[];
  transactionUuid?: string | null;
  ok: boolean;
  httpStatus: number;
  score: number | null;
  scoreName: string | null;
  requestId: string | null;
  reportData: Record<string, unknown> | null;
  creditSummary: Record<string, unknown> | null;
  error: string;
  errorCode: string | null;
  failureStage: string | null;
  verificationPending: boolean;
};

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function namesFromInput(name: string, input: Record<string, unknown>) {
  // Explicit name components prevent incorrect splitting of compound names.
  const parts = name.split(/\s+/).filter(Boolean);
  const first = cleanString(input.cust_fname);
  if (first) {
    return {
      cust_fname: first,
      cust_mname: cleanString(input.cust_mname),
      cust_lname: cleanString(input.cust_lname),
    };
  }
  return {
    cust_fname: parts[0] ?? "",
    cust_mname: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    cust_lname: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

// Enable with OPTIM_DEBUG_LOGS=true. Never log full credit reports,
// PAN, mobile, customer names, API keys, or upstream raw response bodies.
const OPTIM_DEBUG_LOGS = process.env.OPTIM_DEBUG_LOGS === "true" || (process.env.NODE_ENV !== "production" && process.env.OPTIM_DEBUG_LOGS !== "false");

function optimDebug(stage: string, details: Record<string, unknown>) {
  if (OPTIM_DEBUG_LOGS) {
    console.info(`[OPTIM DEBUG] ${stage}`, details);
  }
}

function objectKeys(value: unknown): string[] {
  return isRecord(value) ? Object.keys(value) : [];
}

// Decode only documented envelope locations; never search arbitrary report data.
function responseObject(value: unknown): Record<string, any> | null {
  if (isRecord(value)) return value;
  if (typeof value === "string") {
    try { const parsed = JSON.parse(value); return isRecord(parsed) ? parsed : null; }
    catch { return null; }
  }
  return null;
}

function safeCode(value: unknown): string | null {
  return typeof value === "string" && /^(?:[A-Z_]{2,64})$/.test(value) ? value : null;
}

// Extract field identifiers only, never customer values or arbitrary free text.
function missingFieldNames(value: unknown): string[] {
  const fields = new Set<string>();
  const known = /\b(?:cust_[a-z][a-z0-9_]{0,48}|api_public_key|api_secret_key|server_data|payload|request)\b/gi;
  function visit(node: unknown, depth = 0) {
    if (depth > 8 || fields.size >= 50) return;
    if (typeof node === "string") {
      for (const match of node.matchAll(known)) fields.add(match[0].toLowerCase());
      // Accept plain snake_case field identifiers, not arbitrary values.
      if (/^[a-z][a-z0-9]*(?:_[a-z][a-z0-9]*)+$/.test(node) && node.length <= 64) fields.add(node);
    } else if (Array.isArray(node)) {
      node.slice(0, 100).forEach(item => visit(item, depth + 1));
    } else if (isRecord(node)) {
      for (const [key, item] of Object.entries(node).slice(0, 100)) {
        if (key.startsWith("cust_")) visit(key, depth + 1);
        visit(item, depth + 1);
      }
    }
  }
  visit(value);
  return [...fields];
}

function diagnosticShape(value: unknown, depth = 0): unknown {
  if (depth > 5) return "[depth limit]";
  if (Array.isArray(value)) return value.slice(0, 20).map(v => diagnosticShape(v, depth + 1));
  if (isRecord(value)) return Object.fromEntries(Object.entries(value).slice(0, 30).map(([key, item]) => [
    /^[a-zA-Z_][a-zA-Z0-9_-]{0,63}$/.test(key) ? key : "[redacted key]",
    diagnosticShape(item, depth + 1),
  ]));
  return value === null ? null : typeof value;
}

function httpCodeOk(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  const n = typeof value === "number" || (typeof value === "string" && /^\d{3}$/.test(value)) ? Number(value) : NaN;
  return n >= 200 && n < 300;
}

async function callOptimCibil(input: {
  name: string;
  mobile: string;
  panCard: string;
  body: Record<string, unknown>;
}): Promise<OptimResult> {
  optimDebug("configuration", {
    endpoint: OPTIM_URL,
    publicKeyConfigured: Boolean(OPTIM_PUBLIC_KEY),
    secretKeyConfigured: Boolean(OPTIM_SECRET_KEY),
  });

  if (!OPTIM_PUBLIC_KEY || !OPTIM_SECRET_KEY) {
    throw new Error("OPTIM_CONFIGURATION_MISSING");
  }

  const names = namesFromInput(input.name, input.body);
  const form = new FormData();
  form.append("request", "request_crv1");
  form.append("server_data", "");
  form.append("payload", JSON.stringify({
    ...names,
    cust_pan: input.panCard,
    cust_phone: input.mobile,
  }));
  form.append("api_public_key", OPTIM_PUBLIC_KEY);
  form.append("api_secret_key", OPTIM_SECRET_KEY);

  // Log only field presence, never form values.
  optimDebug("request prepared", {
    method: "POST",
    operation: "request_crv1",
    formFieldNames: Array.from(form.keys()),
    customerFieldNames: ["cust_fname", "cust_mname", "cust_lname", "cust_pan", "cust_phone"],
    hasFirstName: Boolean(names.cust_fname),
    hasMiddleName: Boolean(names.cust_mname),
    hasLastName: Boolean(names.cust_lname),
    hasPan: Boolean(input.panCard),
    hasMobile: Boolean(input.mobile),
    // Do not set Content-Type manually: fetch supplies multipart boundary.
  });

  // One bureau pull only. Never retry automatically after an uncertain response.
  let res: Response;
  const startedAt = Date.now();
  try {
    res = await fetch(OPTIM_URL, {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(35000),
      redirect: "error",
    });
  } catch (cause) {
    optimDebug("network failure", {
      durationMs: Date.now() - startedAt,
      errorName: cause instanceof Error ? cause.name : typeof cause,
      errorCode: isRecord(cause) && typeof cause.code === "string" ? cause.code : null,
      // Do not log the raw error message: URLs or other data may be embedded.
    });
    throw new Error("OPTIM_REQUEST_OUTCOME_UNKNOWN");
  }

  optimDebug("HTTP response", {
    httpStatus: res.status,
    httpOk: res.ok,
    contentType: res.headers.get("content-type"),
    durationMs: Date.now() - startedAt,
  });

  // Read once; log length and JSON shape, never log response body.
  let rawText: string;
  try {
    rawText = await res.text();
  } catch (cause) {
    optimDebug("body read failed", {
      errorName: cause instanceof Error ? cause.name : typeof cause,
    });
    throw new Error("OPTIM_REQUEST_OUTCOME_UNKNOWN");
  }

  optimDebug("body received", {
    bytesApprox: Buffer.byteLength(rawText, "utf8"),
    empty: rawText.length === 0,
  });

  let data: unknown;
  try {
    data = JSON.parse(rawText);
  } catch {
    optimDebug("JSON parse failed", {
      httpStatus: res.status,
      bodyLength: rawText.length,
      // Never print rawText: it may contain customer/credit data.
    });
    data = null;
  }

  if (!isRecord(data)) {
    return {
      ok: false, httpStatus: res.status, score: null, scoreName: null,
      requestId: null, reportData: null, creditSummary: null,
      error: "Provider returned invalid JSON", errorCode: "INVALID_RESPONSE",
      failureStage: null, verificationPending: false,
    };
  }

  const wrapper = responseObject(data.provider_response);
  const wrapperBody = responseObject(wrapper?.response);
  const directBody = responseObject(data.response);
  const envelope = responseObject(data.data);
  const reportResponse = responseObject(envelope?.report_response);
  const reportResponseBody = responseObject(reportResponse?.response);
  const nestedWrapper = responseObject(reportResponse?.provider_response);
  const nestedWrapperBody = responseObject(nestedWrapper?.response);
  const candidates = [
    { path: "data.report_response.GetCustomerAssetsResponse", value: reportResponse?.GetCustomerAssetsResponse },
    { path: "data.report_response.response.GetCustomerAssetsResponse", value: reportResponseBody?.GetCustomerAssetsResponse },
    { path: "data.report_response.provider_response.response.GetCustomerAssetsResponse", value: nestedWrapperBody?.GetCustomerAssetsResponse },
    { path: "data.report_response (business object)", value: reportResponse?.ResponseStatus ? reportResponse : null },
    { path: "provider_response.response.GetCustomerAssetsResponse", value: wrapperBody?.GetCustomerAssetsResponse },
    { path: "response.GetCustomerAssetsResponse", value: directBody?.GetCustomerAssetsResponse },
    { path: "GetCustomerAssetsResponse", value: data.GetCustomerAssetsResponse },
  ];
  const matched = candidates.find(c => responseObject(c.value) !== null);
  const business = responseObject(matched?.value);
  const report = responseObject(business?.GetCustomerAssetsSuccess);
  const providerFailure = business?.GetCustomerAssetsError?.Failure;
  const responseStatus = business?.ResponseStatus;
  const messages = [providerFailure?.Message, data.error, data.msg, data.message, wrapper?.error, reportResponse?.error, nestedWrapper?.error]
    .filter((v): v is string => typeof v === "string");
  const verificationPending = messages.some(m => /IV status.*IN_PROGRESS/i.test(m));
  // Never log or return unfiltered provider free text: it can contain personal data.
  const errorCode = safeCode(data.error_code);
  const failureStage = safeCode(data.failure_stage);
  const providerStatus = typeof data.status === "number" || (typeof data.status === "string" && /^\d{3}$/.test(data.status)) ? Number(data.status) : null;
  const transaction = envelope?.transaction_uuid ?? data.transaction_uuid;
  const transactionUuid = typeof transaction === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(transaction) ? transaction : null;
  const selectionFailure = errorCode === "NO_ELIGIBLE_PROVIDER" || failureStage === "PROVIDER_SELECTION";
  const missingRaw = responseObject(data.data)?.provider_missing_fields;
  const missingFields = missingFieldNames(missingRaw);
  if (selectionFailure) {
    console.info("[OPTIM] PROVIDER SELECTION DIAGNOSTICS", {
      status: providerStatus,
      errorCode, failureStage,
      messagePresent: typeof data.msg === "string",
      // Provider text can contain personal data; log only its presence.
      transactionUuidPresent: Boolean(transactionUuid),
      missingFields,
      missingFieldsShape: diagnosticShape(missingRaw),
    });
  }
  optimDebug("response shape", {
    topLevelKeys: objectKeys(data),
    topLevelSuccess: typeof data.success === "boolean" ? data.success : null,
    topLevelStatus: typeof data.status === "number" ? data.status : null,
    wrapperPresent: Boolean(wrapper),
    wrapperKeys: objectKeys(wrapper),
    wrapperResponseKeys: objectKeys(wrapperBody),
    directResponseKeys: objectKeys(directBody),
    dataKeys: objectKeys(envelope),
    reportResponseType: typeof envelope?.report_response,
    reportResponseKeys: objectKeys(reportResponse),
    reportResponseBodyKeys: objectKeys(reportResponseBody),
    nestedProviderResponseKeys: objectKeys(nestedWrapperBody),
    reportValueType: typeof envelope?.report_value,
    reportValueLooksLikeScore: (typeof envelope?.report_value === "number" || (typeof envelope?.report_value === "string" && /^\d{3}$/.test(envelope.report_value))) && Number(envelope.report_value) >= 300 && Number(envelope.report_value) <= 900,
    transactionUuidPresent: Boolean(transactionUuid),
    matchedPath: matched?.path ?? "NO MATCH",
    responseStatus: responseStatus === "Success" || responseStatus === "Failure" ? responseStatus : null,
    reportPresent: Boolean(report),
    errorCode, failureStage,
    errorFieldPresent: messages.length > 0,
    verificationPending,
  });

  const checks = {
    httpOk: res.ok,
    topLevelSuccess: (data.success === true || (data.success == null && providerStatus === 200)) && (data.status == null || providerStatus === 200) && !errorCode && !failureStage,
    wrapperSuccess: (wrapper ? wrapper.success === true : data.provider_response == null) && (nestedWrapper ? nestedWrapper.success === true : reportResponse?.provider_response == null) && reportResponse?.success !== false,
    providerHttpOk: httpCodeOk(wrapper?.http_code) && httpCodeOk(data.http_code) && httpCodeOk(nestedWrapper?.http_code) && httpCodeOk(reportResponse?.http_code),
    businessStatusSuccess: responseStatus === "Success",
    hasReportObject: Boolean(report && Object.keys(report).length),
    safetyCheckPassed: report?.Asset?.SafetyCheckFailure !== true,
    verificationComplete: !verificationPending,
  };
  const failedChecks = Object.entries(checks).filter(([, passed]) => !passed).map(([key]) => key);
  const ok = failedChecks.length === 0;
  const rawScore = report?.Asset?.TrueLinkCreditReport?.Borrower?.CreditScore?.riskScore;
  const numeric = typeof rawScore === "number" || (typeof rawScore === "string" && /^\d+$/.test(rawScore.trim())) ? Number(rawScore) : NaN;
  const score = Number.isInteger(numeric) && numeric >= 300 && numeric <= 900 ? numeric : null;
  optimDebug("result checks", { ...checks, failedChecks, accepted: ok, scoreAvailable: score !== null });
  if (!ok) console.warn("[OPTIM] report rejected", { httpStatus: res.status, matchedPath: matched?.path ?? "NO MATCH", failedChecks, errorCode, failureStage, verificationPending });

  const fallbackCode = !res.ok ? "PROVIDER_HTTP_ERROR" : !matched ? "UNRECOGNIZED_RESPONSE_STRUCTURE" : "PROVIDER_RESPONSE_FAILED";
  const error = verificationPending ? "Customer identity verification is in progress. Confirm verification status with Optim before requesting again."
    : res.status === 401 || res.status === 403 ? "Optim rejected provider authentication or access. Check API credentials and service permissions."
    : !res.ok ? `Optim returned HTTP ${res.status}. Check provider status before retrying.`
    : selectionFailure ? (missingFields.length
      ? `Optim could not select a CIBIL provider. Reported missing fields: ${missingFields.join(", ")}. Confirm the required values with Optim.`
      : "Optim could not select an eligible CIBIL provider. Check service configuration and required fields with Optim.")
    : !matched ? "Optim returned an unrecognized response structure. Check server diagnostic logs."
    : report?.Asset?.SafetyCheckFailure === true ? "Provider safety check failed. Report cannot be displayed."
    : "Optim did not confirm a successful credit report. Check provider status before retrying.";
  return {
    ok, httpStatus: res.status,
    providerStatus, missingFields, transactionUuid,
    score: ok ? score : null,
    scoreName: ok && typeof report?.Asset?.TrueLinkCreditReport?.Borrower?.CreditScore?.scoreName === "string" ? report.Asset.TrueLinkCreditReport.Borrower.CreditScore.scoreName : null,
    requestId: transactionUuid ?? (typeof business?.ResponseKey === "string" ? business.ResponseKey : null),
    reportData: ok ? report : null,
    creditSummary: ok && isRecord(report?.CreditSummaryData) ? report.CreditSummaryData : null,
    error: ok ? "" : error,
    errorCode: ok ? null : errorCode ?? fallbackCode,
    failureStage: ok ? null : failureStage ?? "PROVIDER_RESPONSE_VALIDATION",
    verificationPending,
  };
}

async function callVerifyAl(
  url: string,
  fields: Record<string, string>,
  mode: "report" | "score" = "report"
): Promise<VendorResult> {
  if (!VERIFYAL_TOKEN || !VERIFYAL_API_KEY) {
    throw new Error(
      "VERIFYAL_TOKEN or VERIFYAL_API_KEY is missing from environment variables"
    );
  }

  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, value);
    }
  });

  let vendorRes: Response;

  try {
    vendorRes = await fetch(url, {
      method: "POST",
      headers: {
        Token: VERIFYAL_TOKEN,
        "API-KEY": VERIFYAL_API_KEY,
      },
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "VerifyAL network request failed";
    throw new Error(`VerifyAL network error: ${message}`);
  }

  const rawText = await vendorRes.text();
  let vendorJson: VerifyAlResponse = {};

  try {
    vendorJson = rawText ? JSON.parse(rawText) : {};
  } catch {
    return {
      ok: false,
      httpStatus: vendorRes.status,
      vendorStatus: null,
      reportUrl: null,
      score: null,
      requestId: null,
      message: "VerifyAL returned an invalid response",
      error: rawText.slice(0, 300),
      debited: null,
      raw: {},
    };
  }

  const vendorStatus =
    typeof vendorJson.status === "number" ? vendorJson.status : null;

  const reportUrl =
    typeof vendorJson?.data?.report_url === "string" &&
    vendorJson.data.report_url.trim()
      ? vendorJson.data.report_url.trim()
      : null;

  const scoreValue = vendorJson?.data?.score;
  const hasScore =
    scoreValue !== undefined && scoreValue !== null && scoreValue !== "";

  // IMPORTANT: VerifyAL may return HTTP 200 while its JSON body contains status: 400.
  const vendorBodySuccessful =
    vendorStatus === null || (vendorStatus >= 200 && vendorStatus < 300);

  const hasExpectedData = mode === "score" ? hasScore : Boolean(reportUrl);

  const ok = vendorRes.ok && vendorBodySuccessful && hasExpectedData;

  return {
    ok,
    httpStatus: vendorRes.status,
    vendorStatus,
    reportUrl,
    score: hasScore ? scoreValue : null,
    requestId: vendorJson.request_uid ?? null,
    message: vendorJson.message ?? "",
    error: vendorJson.error ?? "",
    debited:
      typeof vendorJson.debited === "boolean" ? vendorJson.debited : null,
    raw: vendorJson,
  };
}

function isTemporaryVendorFailure(result: VendorResult) {
  const text = `${result.message} ${result.error}`.toLowerCase();
  return (
    !result.ok &&
    result.debited === false &&
    (text.includes("temporary") ||
      text.includes("try again") ||
      text.includes("service issue") ||
      result.httpStatus === 503 ||
      result.vendorStatus === 503)
  );
}

async function callVerifyAlWithRetry(
  url: string,
  fields: Record<string, string>,
  mode: "report" | "score" = "report"
): Promise<VendorResult> {
  const first = await callVerifyAl(url, fields, mode);

  // Retry only once, and only when VerifyAL explicitly says the request
  // was not debited. This avoids duplicate charge / duplicate bureau pull risk.
  if (!isTemporaryVendorFailure(first)) {
    return first;
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  const second = await callVerifyAl(url, fields, mode);

  console.warn("VerifyAL temporary failure retry", {
    firstRequestId: first.requestId,
    secondRequestId: second.requestId,
    secondStatus: second.vendorStatus,
    debited: second.debited,
  });

  return second;
}

async function generateExperianReport(
  name: string,
  mobile: string,
  panCard: string,
  gender: string,
  consent: string
) {
  return callVerifyAlWithRetry(VERIFYAL_GENERATE_URL, {
    name,
    mobile,
    pan_card: panCard,
    report_type: "experian",
    gender,
    consent,
  });
}

async function generateCRIFReport(
  name: string,
  mobile: string,
  consent: string
) {
  return callVerifyAlWithRetry(VERIFYAL_GENERATE_URL, {
    name,
    mobile,
    report_type: "crif",
    consent,
  });
}

async function generateEquifaxReport(
  name: string,
  mobile: string,
  panCard: string,
  gender: string,
  dob: string,
  address: string,
  state: string,
  pincode: string,
  consent: string
) {
  return callVerifyAlWithRetry(VERIFYAL_GENERATE_URL, {
    name,
    mobile,
    pan_card: panCard,
    report_type: "equifax",
    gender,
    dob,
    address,
    state,
    pincode,
    consent,
  });
}

export async function POST(req: NextRequest) {
  let userId = "";

  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse(
        { success: false, error: "Missing Authorization header" },
        401
      );
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return jsonResponse({ success: false, error: "Missing token" }, 401);
    }

    try {
      const user = verifyToken(token);
      userId = user?.id ?? "";
    } catch {
      return jsonResponse(
        { success: false, error: "Invalid or expired token" },
        401
      );
    }

    if (!userId) {
      return jsonResponse({ success: false, error: "Invalid or expired session. Please log in again." }, 401);
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ success: false, error: "Invalid JSON body" }, 400);
    }

    if (!isRecord(body)) {
      return jsonResponse({ success: false, error: "Invalid request body" }, 400);
    }
    const name = cleanString(body.name);
    const mobile = cleanString(body.mobile);
    const panCard = cleanString(body.pan_card).toUpperCase();
    const gender = cleanString(body.gender).toLowerCase();
    const consent = cleanString(body.consent).toUpperCase();
    const reportType = normalizeReportType(body.reportType ?? body.report_type);
    const dob = cleanString(body.dob);
    const address = cleanString(body.address);
    const state = cleanString(body.state);
    const pincode = cleanString(body.pincode);

    if (!reportType) {
      return jsonResponse(
        {
          success: false,
          error:
            "Invalid report type. Use cibil-pdf, experian-pdf, crif-pdf, equifax-pdf, or cibil-score-only",
        },
        400
      );
    }

    if (!name || !mobile || consent !== "Y") {
      return jsonResponse(
        {
          success: false,
          error: "name, mobile and consent='Y' are required",
        },
        400
      );
    }

    if (!validateMobile(mobile)) {
      return jsonResponse(
        { success: false, error: "Invalid Indian mobile number" },
        400
      );
    }

    const requiresPan =
      reportType === "cibil-pdf" ||
      reportType === "experian-pdf" ||
      reportType === "equifax-pdf" ||
      reportType === "cibil-score-only";

    if (requiresPan && !panCard) {
      return jsonResponse(
        { success: false, error: "PAN card is required for this report type" },
        400
      );
    }

    if (requiresPan && !validatePan(panCard)) {
      return jsonResponse({ success: false, error: "Invalid PAN format" }, 400);
    }

    const requiresGender =
      reportType === "experian-pdf" ||
      reportType === "equifax-pdf";

    if (requiresGender && !gender) {
      return jsonResponse(
        { success: false, error: "Gender is required for this report type" },
        400
      );
    }

    if (reportType === "equifax-pdf") {
      const missing = [
        !dob && "dob",
        !address && "address",
        !state && "state",
        !pincode && "pincode",
      ].filter(Boolean);

      if (missing.length) {
        return jsonResponse(
          {
            success: false,
            error: `Missing Equifax fields: ${missing.join(", ")}`,
          },
          400
        );
      }

      if (!/^\d{6}$/.test(pincode)) {
        return jsonResponse(
          { success: false, error: "Invalid 6-digit pincode" },
          400
        );
      }
    }

    await connectDB();

    optimDebug("request routed", {
      reportType,
      provider: reportType === "cibil-pdf" || reportType === "cibil-score-only" ? "optim" : "verifyal",
    });

    // CIBIL V1 and CIBIL score-only share the documented Optim request.
    // This does NOT guarantee a downloadable PDF or a separately billed score-only operation.
    if (reportType === "cibil-pdf" || reportType === "cibil-score-only") {
      const result = await callOptimCibil({ name, mobile, panCard, body });
      if (!result.ok) {
        await safeSaveReport({
          userId, name, mobile, panCard, reportType,
          reportFormat: "json", provider: "optim",
          requestId: result.requestId, status: "failed",
        });
        return jsonResponse({
          success: false, reportType, provider: "optim",
          error: result.error,
          providerHttpStatus: result.httpStatus,
          providerStatus: result.providerStatus ?? null,
          transactionUuid: result.transactionUuid ?? null,
          missingFields: result.missingFields ?? [],
          errorCode: result.errorCode,
          failureStage: result.failureStage,
          requestId: result.requestId,
          verificationPending: result.verificationPending,
          retryable: false,
        }, result.verificationPending ? 409 : 502);
      }

      if (reportType === "cibil-score-only" && result.score === null) {
        await safeSaveReport({
          userId, name, mobile, panCard, reportType,
          reportFormat: "score", provider: "optim",
          requestId: result.requestId, status: "failed",
        });
        return jsonResponse({
          success: false, error: "The report was retrieved but no numeric CIBIL score was returned",
          reportType, provider: "optim", requestId: result.requestId,
          retryable: false,
        }, 422);
      }

      // Store JSON so My Reports can display it after a reload.
      // Never store fake PDF URLs.
      await safeSaveReport({
        userId, name, mobile, panCard, reportType,
        reportFormat: reportType === "cibil-score-only" ? "score" : "json",
        provider: "optim", requestId: result.requestId,
        score: result.score,
        reportData: reportType === "cibil-pdf" ? result.reportData : null,
        creditSummary: reportType === "cibil-pdf" ? result.creditSummary : null,
        status: "success",
      });

      return jsonResponse({
        success: true, reportType, provider: "optim",
        reportFormat: reportType === "cibil-score-only" ? "score" : "json",
        reportUrl: null,
        score: result.score,
        scoreName: result.scoreName,
        requestId: result.requestId,
        ...(reportType === "cibil-pdf" ? {
          reportData: result.reportData,
          creditSummary: result.creditSummary,
        } : {}),
      });
    }

    let vendorResult: VendorResult | undefined;

    switch (reportType) {
      case "experian-pdf":
        vendorResult = await generateExperianReport(
          name,
          mobile,
          panCard,
          gender,
          consent
        );
        break;

      case "crif-pdf":
        vendorResult = await generateCRIFReport(name, mobile, consent);
        break;

      case "equifax-pdf":
        vendorResult = await generateEquifaxReport(
          name,
          mobile,
          panCard,
          gender,
          dob,
          address,
          state,
          pincode,
          consent
        );
        break;

    }

    if (!vendorResult) {
      return jsonResponse({ success: false, error: "Unsupported report type" }, 400);
    }

    // Don't log PAN/mobile/name or secrets in production logs.
    console.log("VerifyAL result:", {
      reportType,
      httpStatus: vendorResult.httpStatus,
      vendorStatus: vendorResult.vendorStatus,
      requestId: vendorResult.requestId,
      debited: vendorResult.debited,
      success: vendorResult.ok,
      message: vendorResult.message,
    });

    if (!vendorResult.ok) {
      await safeSaveReport({
        userId,
        name,
        mobile,
        panCard,
        reportType,
        reportUrl: "",
        requestId: vendorResult.requestId,
        status: "failed",
      });

      const status = getVendorFailureStatus(vendorResult);

      return jsonResponse(
        {
          success: false,
          error:
            vendorResult.error ||
            vendorResult.message ||
            "Unable to generate report",
          message:
            vendorResult.message ||
            "The credit bureau service could not process this request",
          requestId: vendorResult.requestId,
          reportType,
          vendorStatus: vendorResult.vendorStatus,
          debited: vendorResult.debited,
          retryable: status === 503,
        },
        status
      );
    }

    const storedReportUrl = vendorResult.reportUrl ?? "";

    await safeSaveReport({
      userId,
      name,
      mobile,
      panCard,
      reportType,
      reportUrl: storedReportUrl,
      reportFormat: "pdf",
      provider: "verifyal",
      requestId: vendorResult.requestId,
      status: "success",
    });

    return jsonResponse({
      success: true,
      reportUrl: vendorResult.reportUrl,
      requestId: vendorResult.requestId,
      reportType,
      debited: vendorResult.debited,
    });
  } catch (error) {
    console.error("Generate report API error:", error instanceof Error ? error.message : "Unknown error");

    const message =
      error instanceof Error ? error.message : "Internal server error";

    const isVendorNetworkError = message.startsWith("VerifyAL network error:") || message === "OPTIM_REQUEST_OUTCOME_UNKNOWN";
    const isConfigError = message.includes("VERIFYAL_TOKEN") || message === "OPTIM_CONFIGURATION_MISSING";

    return jsonResponse(
      {
        success: false,
        error: isConfigError
          ? "Credit report service is not configured correctly"
          : isVendorNetworkError
          ? "Credit report provider is temporarily unreachable"
          : "Internal server error",
        ...(process.env.NODE_ENV !== "production" && { details: message }),
        retryable: false,
      },
      isVendorNetworkError ? 503 : 500
    );
  }
}
