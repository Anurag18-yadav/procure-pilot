import React, { useState } from 'react';

export default function SubmitProposalStep1({ onNext, onNavigate }) {
  const [formData, setFormData] = useState({
    entityName: '',
    dippNumber: '',
    innovationBrief: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    if (!formData.entityName || !formData.dippNumber || !formData.innovationBrief) {
      setError('Please fill in all statutory verification fields.');
      return;
    }
    setError('');
    if (onNext) onNext();
  };

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
              className="inline-flex items-center px-4 py-2 bg-[#0b2447]/10 text-[#0b2447] border border-[#0b2447]/20 rounded-xl text-xs font-bold hover:bg-[#0b2447]/20 transition-all cursor-pointer"
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
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#0b2447] text-white shadow-sm">
            <span className="text-[10px] font-bold uppercase">Step 1</span>
            <span className="text-xs font-semibold truncate max-w-full">Eligibility</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 text-gray-500">
            <span className="text-[10px] font-bold uppercase">Step 2</span>
            <span className="text-xs font-semibold truncate max-w-full">Solution</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 text-gray-500">
            <span className="text-[10px] font-bold uppercase">Step 3</span>
            <span className="text-xs font-semibold truncate max-w-full">Technical</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 text-gray-500">
            <span className="text-[10px] font-bold uppercase">Step 4</span>
            <span className="text-xs font-semibold truncate max-w-full">Commercials</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 text-gray-500">
            <span className="text-[10px] font-bold uppercase">Step 5</span>
            <span className="text-xs font-semibold truncate max-w-full">Review & Submit</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">RFP / PILOT SUBMISSION</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#000f27] mt-1">
            Step 1: Eligibility &amp; Statutory Verification
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 text-red-700 text-xs rounded-md font-medium">
            {error}
          </div>
        )}

        <div className="bg-white border border-[#c4c6cf] rounded-2xl p-8 shadow-xs max-w-4xl mx-auto">
          <div className="mb-6 pb-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#000f27]">Startup Entity Details &amp; GFR 149(v) Compliance</h3>
            <p className="text-xs text-[#44474e] mt-1">
              Please provide your DPIIT registration details and verify statutory compliance under public procurement guidelines.
            </p>
          </div>

          <form onSubmit={handleNextSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Registered Entity Name</label>
              <input
                type="text"
                name="entityName"
                value={formData.entityName}
                onChange={handleChange}
                placeholder="e.g. RoadTech Labs Pvt Ltd"
                className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-[#0b2447] focus:border-[#0b2447]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">DPIIT Recognition Number</label>
              <input
                type="text"
                name="dippNumber"
                value={formData.dippNumber}
                onChange={handleChange}
                placeholder="e.g. DIPP98421"
                className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-[#0b2447] focus:border-[#0b2447]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Core Innovation Brief</label>
              <textarea
                name="innovationBrief"
                rows="4"
                value={formData.innovationBrief}
                onChange={handleChange}
                placeholder="Briefly describe your technological approach..."
                className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:ring-[#0b2447] focus:border-[#0b2447]"
                required
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0b2447] text-white rounded-xl text-xs font-bold hover:bg-[#00172e] transition-all cursor-pointer shadow-sm"
              >
                Save &amp; Continue to Step 2 (Solution) &rarr;
              </button>
            </div>
          </form>
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