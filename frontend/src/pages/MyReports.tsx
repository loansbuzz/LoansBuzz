import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Shield, FileText, Download, Eye, Calendar, AlertCircle, Loader2
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { getStoredAuth, API_BASE_URL } from '../lib/auth';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const REPORT_TYPE_LABELS: Record<string, string> = {
  "cibil-pdf": "CIBIL PDF",
  "experian-pdf": "Experian PDF",
  "crif-pdf": "CRIF PDF",
  "equifax-pdf": "Equifax PDF",
  "cibil-score-only": "CIBIL Score Only",
};

interface ReportItem {
  id: string;
  name: string;
  reportType: string;
  reportUrl: string;
  requestId: string | null;
  createdAt: string;
}

export function MyReports() {
  const [reports, setReports] = useState<ReportItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const session = getStoredAuth();
      if (!session?.token) {
        setError("Please log in to view your reports");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/report`, {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        const data = await res.json();
        if (data.success) {
          setReports(data.reports);
        } else {
          setError(data.error || "Could not load your reports");
        }
      } catch (err) {
        console.error(err);
        setError("Could not load your reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleView = (reportUrl: string) => {
    window.open(`${API_BASE_URL}/api/download-report?url=${encodeURIComponent(reportUrl)}&mode=view`, "_blank");
  };

  const handleDownload = (reportUrl: string) => {
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/api/download-report?url=${encodeURIComponent(reportUrl)}&mode=download`;
    link.download = "cibil-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <FileText className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">My Reports</h1>
            <p className="text-lg text-muted-foreground">
              View and download all your previously generated credit reports
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && error && (
            <Card className="p-10 text-center border-slate-100">
              <AlertCircle className="w-10 h-10 mx-auto mb-4 text-red-400" />
              <p className="text-muted-foreground">{error}</p>
            </Card>
          )}

          {!loading && !error && reports && reports.length === 0 && (
            <Card className="p-10 text-center border-slate-100">
              <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">You haven't generated any reports yet.</p>
            </Card>
          )}

          {!loading && !error && reports && reports.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {reports.map((report) => (
                <motion.div key={report.id} variants={fadeInUp}>
                  <Card className="p-6 border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {REPORT_TYPE_LABELS[report.reportType] || report.reportType}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(report.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'long', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                          {report.requestId && (
                            <p className="text-xs text-muted-foreground mt-1">Ref: {report.requestId}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleView(report.reportUrl)}
                          className="flex items-center gap-1.5"
                        >
                          <Eye className="w-4 h-4" /> View
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDownload(report.reportUrl)}
                          className="flex items-center gap-1.5 bg-primary hover:bg-primary/90"
                        >
                          <Download className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}