"use client";
import { useState, useMemo } from "react";
import Link from "next/link"; // ✅ Import Link
import { ArrowLeft } from "lucide-react"; // ✅ Added ArrowLeft
import { toast } from "sonner";

// --- Visual Helpers ---
const getInitials = (name: string) =>
  name?.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-emerald-100 text-emerald-600",
    "bg-orange-100 text-orange-600",
  ];
  return colors[(name?.length || 0) % colors.length];
};

const formatDate = (dateString: string) => {
  // Fallback date formatter for the UI
  if (!dateString) return new Date().toLocaleDateString();
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

export default function PartnerTable({ partners }: any) {
  // --- Existing State ---
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --- New UI State (For Search/Filters) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");

  // --- UI Filtering Logic (Client-side) ---
  const uniqueSubjects = useMemo(() => {
    const subjects = partners?.map((p: any) => p.city || "General") || [];
    return ["All Subjects", ...Array.from(new Set(subjects))];
  }, [partners]);

  const filteredPartners = useMemo(() => {
    if (!partners) return [];
    return partners.filter((p: any) => {
      // 1. Search (Name, Email, City, ID)
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        p.fullName?.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.city?.toLowerCase().includes(term) ||
        p._id?.toLowerCase().includes(term);

      // 2. Status
      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Resolved" && p.status === "RESOLVED") || // Assuming your API returns 'RESOLVED' or 'REPLIED'
        (statusFilter === "Resolved" && p.status === "REPLIED") ||
        (statusFilter === "Pending" && p.status === "PENDING");

      // 3. Subject (City)
      const matchesSubject =
        subjectFilter === "All Subjects" || (p.city || "General") === subjectFilter;

      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [partners, searchTerm, statusFilter, subjectFilter]);

  return (
    <div className="space-y-6 p-1">

      {/* 🔹 HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-2 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Partner 's Connections</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your latest inquiries.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-grow md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="py-2.5 px-4 border border-gray-200 rounded-lg bg-white text-sm text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        >
          {uniqueSubjects.map((s: any) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2.5 px-4 border border-gray-200 rounded-lg bg-white text-sm text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        >
          <option>All Status</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* 🔹 TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-50">
            {filteredPartners.map((p: any) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                {/* Customer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${getAvatarColor(p.fullName)}`}>
                      {getInitials(p.fullName)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{p.fullName}</div>
                      <div className="text-xs text-gray-400">ID: {p._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>

                {/* Subject */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded bg-gray-100 text-gray-600">
                    {p.city || "General"}
                  </span>
                </td>

                {/* Contact Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {p.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      {p.phone}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex items-center text-xs rounded-full border ${p.status === "PENDING" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full mr-2 ${p.status === "PENDING" ? "bg-yellow-500" : "bg-green-500"}`}></span>
                    {p.status === "PENDING" ? "Pending" : "Resolved"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {p.status === "PENDING" ? (
                    <button
                      onClick={() => {
                        setSelectedPartner(p);
                        setReplyMessage("");
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-xs font-medium transition-colors border border-gray-200"
                    >
                      Reply
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded bg-gray-50 text-gray-400 text-xs border border-gray-100">Replied</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredPartners.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400 text-sm">No partners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 REPLY DIALOG (New Structure) */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn m-4">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(selectedPartner.fullName)}`}>
                  {getInitials(selectedPartner.fullName)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Reply to {selectedPartner.fullName}</h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    {selectedPartner.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">

              {/* Original Message Block */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <span>Original Message</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {formatDate(selectedPartner.createdAt)}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {selectedPartner.city || "Inquiry"}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedPartner.message || "No message content."}
                </p>
              </div>

              {/* Response Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Your Response</label>
                <textarea
                  rows={5}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={`Hello ${selectedPartner.fullName.split(' ')[0]}, thank you for reaching out...`}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none placeholder-gray-300 text-gray-800"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-white flex justify-end gap-3">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              {/* BUTTON WITH YOUR EXACT LOGIC */}
              <button
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await fetch(
                    `/api/partner/${selectedPartner._id}/reply`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ replyMessage }),
                    }
                  );
                  selectedPartner.status = "REPLIED";
                  // alert("Reply sent successfully!");
                  toast.success("Message sent successfully!", {
                    // description: "Our team will contact you within 24 hours.",
                    duration:3000
                  });

                  setSelectedPartner(null);
                  setLoading(false);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                {loading ? "Sending..." : "Send Reply"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}