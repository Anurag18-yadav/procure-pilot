import React from 'react';
import Navbar from './Navbar';

export default function LandingPage({ onNavigate, onLogin, onRegister, onExploreChallenges }) {
  
  const handleExploreChallengesClick = () => {
    const userRole = localStorage.getItem('userRole');
    const uniqueId = localStorage.getItem('startupUniqueId') || localStorage.getItem('blindEvalId');

    // Strict check: Agar user logged-in nahi hai, toh challenge explore block karke login page par bhejo
    if (!userRole || !uniqueId) {
      alert("Please register or sign in first to explore government challenges and submit proposals!");
      if (onNavigate) {
        onNavigate('signin');
      } else {
        window.location.hash = 'signin';
      }
      return;
    }

    // Agar logged-in hai toh challenges page par jaane do
    if (onExploreChallenges) {
      onExploreChallenges();
    } else if (onNavigate) {
      onNavigate('challenges');
    } else {
      window.location.hash = 'challenges';
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans selection:bg-[#cadaff]">
      <Navbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 bg-[#fef3c5] text-[#713b00] text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-[#fde047]/60">
          <span className="w-2 h-2 rounded-full bg-[#ca8a04]"></span>
          PUBLIC PROCUREMENT INNOVATION PLATFORM • GFR 2017 COMPLIANT
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#000f27] tracking-tight max-w-4xl leading-tight mb-6">
          Government challenges, solved by the right startups — not just the biggest ones.
        </h1>

        <p className="text-base md:text-lg text-[#44474e] max-w-2xl mb-10 leading-relaxed">
          ProcurePilot connects verified Indian startups with real government problem statements through blind, expert-led evaluation, secure institutional escrow, and monitored pilots.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button 
            type="button"
            onClick={handleExploreChallengesClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0b2447] text-white font-bold text-sm rounded-xl hover:bg-[#00172e] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            Explore Challenges <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* IMPACT / METRICS SECTION */}
      <section className="w-full bg-white py-12 border-t border-b border-[#c4c6cf]/50 px-6">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0b2447] block">₹42 Cr+</span>
            <span className="text-xs font-semibold text-[#44474e] uppercase tracking-wider mt-1 block">Escrow RxF Allocated</span>
          </div>
          <div className="p-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0b2447] block">140+</span>
            <span className="text-xs font-semibold text-[#44474e] uppercase tracking-wider mt-1 block">Challenges Solved</span>
          </div>
          <div className="p-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0b2447] block">650+</span>
            <span className="text-xs font-semibold text-[#44474e] uppercase tracking-wider mt-1 block">Startups Onboarded</span>
          </div>
          <div className="p-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0b2447] block">98.4%</span>
            <span className="text-xs font-semibold text-[#44474e] uppercase tracking-wider mt-1 block">GFR Compliance Rate</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="w-full bg-[#f8f9fb] py-20 px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0b2447] bg-[#d7e3ff] px-3 py-1 rounded-full">
              Platform Workflow
            </span>
            <h2 className="text-3xl font-bold text-[#000f27] mt-3">How ProcurePilot Works</h2>
            <p className="text-sm text-[#44474e] mt-2">
              Following standard PRD and GFR institutional guidelines, our 4-stage pipeline ensures total transparency and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#c4c6cf] shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#0b2447] text-white font-bold flex items-center justify-center text-base mb-4">1</span>
              <h3 className="font-bold text-[#000f27] text-base mb-2">Problem Publication</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Government departments and ULBs publish verified municipal or technical challenges on the platform portal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#c4c6cf] shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#0b2447] text-white font-bold flex items-center justify-center text-base mb-4">2</span>
              <h3 className="font-bold text-[#000f27] text-base mb-2">Blind Evaluation</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Expert academic juries evaluate proposals under GFR 149(v) guidelines without knowing startup vendor identities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#c4c6cf] shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#0b2447] text-white font-bold flex items-center justify-center text-base mb-4">3</span>
              <h3 className="font-bold text-[#000f27] text-base mb-2">Secure Sandbox Escrow</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Selected startups are allocated sandbox testing environments and milestone-linked tranche funding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#c4c6cf] shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#0b2447] text-white font-bold flex items-center justify-center text-base mb-4">4</span>
              <h3 className="font-bold text-[#000f27] text-base mb-2">Monitored Pilot &amp; Scale</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Successful stress-tested pilots directly qualify for government direct procurement contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#000f27] text-white border-t border-[#c4c6cf]">
        <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3 max-w-md">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <span>Procure</span><span className="text-[#e6ac00]">Pilot</span>
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
        <div className="w-full max-w-7xl mx-auto px-6 py-4 border-t border-white/10 text-center text-xs text-gray-400">
          &copy; 2026 ProcurePilot India. All statutory rights reserved under MeitY Sandbox Framework.
        </div>
      </footer>
    </div>
  );
}