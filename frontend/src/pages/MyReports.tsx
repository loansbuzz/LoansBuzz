import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Shield, FileText, Download, Eye, Calendar, AlertCircle, Loader2, X, RefreshCw } from "lucide-react";
import { getStoredAuth, API_BASE_URL } from "../lib/auth";
import CibilDetailedReport from "./CibilDetailedReport";
import CibilScoreModal from "./CibilScoreModal";

type ReportFormat = "pdf" | "json" | "score";
type ReportItem = {
  id: string;
  name: string;
  reportType: string;
  reportFormat: ReportFormat;
  provider?: string;
  score: number | null;
  reportData?: Record<string, unknown> | null;
  creditSummary?: Record<string, unknown> | null;
  requestId: string | null;
  createdAt: string;
  hasDownloadablePdf: boolean;
  hasSavedReport: boolean;
};

const LABELS: Record<string, string> = {
  "cibil-pdf": "CIBIL Detailed Report",
  "cibil-score-only": "CIBIL Score Only",
  "experian-pdf": "Experian PDF Report",
  "crif-pdf": "CRIF PDF Report",
  "equifax-pdf": "Equifax PDF Report",
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString("en-IN", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function MyReports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const pdfUrlRef = useRef<string | null>(null);

  function clearPdf() {
    if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
    pdfUrlRef.current = null;
    setPdfUrl(null);
  }

  useEffect(() => () => {
    if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
  }, []);

  async function loadReports() {
    setLoading(true);
    setError("");
    try {
      const token = getStoredAuth()?.token;
      if (!token) throw new Error("Please log in to view your reports");

      // IMPORTANT: matches app/api/reports/route.ts (plural).
      const response = await fetch(`${API_BASE_URL}/api/report`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(response.status === 401 ? "Your session has expired. Please log in again." : result.error || "Unable to load reports");
      }
      setReports(Array.isArray(result.reports) ? result.reports : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadReports(); }, []);

  async function getPdfBlob(reportId: string): Promise<Blob> {
    const token = getStoredAuth()?.token;
    if (!token) throw new Error("Please log in again to view your PDF");
    const response = await fetch(
      `${API_BASE_URL}/api/download-report?id=${encodeURIComponent(reportId)}&mode=view`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details.error || `Could not open saved PDF (${response.status})`);
    }
    const blob = await response.blob();
    if (blob.type !== "application/pdf") throw new Error("The server did not return a PDF");
    return blob;
  }

  async function viewReport(report: ReportItem) {
    setActionError("");
    clearPdf();
    if (report.reportFormat !== "pdf") {
      setSelectedReport(report);
      return;
    }
    if (!report.hasDownloadablePdf) {
      setActionError("This historical PDF entry has no saved PDF URL. The original file cannot be recovered from its reference ID alone.");
      return;
    }
    setBusyId(report.id);
    try {
      const blob = await getPdfBlob(report.id);
      const url = URL.createObjectURL(blob);
      pdfUrlRef.current = url;
      setPdfUrl(url);
      setSelectedReport(report);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Could not view PDF");
    } finally {
      setBusyId(null);
    }
  }

  async function downloadPdf(report: ReportItem) {
    setActionError("");
    setBusyId(report.id);
    try {
      const blob = await getPdfBlob(report.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${report.reportType}-${report.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Do not immediately revoke: give the browser a chance to start the download.
      window.setTimeout(() => URL.revokeObjectURL(url), 15000);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "PDF download failed");
    } finally {
      setBusyId(null);
    }
  }

  function closeViewer() {
    setSelectedReport(null);
    clearPdf();
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {selectedReport?.reportFormat === "json" && selectedReport.reportData && (
        <CibilDetailedReport
          report={{
            success: true,
            reportType: selectedReport.reportType,
            reportFormat: "json",
            reportData: selectedReport.reportData,
            creditSummary: selectedReport.creditSummary,
            score: selectedReport.score,
            requestId: selectedReport.requestId,
          }}
          onClose={closeViewer}
        />
      )}
      {selectedReport?.reportFormat === "score" && (
        <CibilScoreModal
          showResult={true}
          setShowResult={closeViewer}
          scoreData={{ success: true, reportType: "cibil-score-only", score: selectedReport.score, requestId: selectedReport.requestId }}
        />
      )}
      {selectedReport?.reportFormat === "json" && !selectedReport.reportData && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/70 p-3 pt-4" role="dialog" aria-modal="true" aria-label="Missing report data">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between"><h3 className="font-semibold">Detailed report unavailable</h3><Button variant="outline" onClick={closeViewer}><X size={17}/> Close</Button></div>
            <p className="mt-3 text-sm text-slate-600">This historical record has no saved JSON report. A full report cannot be recreated without the original report data.</p>
          </div>
        </div>
      )}
      {selectedReport?.reportFormat === "pdf" && pdfUrl && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-slate-950/80 p-2 sm:p-4" role="dialog" aria-modal="true" aria-label="PDF report viewer">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[calc(100dvh-2rem)]">
            <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b bg-white px-3 py-3 sm:px-5">
              <div className="min-w-0"><h2 className="truncate font-bold">{LABELS[selectedReport.reportType] || "Credit Report"}</h2><p className="text-xs text-slate-500">Saved PDF · {formatDate(selectedReport.createdAt)}</p></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => downloadPdf(selectedReport)} disabled={busyId === selectedReport.id}><Download className="mr-1 h-4 w-4"/>Download</Button>
                <Button size="sm" variant="outline" onClick={closeViewer} aria-label="Close PDF"><X className="mr-1 h-4 w-4"/>Close</Button>
              </div>
            </div>
            <iframe src={pdfUrl} title="Saved credit report PDF" className="min-h-0 w-full flex-1 border-0" />
          </div>
        </div>
      )}

      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-slate-100 py-14">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <FileText className="mx-auto mb-3 h-12 w-12 text-blue-700" />
          <h1 className="text-3xl font-bold sm:text-4xl">My Reports</h1>
          <p className="mt-3 text-slate-600">View your previously saved bureau reports and CIBIL scores</p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Saved credit reports</h2>
          <Button type="button" variant="outline" onClick={() => void loadReports()} disabled={loading}><RefreshCw className="mr-2 h-4 w-4"/>Refresh</Button>
        </div>
        {actionError && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle className="mr-2 inline h-4 w-4"/>{actionError}</div>}
        {loading && <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-blue-700"/></div>}
        {!loading && error && <Card className="p-8 text-center text-red-700">{error}</Card>}
        {!loading && !error && reports.length === 0 && <Card className="p-8 text-center text-slate-600">No saved reports found yet.</Card>}
        {!loading && !error && reports.length > 0 && <div className="space-y-4">
          {reports.map(report => (
            <Card key={report.id} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50"><Shield className="h-6 w-6 text-blue-700"/></div>
                <div className="min-w-0">
                  <h3 className="font-semibold">{LABELS[report.reportType] || report.reportType}</h3>
                  <p className="text-sm text-slate-600">{report.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Calendar className="h-3 w-3"/>{formatDate(report.createdAt)}</p>
                  {report.reportFormat === "score" && report.score !== null && <p className="mt-1 text-sm font-semibold text-blue-800">CIBIL Score: {report.score}</p>}
                  {report.requestId && <p className="mt-1 break-all text-xs text-slate-400">Ref: {report.requestId}</p>}
                  {!report.hasSavedReport && <p className="mt-2 text-xs text-amber-700">Saved entry has no retrievable {report.reportFormat === "pdf" ? "PDF link" : "report data"}.</p>}
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Button variant="outline" type="button" onClick={() => void viewReport(report)} disabled={busyId === report.id}>
                  {busyId === report.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Eye className="mr-2 h-4 w-4"/>}View
                </Button>
                {report.reportFormat === "pdf" && report.hasDownloadablePdf && <Button type="button" onClick={() => void downloadPdf(report)} disabled={busyId === report.id}><Download className="mr-2 h-4 w-4"/>Download</Button>}
              </div>
            </Card>
          ))}
        </div>}
      </main>
    </div>
  );
}
