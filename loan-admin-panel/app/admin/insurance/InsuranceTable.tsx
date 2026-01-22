"use client";
import { useState } from "react";
import {
    Search,
    CreditCard,
    Filter,
    Mail,
    Phone,
    ArrowLeft,
    X,
    Send,
    ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { TIMEOUT } from "dns";
import Link from "next/link";

// Helper to generate initials and background color
const getAvatarStyle = (name: string) => {
    const colors = ["bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700", "bg-pink-100 text-pink-700", "bg-emerald-100 text-emerald-700"];
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
    const index = name.length % colors.length;
    return { initials, className: colors[index] };
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    });
};

export default function InsuranceTable({ quotes }: any) {
    const [selected, setSelected] = useState<any>(null);
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    // --- NEW STATE FOR FILTERS ---
    const [searchTerm, setSearchTerm] = useState("");
    const [subjectFilter, setSubjectFilter] = useState(""); // "" means All
    const [statusFilter, setStatusFilter] = useState("");   // "" means All

    // --- FILTER LOGIC ---
    const filteredQuotes = quotes.filter((q: any) => {
        // 1. Search (Name, Email, Phone)
        const matchesSearch =
            q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.phone.includes(searchTerm);

        // 2. Subject Filter (Insurance Type)
        const matchesSubject = subjectFilter === "" || q.insuranceType === subjectFilter;

        // 3. Status Filter (Pending vs Replied)
        // Assuming DB status is "PENDING". "Replied" implies status is NOT "PENDING".
        const matchesStatus = statusFilter === ""
            ? true
            : statusFilter === "Pending"
                ? q.status === "PENDING"
                : q.status !== "PENDING";

        return matchesSearch && matchesSubject && matchesStatus;
    });

    const getOriginalMessage = (q: any) => ({
        subject: q.insuranceType || "inquiry",
        date: q.createdAt || new Date().toISOString(),
        body: q.message || "Customer inquiry details would appear here..."
    });

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">

            {/* HEADER SECTION */}
            <div>
                            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-2 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
                <h1 className="text-3xl font-bold text-black">Contact Inbox</h1>
                <p className="text-gray-600 text-sm mt-1">Manage and track your latest inquiries.</p>
            </div>

            {/* FILTERS TOOLBAR */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* 1. SEARCH INPUT */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400"
                    />
                </div>

                {/* 2. SUBJECT FILTER (INSURANCE TYPE) */}
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer"
                    >
                        <option value="">All Insurance</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Motor Insurance">Motor Insurance</option>
                        <option value="Home Insurance">Home Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                    </select>
                </div>

                {/* 3. STATUS FILTER */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black/5 cursor-pointer"
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Replied">Replied</option>
                    </select>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                {/* Added max-h and overflow-y-auto for scrolling */}
                <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
                    <table className="min-w-full relative">
                        <thead className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Subject</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Contact Info</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredQuotes.length > 0 ? (
                                filteredQuotes.map((q: any) => {
                                    const avatar = getAvatarStyle(q.fullName);
                                    const isResolved = q.status !== "PENDING";

                                    return (
                                        <tr key={q._id} className="hover:bg-gray-50 transition-colors">
                                            {/* Customer */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${avatar.className}`}>
                                                        {avatar.initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{q.fullName}</div>
                                                        <div className="text-xs text-gray-500">ID: {q._id.substring(0, 6)}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                                                    {q.insuranceType || "General Inquiry"}
                                                </span>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                        {q.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                        {q.phone}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${isResolved
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                        : "bg-amber-50 text-amber-700 border-amber-100"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isResolved ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                                                    {isResolved ? "Resolved" : "Pending"}
                                                </div>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {!isResolved ? (
                                                    <button
                                                        onClick={() => {
                                                            setSelected(q);
                                                            setReply("");
                                                        }}
                                                        className="px-4 py-1.5 bg-white border border-gray-300 hover:border-black hover:text-black text-gray-700 text-xs font-medium rounded-lg transition-all"
                                                    >
                                                        Reply
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-400 text-xs font-medium rounded-md">
                                                        Replied
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                                        No inquiries found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* REPLY MODAL (Unchanged) */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

                        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarStyle(selected.fullName).className}`}>
                                    {getAvatarStyle(selected.fullName).initials}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Reply to {selected.fullName}</h2>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Mail className="w-3 h-3" /> {selected.email}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {/* Context Box */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                    Original Message <span className="text-gray-300">•</span> {formatDate(getOriginalMessage(selected).date)}
                                </div>
                                <div className="text-sm font-medium text-gray-900 mb-1">
                                    {getOriginalMessage(selected).subject}
                                </div>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    {getOriginalMessage(selected).body}
                                </div>
                            </div>

                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Your Response
                            </label>
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                rows={6}
                                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition resize-none bg-white"
                                placeholder={`Hello ${selected.fullName.split(' ')[0]}, thank you for reaching out...`}
                            />
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setSelected(null)}
                                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-black transition"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading || !reply.trim()}
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await fetch(`/api/insurance/${selected._id}/reply`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ replyMessage: reply }),
                                        });
                                        toast.success("Message sent successfully!", {duration:3000
                                    });
                                        setSelected(null);
                                    //  location.reload();
                                    } catch (err) {
                                        toast.error("failed to reply try again!");
                                        console.error("Failed to reply");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-all disabled:opacity-50"
                            >
                                {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Reply</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}