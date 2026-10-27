import React from 'react';

export default function SubmitProposalStep5({ onSubmit, onBack, onNavigate }) {
  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans antialiased flex flex-col">
      
      {/* NAVBAR */}
      <header className="bg-white border-b border-[#c4c6cf] sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
            <div className="w-10 h-10 rounded-full bg-[#0b2447] border border-[#d4af37]/60 flex items-center justify-center text-white">
              <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold flex items-center">
                <span className="text-[#0b2447]">Procure</span>
                <span className="text-[#e6ac00]">Pilot</span>
              </div>
              <span className="text-[9px] font-semibold text-gray-400 uppercase -mt-1">Launch. Pilot. Scale.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('startup-profile')}
              className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-xs font-bold hover:bg-orange-100 transition-all cursor-pointer"
            >
              📊 Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('userRole');
                if (onNavigate) onNavigate('landing');
              }}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-6">
        
        {/* 5-Step Progress Header Indicator */}
        <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8">
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-100 text-gray-700">
            <span className="text-[10px] font-bold uppercase">Step 1</span>
            <span className="text-xs font-semibold truncate max-w-full">Eligibility</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-100 text-gray-700">
            <span className="text-[10px] font-bold uppercase">Step 2</span>
            <span className="text-xs font-semibold truncate max-w-full">Solution</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-100 text-gray-700">
            <span className="text-[10px] font-bold uppercase">Step 3</span>
            <span className="text-xs font-semibold truncate max-w-full">Technical</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-100 text-gray-700">
            <span className="text-[10px] font-bold uppercase">Step 4</span>
            <span className="text-xs font-semibold truncate max-w-full">Commercials</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#0b2447] text-white shadow-sm">
            <span className="text-[10px] font-bold uppercase">Step 5</span>
            <span className="text-xs font-semibold truncate max-w-full">Review & Submit</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">RFP / PILOT SUBMISSION</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#000f27] mt-1">
            Step 5: Final Proposal Review &amp; Submission
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Readiness Checklist */}
          <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-xs space-y-4 h-fit">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#000f27]">Submission Readiness</h3>
              <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2.5 py-1 rounded-full">5/5 PASSED</span>
            </div>
            
            <ul className="space-y-3 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">&#10003;</span>
                DPIIT Recognition Validated
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">&#10003;</span>
                Solution Scope &amp; Target Verified
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">&#10003;</span>
                Technical Approach &amp; Stack Attached
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">&#10003;</span>
                Milestone Budgeting &amp; Tranches Set
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">&#10003;</span>
                Escrow &amp; GFR 149(v) Compliance Active
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 mt-4">
              <span className="font-bold block mb-1">🔒 Double-Blind Protocol Active</span>
              Your startup details will be masked during initial academic jury evaluation.
            </div>
          </div>

          {/* RIGHT COLUMN: Review Dossier */}
          <div className="lg:col-span-2 bg-white border border-[#c4c6cf] rounded-2xl p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#000f27]">Consolidated Proposal Dossier</h3>
              <p className="text-xs text-[#44474e] mt-1">
                Please examine your dossier carefully. Once submitted, the technical envelope is locked cryptographically.
              </p>
            </div>

            <div className="space-y-4 text-xs divide-y divide-gray-100">
              <div className="pt-4 flex justify-between">
                <div>
                  <span className="text-gray-400 block font-semibold">1. Eligibility &amp; Statutory</span>
                  <span className="font-bold text-[#000f27]">DIPP Verified • GFR 149(v) Exempt</span>
                </div>
              </div>
              <div className="pt-4 flex justify-between">
                <div>
                  <span className="text-gray-400 block font-semibold">2. Solution Overview</span>
                  <span className="font-bold text-[#000f27]">AI-Powered Stormwater Drainage Clog Early-Detection</span>
                </div>
              </div>
              <div className="pt-4 flex justify-between">
                <div>
                  <span className="text-gray-400 block font-semibold">3. Technical Architecture</span>
                  <span className="font-bold text-[#000f27]">React, Edge AI, Sensor Telemetry Pipeline</span>
                </div>
              </div>
              <div className="pt-4 flex justify-between">
                <div>
                  <span className="text-gray-400 block font-semibold">4. Commercials &amp; Budget</span>
                  <span className="font-bold text-[#000f27]">₹45,00,000 Total Allocation (2 Tranches)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onBack && onBack()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer"
              >
                &larr; Back to Step 4
              </button>

              <button
                type="button"
                onClick={() => onSubmit && onSubmit()}
                className="px-8 py-3 bg-green-700 text-white rounded-xl text-xs font-bold hover:bg-green-800 transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Submit Proposal to Escrow</span>
                <span className="material-symbols-outlined text-[14px]">send</span>
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#000f27] text-white border-t border-[#c4c6cf] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-400">
          © 2026 ProcurePilot India. GFR 2017 Public Innovation Procurement Framework.
        </div>
      </footer>
    </div>
  );
}