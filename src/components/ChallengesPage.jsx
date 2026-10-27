import React, { useState } from 'react';

export default function ChallengesPage({ onNavigate, onSubmitProposal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const challengesList = [
    {
      id: 'PRP-CH-044',
      title: 'AI-Powered Stormwater Drainage Clog Early-Detection System',
      department: 'Municipal Corporation of Gurugram',
      sector: 'Urban Infrastructure',
      budget: '₹45 Lakhs',
      deadline: '15 Nov 2026',
      status: 'Open for Proposals',
      applicants: 12
    },
    {
      id: 'PRP-CH-045',
      title: 'Automated Pothole & Road Surface Profiling using Edge AI',
      department: 'Ministry of Road Transport & Highways',
      sector: 'Transportation',
      budget: '₹60 Lakhs',
      deadline: '30 Nov 2026',
      status: 'Open for Proposals',
      applicants: 8
    },
    {
      id: 'PRP-CH-046',
      title: 'Real-time Air Quality Micro-Sensor Calibration Grid',
      department: 'Central Pollution Control Board (CPCB)',
      sector: 'Environment & Cleantech',
      budget: '₹35 Lakhs',
      deadline: '10 Dec 2026',
      status: 'Open for Proposals',
      applicants: 15
    },
    {
      id: 'PRP-CH-047',
      title: 'Multilingual AI Voice Bot for Citizen Grievance Redressal',
      department: 'MeitY Digital India Corporation',
      sector: 'GovTech & AI',
      budget: '₹50 Lakhs',
      deadline: '20 Dec 2026',
      status: 'Open for Proposals',
      applicants: 19
    }
  ];

  const filteredChallenges = challengesList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || item.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans antialiased flex flex-col">
      
      {/* NAVBAR */}
      <header className="bg-white border-b border-[#c4c6cf] sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
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
              <span className="text-[9px] font-semibold text-gray-400 uppercase -mt-1">Challenges Explorer</span>
            </div>
          </div>
          <div>
            <button 
              onClick={() => onNavigate('landing')}
              className="text-xs font-semibold text-gray-600 hover:text-[#0b2447] cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-8">
        
        {/* Header & Search */}
        <div className="bg-white border border-[#c4c6cf] rounded-2xl p-8 shadow-xs flex flex-col gap-6">
          <div className="max-w-2xl">
            <span className="bg-[#d7e3ff] text-[#0b2447] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Open Innovation RxF
            </span>
            <h1 className="text-3xl font-extrabold text-[#000f27] mt-3">Explore Government Problem Statements</h1>
            <p className="text-sm text-[#44474e] mt-2">
              Browse verified municipal and departmental challenges open for DPIIT-recognized startup sandbox proposals under GFR 149(v).
            </p>
          </div>

          {/* Search Bar & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t border-gray-100">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-lg">search</span>
              <input 
                type="text" 
                placeholder="Search by challenge ID, title, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#000f27] focus:outline-none focus:border-[#0b2447]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Urban Infrastructure', 'Transportation', 'Environment & Cleantech', 'GovTech & AI'].map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedSector === sector 
                      ? 'bg-[#0b2447] text-white shadow-xs' 
                      : 'bg-gray-100 text-[#44474e] hover:bg-gray-200'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges Grid with Empty State */}
        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChallenges.map((item) => (
              <div key={item.id} className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#0b2447] transition-all">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-bold bg-[#0b2447] text-white px-2.5 py-1 rounded-md">{item.id}</span>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">{item.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#000f27] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#44474e] font-medium mb-4">{item.department}</p>
                  
                  <div className="grid grid-cols-2 gap-4 py-3 my-3 border-t border-b border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block">Allocation Budget</span>
                      <span className="font-bold text-[#000f27]">{item.budget}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Submission Deadline</span>
                      <span className="font-bold text-[#000f27]">{item.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-gray-500">{item.applicants} Startups Applied</span>
                  <button 
                    type="button"
                    onClick={() => {
                      const proposalUrl = `${window.location.origin}${window.location.pathname}#proposal-1`;
                      window.open(proposalUrl, '_blank');
                    }}
                    className="px-4 py-2 bg-[#0b2447] text-white text-xs font-bold rounded-xl hover:bg-[#00172e] cursor-pointer flex items-center gap-1"
                  >
                    Apply Now <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white border border-[#c4c6cf] rounded-2xl p-12 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-gray-400">folder_off</span>
            <h3 className="text-base font-bold text-[#000f27]">No matching challenges found</h3>
            <p className="text-xs text-[#44474e] max-w-sm mx-auto">
              Try adjusting your search query or selecting a different sector filter to view available problem statements.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedSector('All'); }}
              className="mt-2 px-4 py-2 bg-[#0b2447] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

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