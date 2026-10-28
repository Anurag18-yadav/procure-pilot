import React from 'react';

export default function DomainExpertAIPreScreen({ onProceedToHumanReview, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#191c1e] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 px-8 h-20 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
          <div className="w-10 h-10 rounded-full bg-[#0b2447] border border-[#d4af37]/60 flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5 text-white transform rotate-45 translate-x-[-1px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold tracking-tight flex items-center">
              <span className="text-[#0b2447]">Procure</span>
              <span className="text-[#e6ac00]">Pilot</span>
            </div>
            <span className="text-[9px] font-semibold text-gray-400 tracking-wider uppercase -mt-1">
              GovTech Sandbox
            </span>
          </div>
        </div>

        {/* Center Breadcrumb / Title */}
        <div className="hidden md:flex items-center space-x-3 text-sm font-semibold text-gray-700">
          <span>Evaluations</span>
          <span className="text-gray-400">/</span>
          <span className="text-[#0b2447]">Expert Review Flow</span>
        </div>

        {/* Right Nav / Proposal Counter */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-xs font-bold text-[#0b2447]">Proposal 3 of 8</div>
            <div className="text-[10px] text-gray-400 tracking-wider uppercase">Active Queue</div>
          </div>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <button className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors font-bold">&lt;</button>
            <div className="w-[1px] bg-gray-200"></div>
            <button className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors font-bold">&gt;</button>
          </div>
          <button 
            onClick={() => alert("Abstained from reviewing this proposal.")}
            className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50"
          >
            Skip / Abstain
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Proposal Summary & Blind Masking) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 font-mono text-xs rounded-md font-bold">PRP-2026-9557</span>
              <span className="px-3 py-1 bg-[#0b2447] text-white text-xs font-semibold rounded-full tracking-wide">Stage 1 — AI Pre-Screening</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#000f27] tracking-tight">Autonomous Infrastructure Inspection</h1>
              <p className="text-xs font-semibold text-gray-500 mt-1">Department of Transportation</p>
            </div>

            {/* Blind Masking Notice */}
            <div className="p-3.5 bg-[#f0f4f8] rounded-xl border border-[#0b2447]/15 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#0b2447] text-lg mt-0.5">lock</span>
              <div>
                <h4 className="text-xs font-bold text-[#0b2447]">Applicant identity hidden for unbiased review</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">All identifying markers, corporate logos, and team member names have been masked from this document view.</p>
              </div>
            </div>
          </div>

          {/* Proposal Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-[#000f27] uppercase tracking-wider">Proposal Summary</h3>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Applicant Submission</span>
            </div>
            
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              Proposed deployment of autonomous drone arrays integrated with edge-computing thermal sensors to conduct automated bridge and highway structural integrity diagnostics without lane closures.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 block uppercase">Tech Stack</span>
                <span className="text-xs font-bold text-[#0b2447] mt-1 block">ROS2, PyTorch, Custom LiDAR</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 block uppercase">Team Size</span>
                <span className="text-xs font-bold text-[#0b2447] mt-1 block">4 Core Engineers</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 block uppercase">Requested Budget</span>
                <span className="text-xs font-bold text-[#0b2447] mt-1 block">$240,000 (Pilot Tier)</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 block uppercase">Timeline</span>
                <span className="text-xs font-bold text-[#0b2447] mt-1 block">6 Months Execution</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (AI Metrics & Risk Flags) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Metrics Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6 relative overflow-hidden">
            
            {/* Top Advisory Banner */}
            <div className="absolute top-0 right-0 bg-[#0b2447] text-white text-[9px] font-extrabold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">
              AI Pre-Screening — Advisory Only
            </div>

            <div className="flex justify-between items-start pt-2">
              <div>
                <h2 className="text-lg font-bold text-[#000f27]">Automated Evaluation Metrics</h2>
                <p className="text-xs text-gray-500">Synthesized from historical baseline benchmarks and challenge criteria.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-right">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">Overall Score</span>
                <span className="text-xl font-black text-[#0b2447]">7.9 <span className="text-xs text-gray-400 font-normal">/ 10</span></span>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Metric 1: Innovation */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0b2447]">Innovation</span>
                  <span className="font-extrabold text-[#0b2447]">8 / 10</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0b2447] rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[11px] text-gray-600">Novel application of real-time thermal edge inference for subsurface crack detection significantly exceeds current baseline inspection methodologies.</p>
              </div>

              {/* Metric 2: Feasibility */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0b2447]">Feasibility</span>
                  <span className="font-extrabold text-[#0b2447]">7.5 / 10</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0b2447] rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-[11px] text-gray-600">Architecture relies on standard open-source robotics libraries, reducing integration friction, though hardware procurement dependencies present moderate supply chain risk.</p>
              </div>

              {/* Metric 3: Impact */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0b2447]">Impact</span>
                  <span className="font-extrabold text-[#0b2447]">8.2 / 10</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0b2447] rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-[11px] text-gray-600">Potential to reduce highway structural assessment downtime by up to 45% while decreasing manual inspector safety exposure on active spans.</p>
              </div>

              {/* Metric 4: Cost */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0b2447]">Cost</span>
                  <span className="font-extrabold text-[#0b2447]">7.8 / 10</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0b2447] rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-[11px] text-gray-600">Budget allocation is highly efficient relative to expected output metrics; hardware unit costs scale reasonably within the targeted municipal funding tier.</p>
              </div>

            </div>
          </div>

          {/* AI-Identified Risk Flags Card */}
          <div className="bg-[#fffbeb] border border-[#fef08a] rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600 text-lg">warning</span>
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide">AI-Identified Risk Flags</h3>
            </div>
            <ul className="space-y-2 text-xs text-amber-900/90 list-disc list-inside font-medium">
              <li>Team size (4) is small relative to proposed multi-site autonomous deployment scope.</li>
              <li>Delivery timeline (6 months) is tighter than similar historically funded transport pilots.</li>
              <li>No prior government pilot delivery experience listed in corporate background summary.</li>
            </ul>
            <p className="text-[10px] text-amber-700/80 pt-1 italic border-t border-amber-200/60">
              These are flags for the expert reviewer to consider — not a rejection recommendation.
            </p>
          </div>

        </div>

      </main>

      {/* Bottom Sticky Action Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 px-8 mt-auto flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>Reviewing AI pre-screening insights. No decisions are recorded on this page.</span>
        </div>

        <button 
          onClick={onProceedToHumanReview}
          className="px-6 py-3 bg-[#0b2447] hover:bg-[#00172e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Expert Review</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </footer>

    </div>
  );
}