"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Import Link
import { useMemo, useState } from "react";
import { Search, Filter, Mail, Phone, ArrowUpRight, FileText, X, Send, ArrowLeft, Loader2, Calendar } from "lucide-react"; // ✅ Added ArrowLeft
import { toast } from "sonner";

type Message = {
  _id: string;
  fullName: string;
  subject: string;
  email: string;
  phone: string;
  status: "PENDING" | "REPLIED";
  message: string;
  createdAt: string;
};

// Helper to get initials
const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
};

export default function ContactTable({ messages }: { messages: Message[] }) {
  const router = useRouter();

  // --- STATES ---
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "REPLIED">("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");

  // Modal States
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // --- FILTER LOGIC ---
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const query = search.toLowerCase();
      const matchesSearch =
        msg.fullName.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.phone.includes(query);
      const matchesStatus = statusFilter === "ALL" || msg.status === statusFilter;
      const matchesSubject =
        subjectFilter === "ALL" ||
        msg.subject.toLowerCase().includes(subjectFilter.replace(/-/g, " ").toLowerCase()) ||
        msg.subject.toLowerCase() === subjectFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [search, statusFilter, subjectFilter, messages]);


  // --- HANDLERS ---
  const handleOpenModal = (msg: Message) => {
    setSelectedMessage(msg);
    setReplyText("");
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setIsSending(false);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage) return;

    setIsSending(true);

    try {
      const res = await fetch(`/api/contact/${selectedMessage._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyMessage: replyText }),
      });

      if (res.ok) {
        router.refresh();
        handleCloseModal();
        // alert("Reply sent successfully!");
        toast.success("Message sent successfully!", {
          duration:3000
          // description: "Our team will contact you within 24 hours.",
        });
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
          duration:3000
        });
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col">
            {/* ✅ NEW BACK BUTTON */}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-2 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>

            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Contact Inbox</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track your latest inquiries.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 w-4 h-4 transition-colors" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Subject Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FileText className="w-4 h-4 text-gray-500" />
              </div>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 w-full sm:w-48 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-all"
              >
                <option value="ALL">All Subjects</option>
                <option value="loan-inquiry">Loan Inquiry</option>
                <option value="insurance">Insurance</option>
                <option value="credit-card">Credit Card</option>
                <option value="mutual-funds">Mutual Funds</option>
                <option value="dsa-partner">DSA Partnership</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Filter className="w-4 h-4 text-gray-500" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2.5 w-full sm:w-40 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-all"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="REPLIED">Replied</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr key={msg._id} className="group hover:bg-gray-50/80 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold border border-indigo-100">
                          {getInitials(msg.fullName)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{msg.fullName}</p>
                          <p className="text-xs text-gray-400">ID: {msg._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                        {msg.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {msg.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {msg.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${msg.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${msg.status === "PENDING" ? "bg-amber-500" : "bg-emerald-500"
                          }`} />
                        {msg.status === "PENDING" ? "Pending Review" : "Resolved"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {msg.status === "PENDING" ? (
                        <button
                          onClick={() => handleOpenModal(msg)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-xs font-medium border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                        >
                          Reply
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="text-gray-400 inline-flex items-center justify-end">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">Replied</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Search className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-gray-900 font-medium">No messages found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= REPLY MODAL ================= */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold border border-indigo-200">
                  {getInitials(selectedMessage.fullName)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Reply to {selectedMessage.fullName}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> {selectedMessage.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto custom-scrollbar">

              {/* Customer Message Card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Original Message
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{selectedMessage.subject}</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message || "No message content provided."}
                </p>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Response
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      required
                      rows={6}
                      className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all resize-none shadow-sm"
                      placeholder={`Hello ${selectedMessage.fullName.split(" ")[0]}, thank you for reaching out...`}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                      disabled={isSending}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Reply

                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
}