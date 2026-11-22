import { useEffect, useRef } from 'react';
import { ShieldCheck, X, CheckCircle2, Calendar, CreditCard, TrendingUp, Lock } from 'lucide-react';

export interface CibilScoreResponse {
  success?: boolean;
  reportType?: string;
  provider?: string;
  reportFormat?: string;
  reportUrl?: string | null;
  score?: number | string | null;
  scoreName?: string | null;
  requestId?: string | null;
}

interface Props {
  showResult: boolean;
  setShowResult: (open: boolean) => void;
  scoreData: CibilScoreResponse | null;
}

const segments = [
  { start: 300, end: 650, color: '#ef4444' },
  { start: 650, end: 700, color: '#f59e0b' },
  { start: 700, end: 750, color: '#3b82f6' },
  { start: 750, end: 900, color: '#22c55e' },
];

function point(score: number) {
  const angle = Math.PI - (score - 300) / 600 * Math.PI;
  return { x: 160 + 120 * Math.cos(angle), y: 155 - 120 * Math.sin(angle) };
}

function arc(start: number, end: number) {
  const a = point(start), b = point(end);
  return `M ${a.x} ${a.y} A 120 120 0 0 1 ${b.x} ${b.y}`;
}

export default function CibilScoreModal({ showResult, setShowResult, scoreData }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    if (!el || !showResult) return;
    if (!el.open) el.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      if (el.open) el.close();
      document.body.style.overflow = previous;
    };
  }, [showResult]);

  const raw = scoreData?.score;
  const n = typeof raw === 'number' || (typeof raw === 'string' && raw.trim()) ? Number(raw) : NaN;
  const score = Number.isInteger(n) && n >= 300 && n <= 900 ? n : null;
  const band = score === null ? null : score >= 750 ? { label: 'Excellent', color: '#15803d', bg: '#f0fdf4' } : score >= 700 ? { label: 'Good', color: '#2563eb', bg: '#eff6ff' } : score >= 650 ? { label: 'Fair', color: '#b45309', bg: '#fffbeb' } : { label: 'Needs Improvement', color: '#dc2626', bg: '#fef2f2' };
  const marker = score === null ? null : point(score);
  const close = () => setShowResult(false);
  const tips = [
    { icon: Calendar, title: 'Pay EMIs on time', text: 'Maintain a consistent repayment history.' },
    { icon: CreditCard, title: 'Manage credit utilisation', text: 'Keep credit-card balances low.' },
    { icon: TrendingUp, title: 'Build healthy credit habits', text: 'Avoid unnecessary credit applications.' },
  ];
  if (!showResult) return null;
  return (
    <dialog ref={dialog} aria-labelledby="cibil-score-heading" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white">
        <button type="button" autoFocus onClick={close} aria-label="Close score popup" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"><X className="h-5 w-5" /></button>
        <div className="flex items-center gap-3 pr-10"><div className="rounded-2xl bg-emerald-400/15 p-3"><ShieldCheck className="h-8 w-8 text-emerald-400" /></div><div><h2 id="cibil-score-heading" className="text-xl font-bold">Your CIBIL Score</h2><p className="text-sm text-slate-300">Loans Buzz · Credit Score Check</p></div></div>
      </div>
      <div className="p-6">
        {score !== null && band ? <>
          <div className="flex items-center justify-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm font-medium text-green-700"><CheckCircle2 className="h-4 w-4" />Score retrieved successfully</div>
          <svg viewBox="0 0 320 195" className="mx-auto mt-5 w-full max-w-sm" role="img" aria-label={`CIBIL score ${score} out of 900`}>
            {segments.map(s => <path key={s.start} d={arc(s.start, s.end)} stroke={s.color} strokeWidth="16" fill="none" />)}
            {marker && <circle cx={marker.x} cy={marker.y} r="10" fill={band.color} stroke="white" strokeWidth="4" />}
            <text x="160" y="121" textAnchor="middle" fontSize="56" fontWeight="800" fill="#0f172a">{score}</text>
            <text x="160" y="145" textAnchor="middle" fontSize="15" fill="#64748b">out of 900</text>
            <text x="40" y="185" textAnchor="middle" fontSize="13" fill="#64748b">300</text><text x="280" y="185" textAnchor="middle" fontSize="13" fill="#64748b">900</text>
          </svg>
          <div className="text-center"><span className="inline-flex rounded-full px-5 py-2 text-lg font-bold" style={{color: band.color, backgroundColor: band.bg}}>{band.label} Credit Score</span><p className="mt-2 text-xs text-slate-500">Indicative score category; lenders may use different criteria.</p></div>
          <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <h3 className="font-semibold">Score Details</h3>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Credit Bureau</span><span className="font-semibold">TransUnion CIBIL</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Score Model</span><span className="break-all text-right font-medium">{scoreData?.scoreName || 'Not available'}</span></div>
            {scoreData?.requestId && <div className="border-t pt-3"><p className="text-xs text-slate-500">Reference ID</p><p className="mt-1 break-all text-xs">{scoreData.requestId}</p></div>}
          </div>
          <h3 className="mt-5 mb-3 font-bold">Improve Your Credit Score</h3>
          <div className="space-y-2">{tips.map(t => <div key={t.title} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"><div className="rounded-lg bg-blue-50 p-2"><t.icon className="h-4 w-4 text-blue-600" /></div><div><p className="text-sm font-semibold">{t.title}</p><p className="text-xs text-slate-500">{t.text}</p></div></div>)}</div>
        </> : <div className="py-8 text-center"><h3 className="text-xl font-bold">Score Not Available</h3><p className="mt-2 text-sm text-slate-500">The response does not contain a numeric score in the 300–900 range.</p></div>}
        <button type="button" onClick={close} className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800">Done</button>
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500"><Lock className="h-3.5 w-3.5" />Confidential credit information</div>
      </div>
    </dialog>
  );
}
