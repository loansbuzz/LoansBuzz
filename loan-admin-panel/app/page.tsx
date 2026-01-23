import Link from "next/link";
import { Bell, Mail, Users, ArrowRight, LayoutDashboard, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* MODERN HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                LoanAdmin
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Profile Placeholder */}
              <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, Admin</h2>
          <p className="text-slate-500 mt-1">Here is what's happening with your loan applications today.</p>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CONTACT MESSAGES CARD */}
          <Link
            href="/admin/contact"
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                Contact Messages
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                View incoming inquiries, track customer questions, and send replies directly.
              </p>
            </div>
          </Link>

          {/* PARTNER APPLICATIONS CARD */}
          <Link
            href="/admin/partners"
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
             <div className="flex items-start justify-between">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                Partner Applications
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Review new partnership requests, approve statuses, and manage partner details.
              </p>
            </div>
          </Link>

          {/* INSURANCE APPLICATIONS CARD (New Section) */}
          <Link
            href="/admin/insurance"
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
             <div className="flex items-start justify-between">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                Insurance Applications
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Track insurance quote requests, review policy types, and manage customer coverage details.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}