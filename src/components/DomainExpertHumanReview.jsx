import React, { useState } from 'react';

export default function DomainExpertHumanReview({ onNavigate }) {
  // State for 5 scoring criteria (1 to 10) and notes
  const [scores, setScores] = useState({
    tech: 8,
    feasibility: 8,
    cost: 7,
    team: 8,
    interop: 9
  });

  const [notes, setNotes] = useState({
    tech: " Excellently suited for edge acoustic inferencing; robust filter against ambient traffic",
    feasibility: "Hardware BOM realistic; NavIC module integration sound.",
    cost: "Normalised tranche milestones align with ULB delivery caps.",
    team: "Deep domain expertise demonstrated in submitted schematics.",
    interop: "Direct MQTT integration with Gurugram ICCC Smart City GIS."
  });

  const [justification, setJustification] = useState(
    "The proposal exhibits exceptional acoustic modeling rigor tailored to sub-surface urban culverts. Test bench calibration logs from IIT Delhi validate reliable sludge differentiation. The hardware BOM is defensible and aligns with GFR capital outlay norms."
  );

  const [conflictChecked, setConflictChecked] = useState(true);

  // Calculate weighted aggregate score
  // Weights: Tech 30%, Feasibility 25%, Cost 20%, Team 15%, Interoperability 10%
  const aggregateScore = (
    scores.tech * 0.30 +
    scores.feasibility * 0.25 +
    scores.cost * 0.20 +
    scores.team * 0.15 +
    scores.interop * 0.10
  ).toFixed(1);

  const handleScoreSelect = (criteria, value) => {
    setScores(prev => ({ ...prev, [criteria]: value }));
  };

  const handleNoteChange = (criteria, value) => {
    setNotes(prev => ({ ...prev, [criteria]: value }));
  };

  const handleSubmitEvaluation = (actionType) => {
    if (!conflictChecked) {
      alert("Kripya Conflict of Interest Declaration checkbox ko tick karein!");
      return;
    }
    if (justification.length < 100) {
      alert("Statutory Justification & Evaluation Summary kam se kam 100 characters ki honi chahiye!");
      return;
    }
    alert(`Success: Proposal evaluated successfully with Aggregate Score ${aggregateScore}/10. Action locked as [${actionType.toUpperCase()}] under GFR 149(v) compliance!`);
    onNavigate('dashboard');
  };

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

        {/* Center Breadcrumb */}
        <div className="hidden md:flex items-center space-x-3 text-sm font-semibold text-gray-700">
          <span>Evaluations</span>
          <span className="text-gray-400">/</span>
          <span className="text-[#0b2447]">Step 2: Human Expert Final Review</span>
        </div>

        {/* Back to AI Pre-screen */}
        <button 
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-[#0b2447] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to AI Pre-Screen</span>
        </button>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Proposal Summary & Reference */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 font-mono text-xs rounded-md font-bold">PRP-2026-9557</span>
              <span className="px-3 py-1 bg-[#0b2447] text-white text-xs font-semibold rounded-full tracking-wide">Stage 2 — Human Review</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#000f27] tracking-tight">Autonomous Infrastructure Inspection</h1>
              <p className="text-xs font-semibold text-gray-500 mt-1">Department of Transportation</p>
            </div>

            <div className="p-3.5 bg-[#f0f4f8] rounded-xl border border-[#0b2447]/15 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#0b2447] text-lg mt-0.5">lock</span>
              <div>
                <h4 className="text-xs font-bold text-[#0b2447]">Blind Review Protocol Active</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Evaluating based purely on technical merit under GFR 149(v) guidelines.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#000f27] uppercase tracking-wider border-b border-gray-100 pb-3">Proposal Reference</h3>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              Proposed deployment of autonomous drone arrays integrated with edge-computing thermal sensors to conduct automated bridge and highway structural integrity diagnostics without lane closures.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-[10px] text-gray-400 block uppercase">Tech Stack</span>
                <span className="font-bold text-[#0b2447]">ROS2, PyTorch</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-[10px] text-gray-400 block uppercase">Budget</span>
                <span className="font-bold text-[#0b2447]">$240,000</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Independent Technical Rubric Scaling */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#000f27]">Independent Technical Rubric</h2>
                <p className="text-xs text-gray-500">GFR Rule 149(v) Compliance</p>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-xl">fact_check</span>
            </div>

            {/* Weighted Aggregate Score Box */}
            <div className="bg-[#0b2447] text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
              <div>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">Weighted Aggregate Score</span>
                <div className="text-3xl font-black mt-1">
                  {aggregateScore} <span className="text-sm text-gray-300 font-normal">/ 10</span>
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-right">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                  <span>✓</span>
                  <span>Meets Benchmark &ge; 7.5</span>
                </div>
                <span className="text-[11px] text-gray-300 block mt-0.5">Qualifies for Stage 3 Pilot</span>
              </div>
            </div>

            {/* Criteria 1: Technical Approach */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0b2447]">1. Technical Approach</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-md">Weight: 30%</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleScoreSelect('tech', num)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      scores.tech === num 
                        ? 'bg-[#0b2447] text-white border-[#0b2447] shadow-xs' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={notes.tech}
                onChange={(e) => handleNoteChange('tech', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#0b2447]"
              />
            </div>

            {/* Criteria 2: Feasibility & Deployment */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0b2447]">2. Feasibility &amp; Deployment</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-md">Weight: 25%</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleScoreSelect('feasibility', num)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      scores.feasibility === num 
                        ? 'bg-[#0b2447] text-white border-[#0b2447] shadow-xs' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={notes.feasibility}
                onChange={(e) => handleNoteChange('feasibility', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#0b2447]"
              />
            </div>

            {/* Criteria 3: Cost Efficiency */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0b2447]">3. Cost Efficiency</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-md">Weight: 20%</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleScoreSelect('cost', num)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      scores.cost === num 
                        ? 'bg-[#0b2447] text-white border-[#0b2447] shadow-xs' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={notes.cost}
                onChange={(e) => handleNoteChange('cost', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#0b2447]"
              />
            </div>

            {/* Criteria 4: Team Capability */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0b2447]">4. Team Capability (Patents &amp; Specs)</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-md">Weight: 15%</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleScoreSelect('team', num)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      scores.team === num 
                        ? 'bg-[#0b2447] text-white border-[#0b2447] shadow-xs' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={notes.team}
                onChange={(e) => handleNoteChange('team', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#0b2447]"
              />
            </div>

            {/* Criteria 5: Municipal Interoperability */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0b2447]">5. Municipal Interoperability</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-md">Weight: 10%</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleScoreSelect('interop', num)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      scores.interop === num 
                        ? 'bg-[#0b2447] text-white border-[#0b2447] shadow-xs' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={notes.interop}
                onChange={(e) => handleNoteChange('interop', e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:border-[#0b2447]"
              />
            </div>

          </div>

          {/* Statutory Justification & Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[#000f27] uppercase tracking-wide">
                Statutory Justification &amp; Evaluation Summary *
              </label>
              <span className="text-[11px] font-semibold text-emerald-600">
                {justification.length} / 100 characters minimum met
              </span>
            </div>
            <textarea 
              rows="5"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b2447]"
            ></textarea>
          </div>

          {/* Conflict of Interest Declaration */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-start gap-3">
            <input 
              type="checkbox" 
              id="conflict"
              checked={conflictChecked}
              onChange={(e) => setConflictChecked(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0b2447] rounded border-gray-300 focus:ring-[#0b2447]"
            />
            <label htmlFor="conflict" className="text-xs text-gray-700 font-medium cursor-pointer">
              <strong className="text-[#000f27]">Conflict of Interest Declaration:</strong> I solemnly declare that I have no personal, commercial, or consulting affiliation with the authors of this anonymised proposal or related patent holders.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button 
              type="button"
              onClick={() => handleSubmitEvaluation('submit')}
              className="w-full py-4 bg-[#0b2447] hover:bg-[#00172e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Submit Final Evaluation (e-Sign / DSC)</span>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleSubmitEvaluation('recommend')}
                className="py-3 bg-white hover:bg-gray-50 text-[#0b2447] border border-gray-300 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">bookmark</span>
                <span>Recommend</span>
              </button>

              <button 
                type="button"
                onClick={() => handleSubmitEvaluation('flag')}
                className="py-3 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">flag</span>
                <span>Flag Irregularity</span>
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}