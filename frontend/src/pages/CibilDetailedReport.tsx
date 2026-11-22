import { useEffect, useMemo } from "react";
import {
  X, Printer, ShieldCheck, FileText, UserRound, Building2,
  Search, MapPin, Phone, AlertTriangle,
} from "lucide-react";

type AnyObject = Record<string, any>;

export interface CibilDetailedResponse {
  success: boolean;
  reportType: string;
  provider?: string;
  reportFormat?: string;
  score?: number | null;
  scoreName?: string | null;
  requestId?: string | null;
  creditSummary?: AnyObject | null;
  reportData?: AnyObject | null;
}

interface Props {
  report: CibilDetailedResponse;
  onClose: () => void;
}

function asArray<T = AnyObject>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") return [data as T];
  return [];
}

function show(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "object") return "—";
  return String(value);
}

function safeDate(value: unknown): string {
  if (typeof value !== "string" || !value) return "—";
  // Provider fields may use YYYYMMDD, YYYY-MM-DD+05:30, or ISO.
  const digits = /^\d{8}$/.test(value);
  if (digits) return `${value.slice(6, 8)}/${value.slice(4, 6)}/${value.slice(0, 4)}`;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
}

function rupees(value: unknown): string {
  if (value === null || value === undefined || value === "" || Number(value) < 0 || !Number.isFinite(Number(value))) return "Not reported";
  return `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function maskId(value: unknown): string {
  const s = show(value);
  return s === "—" ? s : `${"•".repeat(Math.min(8, Math.max(0, s.length - 4)))}${s.slice(-4)}`;
}

function cleanText(value: unknown): string {
  return show(value).replace(/^explain:\s*|^factor:\s*/i, "");
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extract(report: CibilDetailedResponse) {
  const data = report.reportData ?? {};
  const asset = data.Asset ?? {};
  const creditReport = asset.TrueLinkCreditReport ?? {};
  const borrower = creditReport.Borrower ?? {};
  const summary = report.creditSummary ?? data.CreditSummaryData ?? {};
  const accounts = asArray<AnyObject>(creditReport.TradeLinePartition).map((x) => ({
    ...x,
    trade: x.Tradeline ?? {},
  }));
  const enquiries = asArray<AnyObject>(creditReport.InquiryPartition).map((x) => x.Inquiry ?? x);
  const factorList = asArray<AnyObject>(borrower.CreditScore?.CreditScoreFactor);
  const factors = factorList.map((f) => {
    const entries = asArray<string>(f.FactorText);
    return cleanText(entries.find((t) => typeof t === "string" && t.startsWith("explain:")) ?? entries[0] ?? "");
  }).filter((t) => t && t !== "—");
  const name = [borrower.BorrowerName?.Name?.Forename, borrower.BorrowerName?.Name?.Surname].filter(Boolean).join(" ");
  const addresses = asArray<AnyObject>(borrower.BorrowerAddress).map((a) => a.CreditAddress ?? {});
  const emails = asArray<AnyObject>(borrower.EmailAddress).map((e) => e.Email).filter(Boolean);
  const phones = asArray<AnyObject>(borrower.BorrowerTelephone).map((p) => p.PhoneNumber?.Number).filter(Boolean);
  return { data, asset, creditReport, borrower, summary, accounts, enquiries, factors, name, addresses, emails, phones };
}

function InfoRow({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 py-2 last:border-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="max-w-[65%] break-words text-right text-sm font-medium text-slate-800">{show(value)}</dd>
    </div>
  );
}

export default function CibilDetailedReport({ report, onClose }: Props) {
  const info = useMemo(() => extract(report), [report]);
  const { asset, borrower, creditReport, summary, accounts, enquiries, factors, name, addresses, emails, phones } = info;
  const score = typeof report.score === "number" && Number.isFinite(report.score) ? report.score : null;
  const scoreLabel = score === null ? "Not available" : score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Needs improvement";
  const scoreText = score === null ? "—" : String(score);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const handlePrint = () => {
    // The provider supplies JSON, NOT a downloadable PDF URL. Print a formatted,
    // user-readable report locally, without sending sensitive data to a 3rd party.
    const w = window.open("", "_blank");
    if (!w) { window.alert("Please allow popups for this site to print or save the report as PDF."); return; }
    const row = (k: string, v: unknown) => `<div class="row"><span>${escapeHtml(k)}</span><strong>${escapeHtml(show(v))}</strong></div>`;
    const section = (title: string, content: string) => `<section><h2>${escapeHtml(title)}</h2>${content || '<p class="muted">No data reported</p>'}</section>`;
    const table = (head: string[], rows: string[][]) => `<table><thead><tr>${head.map(x => `<th>${escapeHtml(x)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${escapeHtml(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    const summaryRows = [
      ["Oldest credit account period (as reported)", summary.OldestCreditAccountPeriod],
      ["Credit enquiries (summary)", summary.Inquires],
      ["On-time payment history (as reported)", summary.OnTimePaymentHistory],
      ["Credit-card utilisation (as reported)", summary.CreditCardUtilization],
      ["Credit mix (as reported)", summary.CreditMix],
    ];
    const accountTable = table(
      ["Lender", "Account", "Type", "Opened", "Balance", "Overdue", "High credit", "Status"],
      accounts.map(({ trade, accountTypeDescription }: AnyObject) => [
        show(trade.creditorName), maskId(trade.accountNumber), show(accountTypeDescription || trade.AccountDesignator?.description || trade.AccountDesignator?.symbol),
        safeDate(trade.dateOpened), rupees(trade.currentBalance), rupees(trade.GrantedTrade?.amountPastDue ?? trade.amountOverdue),
        rupees(trade.highBalance), show(trade.OpenClosed?.description || trade.OpenClosed?.symbol || trade.PayStatus?.description),
      ])
    );
    const enquiryTable = table(
      ["Date", "Institution", "Purpose code", "Amount"],
      enquiries.map((enq: AnyObject) => [safeDate(enq.inquiryDate), show(enq.subscriberName), show(enq.inquiryType), rupees(enq.amount)])
    );
    const body = `
      <div class="mast"><div><p class="eyebrow">LOANS BUZZ · CONFIDENTIAL</p><h1>CIBIL Detailed Credit Report</h1><p>Customer-facing report generated from Optim CIBIL V1 response data</p></div><div class="score"><small>CIBIL SCORE</small><b>${escapeHtml(scoreText)}</b><span>${escapeHtml(scoreLabel)}</span></div></div>
      <div class="meta">${row("Customer", name || "Not reported")}${row("Report reference", creditReport.ReferenceKey || report.requestId)}${row("Report date", safeDate(asset.CreationDate))}${row("Score model", report.scoreName)}${row("Asset status", asset.Status)}</div>
      ${section("Credit summary", summaryRows.map(([k,v]) => row(String(k),v)).join(""))}
      ${section("Personal information", row("Name", name || "Not reported") + row("Date of birth", safeDate(borrower.Birth?.date)) + row("Gender", borrower.Gender) + row("Occupation", borrower.Employer?.OccupationCode?.description || borrower.Employer?.OccupationCode?.symbol))}
      ${section("Reported contact details", row("Email(s)", emails.join(", ") || "Not reported") + row("Phone number(s)", phones.map(maskId).join(", ") || "Not reported") + addresses.map((a,i) => row(`Address ${i+1}`, a.StreetAddress || a.PostalCode)).join(""))}
      ${section(`Credit accounts (${accounts.length})`, accounts.length ? accountTable : "")}
      ${section(`Credit enquiries (${enquiries.length})`, enquiries.length ? enquiryTable : "")}
      ${section("Credit score factors", factors.map((f,i) => `<p class="factor"><b>${i+1}.</b> ${escapeHtml(f)}</p>`).join(""))}
      ${section("Report metadata", row("Reference key", creditReport.ReferenceKey) + row("Report version", creditReport.currentversion) + row("Safety check passed", creditReport.SafetyCheckPassed === true ? "Yes" : creditReport.SafetyCheckPassed === false ? "No" : "Not reported") + row("Report format", "Formatted from provider JSON"))}
      <p class="foot">This document is a readable rendering of the retrieved data. It is not an official PDF issued by TransUnion CIBIL. Negative or missing provider values may mean not reported. Verify discrepancies with the credit bureau.</p>
    `;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CIBIL Detailed Report</title><style>
      @page{size:A4;margin:15mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#17233a;margin:0;background:#fff;font-size:12px;line-height:1.45}.mast{display:flex;justify-content:space-between;gap:20px;background:#122b50;color:#fff;padding:20px 22px;border-radius:10px}.mast h1{font-size:23px;margin:6px 0}.mast p{margin:4px 0;color:#dbeafe}.eyebrow{font-weight:700;font-size:10px;letter-spacing:1.6px}.score{background:#fff;color:#122b50;min-width:120px;padding:10px;text-align:center;border-radius:8px}.score small,.score span{display:block}.score b{font-size:34px;display:block}.meta{display:grid;grid-template-columns:1fr 1fr;gap:0 20px;margin:18px 0}section{margin:18px 0;break-inside:avoid-page}h2{font-size:15px;border-bottom:2px solid #d9e6f4;padding:0 0 7px;color:#173c66;break-after:avoid-page}.row{display:flex;justify-content:space-between;gap:15px;padding:7px 0;border-bottom:1px solid #edf0f5;break-inside:avoid}.row span{color:#546276}.row strong{text-align:right;overflow-wrap:anywhere;max-width:65%}table{border-collapse:collapse;width:100%;font-size:9px;table-layout:fixed}th,td{border:1px solid #dde4ec;padding:6px;vertical-align:top;overflow-wrap:anywhere}th{text-align:left;background:#edf4fc}tr{break-inside:avoid}.factor{padding:7px 0;border-bottom:1px solid #eef2f6;break-inside:avoid}.foot{font-size:9px;color:#64748b;margin-top:25px;border-top:1px solid #dde4ec;padding-top:10px}.muted{color:#64748b}.actions{padding:12px 0 20px;display:flex;justify-content:center;gap:10px}.actions button{background:#173c66;color:#fff;border:0;border-radius:8px;padding:11px 20px;cursor:pointer} @media print{.actions{display:none}.mast{-webkit-print-color-adjust:exact;print-color-adjust:exact}table th{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body><div class="actions"><button onclick="window.print()">Print / Save as PDF</button><button onclick="window.close()">Close</button></div>${body}</body></html>`;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    // The window has a print button. Users choose Save as PDF in print dialog.
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-slate-950/75 px-3 pb-5 pt-3 sm:px-5 sm:pt-5" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-label="CIBIL detailed report" className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl sm:max-h-[calc(100dvh-2.5rem)]">
        <div className="sticky top-0 z-20 flex flex-shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-700"><FileText className="h-6 w-6"/></div>
          <div className="min-w-0 flex-1"><h2 className="text-base font-bold sm:text-xl">CIBIL Detailed Report</h2><p className="text-xs text-slate-500">Loans Buzz · Credit report viewer</p></div>
          <button type="button" onClick={handlePrint} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 sm:text-sm"><Printer className="h-4 w-4"/><span className="hidden sm:inline">Print / Save as PDF</span><span className="sm:hidden">PDF</span></button>
          <button type="button" autoFocus aria-label="Close report" title="Close report" onClick={onClose} className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-red-50 hover:text-red-700"><X className="h-6 w-6"/></button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-5 text-white">
            <div><div className="text-xs font-semibold uppercase tracking-widest text-blue-200">Confidential credit information</div><h3 className="mt-2 text-2xl font-bold">Your CIBIL Credit Report</h3><p className="mt-1 text-sm text-slate-200">Report generated from retrieved Optim CIBIL data</p></div>
            <div className="rounded-xl bg-white px-6 py-3 text-center text-slate-900"><p className="text-xs text-slate-500">CIBIL Score</p><p className="text-4xl font-extrabold">{scoreText}</p><p className="text-sm font-medium text-blue-700">{scoreLabel}</p></div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm text-emerald-800"><ShieldCheck className="h-5 w-5"/> Report retrieved successfully</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4"><h4 className="mb-2 flex items-center gap-2 font-semibold"><UserRound className="h-4 w-4 text-blue-700"/> Borrower details</h4><dl><InfoRow label="Name" value={name || "Not reported"}/><InfoRow label="Date of birth" value={safeDate(borrower.Birth?.date)}/><InfoRow label="Gender" value={borrower.Gender}/><InfoRow label="Occupation" value={borrower.Employer?.OccupationCode?.description || borrower.Employer?.OccupationCode?.symbol}/></dl></div>
            <div className="rounded-xl border border-slate-200 p-4"><h4 className="mb-2 flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-blue-700"/> Report information</h4><dl><InfoRow label="Asset status" value={asset.Status}/><InfoRow label="Report date" value={safeDate(asset.CreationDate)}/><InfoRow label="Report reference" value={creditReport.ReferenceKey || report.requestId}/><InfoRow label="Score model" value={report.scoreName}/></dl></div>
          </div>
          <section className="mt-5 rounded-xl border border-slate-200 p-4"><h4 className="mb-3 flex items-center gap-2 font-semibold"><Building2 className="h-4 w-4 text-blue-700"/> Credit summary</h4><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{[
            ["Oldest account period", summary.OldestCreditAccountPeriod], ["Enquiries", summary.Inquires], ["On-time payments", summary.OnTimePaymentHistory], ["Credit utilisation", summary.CreditCardUtilization], ["Credit mix", summary.CreditMix]
          ].map(([key,val]) => <div key={String(key)} className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-xl font-bold text-blue-900">{show(val)}</p><p className="mt-1 text-xs text-slate-500">{String(key)}</p></div>)}</div><p className="mt-2 text-xs text-slate-500">Values are displayed as reported by the provider; units are not inferred when unspecified.</p></section>
          <section className="mt-5 rounded-xl border border-slate-200 p-4"><h4 className="mb-2 flex items-center gap-2 font-semibold"><Phone className="h-4 w-4 text-blue-700"/> Reported contact details</h4><dl><InfoRow label="Email(s)" value={emails.join(", ") || "Not reported"}/><InfoRow label="Phone(s)" value={phones.map(maskId).join(", ") || "Not reported"}/></dl>{addresses.length > 0 && <div className="mt-3"><h5 className="mb-2 flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4"/> Addresses</h5>{addresses.map((a,i) => <div key={i} className="mb-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{show(a.StreetAddress || a.PostalCode)}</div>)}</div>}</section>
          <section className="mt-5 rounded-xl border border-slate-200 p-4"><h4 className="mb-3 flex items-center gap-2 font-semibold"><Building2 className="h-4 w-4 text-blue-700"/> Loan and credit accounts ({accounts.length})</h4>{accounts.length === 0 ? <p className="text-sm text-slate-500">No accounts in the retrieved data.</p> : <div className="space-y-3">{accounts.map(({trade,accountTypeDescription}:AnyObject,i:number)=><div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-3"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold">{show(trade.creditorName)}</p><p className="text-sm text-slate-500">{show(accountTypeDescription || trade.AccountDesignator?.description || trade.AccountDesignator?.symbol)}</p></div><div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4"><div><span className="block text-xs text-slate-500">Account</span>{maskId(trade.accountNumber)}</div><div><span className="block text-xs text-slate-500">Opened</span>{safeDate(trade.dateOpened)}</div><div><span className="block text-xs text-slate-500">Balance</span>{rupees(trade.currentBalance)}</div><div><span className="block text-xs text-slate-500">High credit</span>{rupees(trade.highBalance)}</div></div></div>)}</div>}</section>
          <section className="mt-5 rounded-xl border border-slate-200 p-4"><h4 className="mb-3 flex items-center gap-2 font-semibold"><Search className="h-4 w-4 text-blue-700"/> Credit enquiries ({enquiries.length})</h4>{enquiries.length === 0 ? <p className="text-sm text-slate-500">No enquiries in the retrieved data.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-left text-sm"><thead><tr className="border-b bg-slate-50 text-slate-600"><th className="px-3 py-2">Date</th><th className="px-3 py-2">Institution</th><th className="px-3 py-2">Purpose code</th><th className="px-3 py-2">Amount</th></tr></thead><tbody>{enquiries.map((e,i)=><tr key={i} className="border-b last:border-0"><td className="px-3 py-2">{safeDate(e.inquiryDate)}</td><td className="px-3 py-2">{show(e.subscriberName)}</td><td className="px-3 py-2">{show(e.inquiryType)}</td><td className="px-3 py-2">{rupees(e.amount)}</td></tr>)}</tbody></table></div>}</section>
          {factors.length > 0 && <section className="mt-5 rounded-xl border border-slate-200 p-4"><h4 className="mb-3 flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4 text-amber-600"/> CIBIL score factors</h4><div className="space-y-3">{factors.map((f,i)=><p key={i} className="rounded-lg bg-amber-50 p-3 text-sm leading-relaxed text-slate-700">{f}</p>)}</div></section>}
          <div className="mt-5 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">This is a readable presentation of your provider report data, not an official bureau-issued PDF. To obtain a PDF, choose Print / Save as PDF and select “Save as PDF” in the browser print dialog.</div>
          <div className="mt-4 flex justify-end gap-2 pb-3"><button type="button" onClick={onClose} className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-slate-50">Close</button><button type="button" onClick={handlePrint} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"><Printer className="h-4 w-4"/> Print / Save as PDF</button></div>
        </div>
      </div>
    </div>
  );
}
