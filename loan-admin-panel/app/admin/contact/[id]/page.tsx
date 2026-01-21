import { connectDB } from "../../../lib/mongos";
import ContactMessage from "../../../lib/models/ContactMessage";
import { Mail, User, MessageSquare, Send, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

// Helper for initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default async function ReplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  const msg = await ContactMessage.findById(id).lean();

  if (!msg) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <div className="p-4 bg-red-50 text-red-600 rounded-full mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Message not found</h3>
        <p className="text-gray-500 mt-1">This message may have been deleted.</p>
        <Link href="/admin/contact" className="mt-4 text-indigo-600 hover:underline">
          Go back to messages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* HEADER WITH BACK BUTTON */}
      <div className="mb-8">
        <Link 
          href="/admin/contact" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Messages
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Reply to Inquiry
        </h1>
        <p className="text-gray-500 mt-1">Response sent via email to {msg.email}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ORIGINAL MESSAGE CARD */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
            {/* SENDER INFO HEADER */}
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-start gap-4">
               <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold border border-indigo-100 flex-shrink-0">
                  {getInitials(msg.fullName)}
               </div>
               <div>
                  <h3 className="text-lg font-semibold text-gray-900">{msg.fullName}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {msg.email}
                    </span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> 
                      {/* Assuming createdAt exists, otherwise hardcode or remove */}
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
               </div>
            </div>

            {/* MESSAGE BODY */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Subject: {msg.subject}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          </div>

          {/* REPLY FORM SECTION */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-600" />
              Compose Reply
            </h3>
            
            <form action={`/api/contact/${id}/reply`} method="POST">
              <div className="relative">
                <textarea
                  name="replyMessage"
                  rows={6}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all resize-none"
                  placeholder={`Hi ${msg.fullName.split(' ')[0]}, regarding your inquiry...`}
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <Link
                  href="/admin/contact"
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: SIDEBAR DETAILS (Optional context) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Details
            </h4>
            
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-gray-500 block mb-1">Status</label>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    msg.status === "PENDING"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      msg.status === "PENDING" ? "bg-amber-500" : "bg-emerald-500"
                    }`} />
                    {msg.status}
                  </span>
               </div>

               <div>
                  <label className="text-xs text-gray-500 block mb-1">Phone Number</label>
                  <p className="text-sm text-gray-900 font-medium">{msg.phone}</p>
               </div>

               <div>
                  <label className="text-xs text-gray-500 block mb-1">Email Address</label>
                  <p className="text-sm text-gray-900 font-medium break-all">{msg.email}</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}