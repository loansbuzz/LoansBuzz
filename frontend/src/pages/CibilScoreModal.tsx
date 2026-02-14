import React from 'react';

const CibilScoreModal = ({ showResult, setShowResult, scoreData }) => {
  if (!showResult || !scoreData) return null;

  return (
    /* 1. The Overlay: Fixed, full screen, and Flexbox Centering */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={() => setShowResult(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors p-2"
          aria-label="Close"
        >
          <span className="text-xl">✕</span>
        </button>

        {/* Header & Circular Score */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your CIBIL Score
          </h2>

          <div className="flex items-center justify-center">
            {/* Score Ring */}
            <div className="w-40 h-40 rounded-full border-[10px] border-green-500 flex flex-col items-center justify-center shadow-inner bg-white">
              <span className="text-5xl font-black text-green-600">
                {scoreData.credit_score}
              </span>
            </div>
          </div>

          <p className="mt-6 text-xl font-bold text-green-600 uppercase tracking-wide">
            {scoreData.score_band}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Report Date: {new Date(scoreData.report_date).toLocaleDateString('en-IN')}
          </p>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Name</p>
            <p className="font-bold text-gray-800 text-lg capitalize">{scoreData.user.name}</p>
          </div>

          <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">PAN</p>
            <p className="font-bold text-gray-800 text-lg">{scoreData.user.masked_pan}</p>
          </div>
        </div>

        {/* Key Factors Section */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-bold mb-5 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Key Credit Factors
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Payment History</p>
              <p className="font-bold text-green-600 text-lg">
                {scoreData.factors.payment_history}
              </p>
            </div>

            <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Credit Age</p>
              <p className="font-bold text-gray-800 text-lg">
                {scoreData.factors.credit_age}
              </p>
            </div>

            <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Total Accounts</p>
              <p className="font-bold text-gray-800 text-lg">
                {scoreData.factors.total_accounts}
              </p>
            </div>

            <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Recent Inquiries</p>
              <p className="font-bold text-gray-800 text-lg">
                {scoreData.factors.inquiries_last_30_days}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400">
          <span>Official Credit Report</span>
          <span>Request ID: {scoreData.request_id || "N/A"}</span>
        </div>

      </div>
    </div>
  );
};

export default CibilScoreModal;