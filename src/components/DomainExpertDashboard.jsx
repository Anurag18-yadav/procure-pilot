import React, { useState } from 'react';

export default function DomainExpertDashboard({ onPreviousProposal, onNextProposal, onNavigate }) {
  const [scores, setScores] = useState({
    technicalApproach: 8,
    feasibility: 8,
    costEfficiency: 7,
    teamCapability: 8,
    interoperability: 9
  });

  const [notes, setNotes] = useState({
    technicalApproach: "Excellently suited for edge acoustic inferencing; robust filter against ambient traffic vibration.",
    feasibility: "Hardware BOM realistic; NavIC module integration sound.",
    costEfficiency: "Normalised tranche milestones align with ULB delivery caps.",
    teamCapability: "Deep domain expertise demonstrated in submitted schematics.",
    interoperability: "Direct MQTT integration with Gurugram ICCC Smart City GIS."
  });

  const [justification, setJustification] = useState(
    "The proposal exhibits exceptional acoustic modeling rigor tailored to sub-surface urban culverts. Test bench calibration logs from IIT Delhi validate reliable sludge differentiation. The hardware BOM is defensible and aligns with GFR capital outlay norms."
  );

  const [coiDeclared, setCoiDeclared] = useState(true);
  const [aiAdvisoryOpen, setAiAdvisoryOpen] = useState(true);

  // Weight Calculation (30%, 25%, 20%, 15%, 10%)
  const aggregateScore = (
    scores.technicalApproach * 0.30 +
    scores.feasibility * 0.25 +
    scores.costEfficiency * 0.20 +
    scores.teamCapability * 0.15 +
    scores.interoperability * 0.10
  ).toFixed(1);

  const handleScoreChange = (criterion, val) => {
    setScores(prev => ({ ...prev, [criterion]: val }));
  };

  const handleNoteChange = (criterion, val) => {
    setNotes(prev => ({ ...prev, [criterion]: val }));
  };

  const handleDownloadDossier = (fileName = 'ProcurePilot_Redacted_Dossier_PRP-2026-0447.pdf') => {
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Title (ProcurePilot Secure Redacted Dossier) /Producer (GovTech India STQC Level 3 Sandbox) >>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 5 0 R >>
endobj
5 0 obj
<< /Length 120 >>
stream
BT
/F1 12 Tf
72 720 Td
(GOVERNMENT OF INDIA - SECURE REDACTED ATTACHMENT) Tj
72 700 Td
(Proposal ID: PRP-2026-0447 | STQC Verified Hash) Tj
72 680 Td
(All proprietary entity identifiers masked under GFR 149(v) guidelines.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000125 00000 n 
0000000174 00000 n 
0000000239 00000 n 
0000000378 00000 n 
trailer
<< /Size 6 /Root 2 0 R >>
startxref
548
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!coiDeclared) {
      alert("Please confirm the Conflict of Interest Declaration before submitting.");
      return;
    }
    alert(`Final Evaluation Submitted with Aggregate Score: ${aggregateScore}/10`);
  };

  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('landing');
    } else {
      window.location.hash = 'landing';
    }
  };

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] font-sans antialiased min-h-screen flex flex-col selection:bg-[#cadaff] selection:text-[#4f5f7f]">
      {/* GOVT OF INDIA INSTITUTIONAL STRIP */}
      <div className="bg-[#0b2447] text-white px-6 py-1.5 flex items-center justify-between text-xs">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center font-bold tracking-wider text-[11px] text-[#ffe08e] border border-[#cea62c]/40 px-1.5 py-0.5 rounded">
              GOI • MeitY
            </span>
            <span className="text-[#c4c6cf] hidden md:inline">|</span>
            <span className="text-[#e1e2e4] text-[13px] font-semibold hidden md:inline">National Innovation Sandbox Evaluator Framework</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#e1e2e4] text-[11px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#ffe08e]">shield</span>
              Secure Channel (STQC Level 3)
            </span>
            <span className="text-[#c4c6cf]">|</span>
            <span className="text-[#e1e2e4] text-[11px] font-semibold">Standard Time: IST (UTC+05:30)</span>
          </div>
        </div>
      </div>

      {/* TOP NAVBAR */}
      <header className="bg-white border-b border-[#c4c6cf] sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleBackToHome}>
            {/* Custom Logo Icon */}
            <div className="w-10 h-10 rounded-full bg-[#0b2447] border border-[#d4af37]/60 flex items-center justify-center text-white shadow-xs" title="ProcurePilot Logo">
              <svg className="w-5 h-5 text-white transform rotate-45 translate-x-[-1px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            
            {/* Logo Text & Tagline */}
            <div className="flex flex-col">
              <div className="text-xl font-bold tracking-tight flex items-center gap-2">
                <div>
                  <span className="text-[#0b2447]">Procure</span>
                  <span className="text-[#e6ac00]">Pilot</span>
                </div>
                <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#c4c6cf]">Sandbox v2.4</span>
              </div>
              <span className="text-[9px] font-semibold text-gray-400 tracking-wider uppercase -mt-0.5">
                Launch. Pilot. Scale.
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <a className="text-[#44474e] hover:text-[#000f27] transition-colors px-2 py-1 rounded" href="#challenges">Challenges</a>
            <a className="border-b-2 border-[#000f27] text-[#000f27] font-semibold pb-1 flex items-center gap-1.5" href="#evaluations">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              Evaluations
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden lg:block mr-2">
              <span className="text-[11px] font-semibold text-[#44474e] block">Jury Token</span>
              <span className="font-mono text-[13px] font-bold text-[#000f27]">JURY-EVAL-IITD-04</span>
            </div>
            <button
              type="button"
              onClick={handleBackToHome}
              className="px-4 py-2 bg-[#0b2447] text-white text-xs font-bold rounded-lg hover:bg-[#00172e] transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* STATUTORY BLIND EVALUATION BANNER */}
      <div className="bg-[#d7e3ff]/50 border-b border-[#b6c7eb]/60 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start md:items-center gap-2.5">
            <span className="material-symbols-outlined text-[#0b2447] text-[20px] mt-0.5 md:mt-0">lock</span>
            <div className="text-xs text-[#081b37]">
              <strong className="font-semibold text-[#000f27]">Blind Mode Active:</strong> Startup legal name, founders, equity cap-table, and prior funding history are cryptographically redacted under <strong>GFR 149(v)</strong> statutory guidelines.
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-[#374765] shrink-0">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Session: 24-Oct-2026 14:32:08 IST
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#b6c7eb] font-mono text-[#000f27] font-semibold">
              Hash: 9a7f...d81e
            </span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        {/* Top Proposal Meta Card */}
        <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="text-2xl font-bold text-[#000f27] tracking-tight">Proposal PRP-2026-0447</span>
                <span className="bg-[#d7e3ff] text-[#000f27] text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded border border-[#b6c7eb]">
                  Stage 2 Technical Review
                </span>
                <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-2.5 py-0.5 rounded border border-[#c4c6cf] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility_off</span>
                  [ENTITY MASKED: ANONYMOUS APPLICANT #447]
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#44474e]">
                <span className="material-symbols-outlined text-[18px] text-[#755b00]">water_drop</span>
                <span className="font-medium text-[#191c1e]">Challenge Context:</span>
                <span>AI-Powered Stormwater Drainage Clog Early-Detection System • Municipal Corporation of Gurugram</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#44474e] block">Assigned Sector Group</span>
                <span className="text-base text-[#000f27] font-semibold">Urban Drainage &amp; IoT</span>
              </div>
              <div className="h-8 w-[1px] bg-[#c4c6cf] hidden sm:block"></div>
              <button 
                type="button"
                onClick={() => handleDownloadDossier('ProcurePilot_Redacted_Dossier_PRP-2026-0447.pdf')}
                className="bg-[#edeef0] text-[#191c1e] hover:bg-[#e7e8ea] text-[13px] font-semibold px-3 py-2 rounded-lg border border-[#c4c6cf] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Full Redacted Dossier
              </button>
            </div>
          </div>

          {/* Legal Entity Redaction Strip */}
          <div className="mt-4 pt-4 border-t border-[#c4c6cf] grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#f2f4f6] p-3 rounded-lg">
            <div>
              <span className="text-[11px] font-semibold text-[#44474e] block mb-1">Incorporation Entity</span>
              <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-semibold bg-[#e7e8ea] px-2 py-1 rounded border border-[#c4c6cf]">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>[REDACTED - GFR JURY PROTOCOL]</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#44474e] block mb-1">Corporate Identity (CIN)</span>
              <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-semibold bg-[#e7e8ea] px-2 py-1 rounded border border-[#c4c6cf]">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                <span>[REDACTED - 21 DIGIT CIN]</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#44474e] block mb-1">Key Promoters &amp; Founders</span>
              <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-semibold bg-[#e7e8ea] px-2 py-1 rounded border border-[#c4c6cf]">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>[REDACTED - 3 INDIVIDUALS]</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#44474e] block mb-1">Institutional Backers / Cap Table</span>
              <div className="flex items-center gap-1.5 text-[#44474e] text-[11px] font-semibold bg-[#e7e8ea] px-2 py-1 rounded border border-[#c4c6cf]">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                <span>[REDACTED - PRIVATE EQUITY/SEED]</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12-COLUMN MAIN EVALUATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: 7 COLUMNS */}
          <div className="lg:col-span-7 space-y-6">
            {/* COLLAPSIBLE AI ADVISORY ASSESSMENT */}
            <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 border-l-4 border-l-[#cea62c] shadow-xs">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setAiAdvisoryOpen(!aiAdvisoryOpen)}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#755b00] text-[22px]">psychology</span>
                  <div>
                    <span className="text-base font-bold text-[#000f27]">Automated Pre-Screening Advisory Signal</span>
                    <span className="bg-[#ffe08e] text-[#241a00] text-[11px] font-semibold px-2 py-0.5 rounded ml-2">Score: 7.9 / 10</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#44474e] text-[20px]">{aiAdvisoryOpen ? 'expand_less' : 'expand_more'}</span>
              </div>

              {aiAdvisoryOpen && (
                <div className="mt-4 pt-3 border-t border-[#c4c6cf] space-y-2">
                  <div className="text-xs text-[#191c1e] space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#755b00] mt-0.5">check_circle</span>
                      <span><strong>Acoustic Model Fit:</strong> Algorithmic approach matches monsoon surge parameters observed across 24 historical Gurugram flood hot-spots.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#755b00] mt-0.5">check_circle</span>
                      <span><strong>Hardware Latency:</strong> Edge-inferencing latency benchmark clocked at 42ms on test bench, safely inside the municipal 50ms SLA constraint.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#755b00] mt-0.5">check_circle</span>
                      <span><strong>Hardware Interoperability:</strong> Sensor schematics meet STQC preliminary environmental standard IS-13252.</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#44474e] italic pt-2 border-t border-[#c4c6cf]/50">
                    Notice: This automated pre-screening is strictly advisory. Evaluator independent scoring governs final statutory ranking under GFR Rule 149(v).
                  </p>
                </div>
              )}
            </div>

            {/* SECTION A: Solution Summary & Core Architecture */}
            <article className="bg-white border border-[#c4c6cf] rounded-xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf] mb-4">
                <h2 className="text-base text-[#000f27] font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000f27] text-white flex items-center justify-center text-[11px] font-semibold">A</span>
                  Solution Summary &amp; Core Architecture
                </h2>
                <span className="text-[11px] font-semibold text-[#44474e] font-mono">Dossier Page 02-06</span>
              </div>
              <div className="space-y-4 text-[#191c1e] text-sm leading-relaxed">
                <p>
                  The proposed system deploys a low-power, non-invasive <strong>Acoustic-Inference Sensor Network</strong> engineered for sub-surface stormwater conduit monitoring. Unlike conventional visual ultrasound sensors that foul within 72 hours of urban sludge exposure, this architecture records resonant acoustic harmonics generated by turbulent and laminar flow within reinforced concrete conduit pipes.
                </p>
                <div className="bg-[#f2f4f6] p-4 rounded-lg border border-[#c4c6cf]">
                  <h3 className="text-[13px] font-semibold text-[#000f27] mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">memory</span>
                    Edge Processing &amp; Desilting Logic
                  </h3>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Raw ultrasonic and sub-audible pressure waves are sampled at 44.1 kHz. An on-device 1D-Convolutional Neural Network isolates sediment buildup profiles (silt, plastic debris, industrial slurry). When sediment occlusion exceeds 35% cross-sectional area, an automated desilting telemetry packet is triggered via NavIC-assisted edge modems to the municipal command center.
                  </p>
                </div>
              </div>
            </article>

            {/* SECTION B: Technical Approach & Algorithmic Rigor */}
            <article className="bg-white border border-[#c4c6cf] rounded-xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf] mb-4">
                <h2 className="text-base text-[#000f27] font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000f27] text-white flex items-center justify-center text-[11px] font-semibold">B</span>
                  Technical Approach &amp; Algorithmic Rigor
                </h2>
                <span className="text-[11px] font-semibold text-[#44474e] font-mono">Dossier Page 07-14</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#f2f4f6] rounded-lg border border-[#c4c6cf]">
                    <span className="text-[11px] font-semibold text-[#44474e] block uppercase">Microcontroller Core</span>
                    <span className="font-semibold text-[#000f27] text-sm">STM32H7 Dual-Core ARM Cortex-M7/M4</span>
                    <span className="text-[11px] text-[#44474e] block mt-1">480MHz execution with embedded DSP instructions</span>
                  </div>
                  <div className="p-3 bg-[#f2f4f6] rounded-lg border border-[#c4c6cf]">
                    <span className="text-[11px] font-semibold text-[#44474e] block uppercase">Positioning &amp; Telemetry</span>
                    <span className="font-semibold text-[#000f27] text-sm">NavIC L5/S-Band + NB-IoT / LoRaWAN</span>
                    <span className="text-[11px] text-[#44474e] block mt-1">Indigenous satellite geotagging with AES-256</span>
                  </div>
                </div>
                <p className="text-sm text-[#191c1e] leading-relaxed">
                  Mathematical modeling computes fluid-conduit acoustic resonance damping:
                </p>
                <div className="bg-[#e7e8ea] p-3 rounded font-mono text-xs text-[#000f27] text-center">
                  f_res = (v_sound / 2L) * sqrt(1 - (α_sediment / A_conduit)^1.85)
                </div>
                <p className="text-xs text-[#44474e]">
                  The applicant has submitted raw spectral calibration logs verifying 94.2% sensitivity against simulated monsoon storm flows at the IIT Delhi Hydraulics Test Flume facility.
                </p>
              </div>
            </article>

            {/* SECTION C: Implementation Milestones */}
            <article className="bg-white border border-[#c4c6cf] rounded-xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf] mb-4">
                <h2 className="text-base text-[#000f27] font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000f27] text-white flex items-center justify-center text-[11px] font-semibold">C</span>
                  Implementation Milestones &amp; Verification
                </h2>
                <span className="text-[11px] font-semibold text-[#44474e] font-mono">Dossier Page 15-22</span>
              </div>
              <div className="relative pl-6 border-l-2 border-[#c4c6cf] space-y-6">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#000f27] ring-4 ring-white"></span>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-[#000f27] text-sm">Stage 1: Calibration &amp; Baseline Mapping</h4>
                    <span className="text-[11px] font-semibold text-[#44474e] font-mono">Weeks 1–4</span>
                  </div>
                  <p className="text-xs text-[#44474e] mt-1">
                    Acoustic baseline profiling across 40 critical manholes along Gurugram Golf Course Extension and Subhash Chowk drains.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#000f27] ring-4 ring-white"></span>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-[#000f27] text-sm">Stage 2: Mesh Deployment &amp; ICCC Integration</h4>
                    <span className="text-[11px] font-semibold text-[#44474e] font-mono">Weeks 5–10</span>
                  </div>
                  <p className="text-xs text-[#44474e] mt-1">
                    Turnkey installation of 120 IP68 sensor nodes; live publish/subscribe stream integrated directly into the GMDA / MCG Integrated Command and Control Centre.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#cea62c] ring-4 ring-white"></span>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-[#000f27] text-sm">Stage 3: Monsoon Real-World Stress Test</h4>
                    <span className="text-[11px] font-semibold text-[#44474e] font-mono">Weeks 11–16</span>
                  </div>
                  <p className="text-xs text-[#44474e] mt-1">
                    Statutory evaluation under heavy precipitation events (&gt;60mm/hr) to validate false-positive rates below 3.5%.
                  </p>
                </div>
              </div>
            </article>

            {/* SECTION D: Commercials */}
            <article className="bg-white border border-[#c4c6cf] rounded-xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf] mb-4">
                <h2 className="text-base text-[#000f27] font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000f27] text-white flex items-center justify-center text-[11px] font-semibold">D</span>
                  Commercials &amp; Normalised Cost Bands
                </h2>
                <span className="text-[11px] font-semibold text-[#44474e] font-mono">Dossier Page 23-28</span>
              </div>
              <div className="bg-[#f2f4f6] p-4 rounded-lg border border-[#c4c6cf] mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase text-[#44474e] font-semibold">Statutory Procurement Band</span>
                  <span className="bg-[#e7e8ea] px-2 py-0.5 rounded text-[11px] font-bold text-[#000f27]">Tier-2 Capital Outlay (₹25L – ₹50L)</span>
                </div>
                <p className="text-xs text-[#44474e]">
                  Commercial proposals are normalized into relative allocation bands under GFR 149 statutory provisions. Vendor bank balance, turnover, and quotes are obscured to eliminate price bias during technical scoring.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white border border-[#c4c6cf] rounded-lg">
                  <span className="text-[11px] font-semibold text-[#44474e] block">Equipment Allocation</span>
                  <span className="text-xl font-bold text-[#000f27]">44.4%</span>
                  <span className="text-[11px] text-[#44474e] block mt-0.5">Sensors &amp; Solar</span>
                </div>
                <div className="p-3 bg-white border border-[#c4c6cf] rounded-lg">
                  <span className="text-[11px] font-semibold text-[#44474e] block">Telemetry &amp; Cloud</span>
                  <span className="text-xl font-bold text-[#000f27]">22.8%</span>
                  <span className="text-[11px] text-[#44474e] block mt-0.5">NavIC &amp; LoRaWAN</span>
                </div>
                <div className="p-3 bg-white border border-[#c4c6cf] rounded-lg">
                  <span className="text-[11px] font-semibold text-[#44474e] block">Deployment &amp; QA</span>
                  <span className="text-xl font-bold text-[#000f27]">32.8%</span>
                  <span className="text-[11px] text-[#44474e] block mt-0.5">Escrow Tranches</span>
                </div>
              </div>
            </article>

            {/* ATTACHED DOCUMENTS STRIP */}
            <div className="bg-white border border-[#c4c6cf] rounded-xl p-5">
              <h3 className="text-[13px] text-[#000f27] uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">attachment</span>
                Attached Anonymized Schematics &amp; Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Document 1 */}
                <div className="border border-[#c4c6cf] hover:border-[#000f27] p-3 rounded-lg flex flex-col justify-between transition-colors bg-[#f2f4f6]/40">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#000f27] text-[24px]">picture_as_pdf</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#000f27] truncate">Sensor_Hardware_Arch.pdf</div>
                      <span className="text-[11px] font-semibold text-[#44474e] block">4.2 MB • Redacted</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#c4c6cf]/60">
                    <span className="text-[11px] font-semibold text-[#755b00] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> STQC Hash
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleDownloadDossier('Sensor_Hardware_Arch.pdf')}
                      className="text-[#000f27] text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
                    >
                      Preview <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                </div>

                {/* Document 2 */}
                <div className="border border-[#c4c6cf] hover:border-[#000f27] p-3 rounded-lg flex flex-col justify-between transition-colors bg-[#f2f4f6]/40">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#000f27] text-[24px]">image</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#000f27] truncate">Topology_Gurugram.png</div>
                      <span className="text-[11px] font-semibold text-[#44474e] block">2.8 MB • Anonymized</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#c4c6cf]/60">
                    <span className="text-[11px] font-semibold text-[#755b00] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> GIS Verified
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleDownloadDossier('Topology_Gurugram.pdf')}
                      className="text-[#000f27] text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
                    >
                      Preview <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                </div>

                {/* Document 3 */}
                <div className="border border-[#c4c6cf] hover:border-[#000f27] p-3 rounded-lg flex flex-col justify-between transition-colors bg-[#f2f4f6]/40">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#000f27] text-[24px]">description</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#000f27] truncate">STQC_Compliance.pdf</div>
                      <span className="text-[11px] font-semibold text-[#44474e] block">1.1 MB • Test Bench</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#c4c6cf]/60">
                    <span className="text-[11px] font-semibold text-[#755b00] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Lab Certified
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleDownloadDossier('STQC_Compliance.pdf')}
                      className="text-[#000f27] text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
                    >
                      Preview <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 5 COLUMNS (Sticky Scoring Panel) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 shadow-xs">
              <div className="pb-3 border-b border-[#c4c6cf] flex items-center justify-between">
                <div>
                  <h2 className="text-base text-[#000f27] font-bold">Independent Technical Rubric</h2>
                  <span className="text-[11px] font-semibold text-[#44474e] font-mono">GFR Rule 149(v) Compliance</span>
                </div>
                <span className="material-symbols-outlined text-[#000f27] text-[22px]">fact_check</span>
              </div>

              {/* Live Score Badge Bar */}
              <div className="my-4 bg-[#0b2447] text-white p-4 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#e7e8ea] block">Weighted Aggregate Score</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-white">{aggregateScore}</span>
                    <span className="text-sm text-[#e7e8ea]">/ 10</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-[#cea62c] text-[#0b2447] px-2 py-0.5 rounded text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    {aggregateScore >= 7.5 ? "Meets Benchmark ≥ 7.5" : "Below Benchmark"}
                  </span>
                  <span className="text-[11px] font-semibold text-[#e7e8ea] block mt-1">Qualifies for Stage 3 Pilot</span>
                </div>
              </div>

              {/* 5 EVALUATION CRITERIA FORM */}
              <form onSubmit={handleSubmitEvaluation} className="space-y-4">
                
                {/* Criterion 1 */}
                <div className="border-b border-[#c4c6cf]/70 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">1. Technical Approach</label>
                    <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-1.5 py-0.5 rounded">Weight: 30%</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 my-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleScoreChange('technicalApproach', num)}
                        className={`py-1 text-[11px] font-semibold rounded border transition-colors cursor-pointer ${
                          scores.technicalApproach === num
                            ? 'border-[#000f27] bg-[#000f27] text-white font-bold'
                            : 'border-[#c4c6cf] bg-white hover:bg-[#f2f4f6] text-[#191c1e]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={notes.technicalApproach}
                    onChange={(e) => handleNoteChange('technicalApproach', e.target.value)}
                    className="w-full text-xs h-8 px-2 border border-[#c4c6cf] rounded bg-[#f2f4f6] text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                  />
                </div>

                {/* Criterion 2 */}
                <div className="border-b border-[#c4c6cf]/70 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">2. Feasibility &amp; Deployment</label>
                    <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-1.5 py-0.5 rounded">Weight: 25%</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 my-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleScoreChange('feasibility', num)}
                        className={`py-1 text-[11px] font-semibold rounded border transition-colors cursor-pointer ${
                          scores.feasibility === num
                            ? 'border-[#000f27] bg-[#000f27] text-white font-bold'
                            : 'border-[#c4c6cf] bg-white hover:bg-[#f2f4f6] text-[#191c1e]'
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
                    className="w-full text-xs h-8 px-2 border border-[#c4c6cf] rounded bg-[#f2f4f6] text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                  />
                </div>

                {/* Criterion 3 */}
                <div className="border-b border-[#c4c6cf]/70 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">3. Cost Efficiency</label>
                    <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-1.5 py-0.5 rounded">Weight: 20%</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 my-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleScoreChange('costEfficiency', num)}
                        className={`py-1 text-[11px] font-semibold rounded border transition-colors cursor-pointer ${
                          scores.costEfficiency === num
                            ? 'border-[#000f27] bg-[#000f27] text-white font-bold'
                            : 'border-[#c4c6cf] bg-white hover:bg-[#f2f4f6] text-[#191c1e]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={notes.costEfficiency}
                    onChange={(e) => handleNoteChange('costEfficiency', e.target.value)}
                    className="w-full text-xs h-8 px-2 border border-[#c4c6cf] rounded bg-[#f2f4f6] text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                  />
                </div>

                {/* Criterion 4 */}
                <div className="border-b border-[#c4c6cf]/70 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">4. Team Capability (Patents &amp; Specs)</label>
                    <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-1.5 py-0.5 rounded">Weight: 15%</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 my-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleScoreChange('teamCapability', num)}
                        className={`py-1 text-[11px] font-semibold rounded border transition-colors cursor-pointer ${
                          scores.teamCapability === num
                            ? 'border-[#000f27] bg-[#000f27] text-white font-bold'
                            : 'border-[#c4c6cf] bg-white hover:bg-[#f2f4f6] text-[#191c1e]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={notes.teamCapability}
                    onChange={(e) => handleNoteChange('teamCapability', e.target.value)}
                    className="w-full text-xs h-8 px-2 border border-[#c4c6cf] rounded bg-[#f2f4f6] text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                  />
                </div>

                {/* Criterion 5 */}
                <div className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">5. Municipal Interoperability</label>
                    <span className="bg-[#e7e8ea] text-[#44474e] text-[11px] font-semibold px-1.5 py-0.5 rounded">Weight: 10%</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 my-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleScoreChange('interoperability', num)}
                        className={`py-1 text-[11px] font-semibold rounded border transition-colors cursor-pointer ${
                          scores.interoperability === num
                            ? 'border-[#000f27] bg-[#000f27] text-white font-bold'
                            : 'border-[#c4c6cf] bg-white hover:bg-[#f2f4f6] text-[#191c1e]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={notes.interoperability}
                    onChange={(e) => handleNoteChange('interoperability', e.target.value)}
                    className="w-full text-xs h-8 px-2 border border-[#c4c6cf] rounded bg-[#f2f4f6] text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                  />
                </div>

                {/* Statutory Justification Textarea */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#000f27]">Statutory Justification &amp; Evaluation Summary *</label>
                    <span className="text-[11px] font-semibold text-[#755b00]">142 / 100 characters minimum met</span>
                  </div>
                  <textarea
                    rows={3}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    className="w-full text-xs p-2.5 border border-[#c4c6cf] rounded-lg bg-white text-[#191c1e] focus:border-[#0b2447] focus:ring-0"
                    placeholder="State explicit audit findings..."
                    required
                  />
                </div>

                {/* Conflict of Interest Affirmation Checkbox */}
                <div className="bg-[#f2f4f6] p-3 rounded-lg border border-[#c4c6cf] flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="coi-declaration"
                    checked={coiDeclared}
                    onChange={(e) => setCoiDeclared(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#74777f] text-[#0b2447] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="coi-declaration" className="text-[11px] font-semibold text-[#191c1e] leading-tight select-none cursor-pointer">
                    <strong>Conflict of Interest Declaration:</strong> I solemnly declare that I have no personal, commercial, or consulting affiliation with the authors of this anonymised proposal or related patent holders.
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0b2447] text-white hover:bg-[#000f27] text-xs font-semibold h-10 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Submit Final Evaluation (e-Sign/DSC)
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => alert("Proposal Recommended.")}
                      className="w-full bg-white border border-[#000f27] text-[#000f27] hover:bg-[#f2f4f6] text-xs font-semibold h-9 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">bookmark</span>
                      Recommend
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Irregularity Flagged for Review.")}
                      className="w-full bg-white border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]/20 text-xs font-semibold h-9 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">flag</span>
                      Flag Irregularity
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM CONTROL BAR */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-[#c4c6cf] py-3 px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#000f27] text-sm">Proposal 3 of 8</span>
            <span className="text-[#c4c6cf]">|</span>
            <span className="text-[#44474e] text-xs hidden sm:inline">Municipal Corporation of Gurugram Sandbox Evaluation</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#44474e] hover:text-[#000f27] text-xs underline cursor-pointer">
              Skip / Abstain
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPreviousProposal}
                className="bg-white border border-[#c4c6cf] text-[#191c1e] hover:bg-[#f2f4f6] text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Previous
              </button>
              <button
                type="button"
                onClick={onNextProposal}
                className="bg-[#000f27] text-white hover:bg-[#0b2447] text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                Next Proposal
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#000f27] text-white border-t border-[#c4c6cf]">
        <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3 max-w-md">
            <div className="text-xl font-bold text-white">
              ProcurePilot
            </div>
            <p className="text-[#e1e2e4] text-xs leading-relaxed">
              National innovation procurement pipeline engineered under the Ministry of Electronics &amp; Information Technology, facilitating rapid statutory sandbox pilots for urban and public-sector challenges.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs font-semibold text-[#e1e2e4]">
            <a className="text-[#ffe08e] hover:underline" href="#framework">Blind Evaluation Framework</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#audit">Audit &amp; Compliance</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#gfr">General Financial Rules (GFR)</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#rfp">RFP Submission Portal</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#vigilance">Vigilance Manual</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#terms">Terms of Service</a>
            <a className="hover:text-[#ffe08e] transition-colors" href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}