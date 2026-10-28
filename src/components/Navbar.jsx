import React, { useState, useEffect } from 'react';

export default function Navbar({ onNavigate }) {
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUser(true);
      setUserRole(role);
    } else {
      setUser(false);
      setUserRole(null);
    }
  }, []);

  const handleHowItWorksClick = () => {
    if (onNavigate) {
      onNavigate('landing');
    }
    setTimeout(() => {
      const element = document.getElementById('how-it-works-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setUserRole(null);
    if (onNavigate) {
      onNavigate('landing');
    } else {
      window.location.href = '#/landing';
    }
  };

  const handleGovPortalClick = () => {
    const role = localStorage.getItem('userRole');
    if (role !== 'government') {
      alert("Access Denied: Government Portal is strictly restricted to verified Government officials.");
      return;
    }
    if (onNavigate) {
      onNavigate('government-portal');
    } else {
      window.location.href = '#/government-portal';
    }
  };

  const handleExpertsClick = () => {
    // Set expert role and open using query param to prevent blank screen in new tab
    localStorage.setItem('userRole', 'expert');
    const expertUrl = `${window.location.origin}${window.location.pathname}?role=expert`;
    window.open(expertUrl, '_blank');
  };

  const handleDashboardClick = () => {
    let targetPage = 'startup-profile';
    if (userRole === 'government') targetPage = 'government-portal';
    else if (userRole === 'expert') targetPage = 'dashboard';

    if (onNavigate) {
      onNavigate(targetPage);
    } else {
      window.location.href = `#/${targetPage}`;
    }
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 shadow-xs">
        <div className="w-full px-6 md:px-12 h-20 flex justify-between items-center">
          
          {/* Brand & Custom Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate ? onNavigate('landing') : (window.location.href = '#/landing')}
          >
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
                Launch. Pilot. Scale.
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#333b4c]">
            <button type="button" onClick={handleHowItWorksClick} className="hover:text-[#0b2447] transition-colors cursor-pointer">How it Works</button>
            <button type="button" onClick={() => onNavigate ? onNavigate('challenges') : (window.location.href = '#/challenges')} className="hover:text-[#0b2447] transition-colors cursor-pointer">Challenges</button>
            
            <button type="button" onClick={handleGovPortalClick} className="hover:text-[#0b2447] transition-colors cursor-pointer">For Government</button>

            <button type="button" onClick={() => onNavigate ? onNavigate('startup-profile') : (window.location.href = '#/startup-profile')} className="hover:text-[#0b2447] transition-colors cursor-pointer">For Startups</button>
            
            {/* For Experts opens in a new tab via handleExpertsClick */}
            <button type="button" onClick={handleExpertsClick} className="hover:text-[#0b2447] transition-colors cursor-pointer flex items-center gap-1">
              For Experts <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>

            <button type="button" onClick={() => setShowResourcesModal(true)} className="hover:text-[#0b2447] transition-colors cursor-pointer">Resources</button>
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center space-x-5">
            <button type="button" className="text-[#44474e] hover:text-[#000f27] transition-colors flex items-center cursor-pointer">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <button 
                  type="button" 
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-2 px-3.5 py-2 bg-[#0b2447]/10 border border-[#0b2447]/20 rounded-xl hover:bg-[#0b2447]/20 transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0b2447]">📊 Dashboard</span>
                </button>

                <button 
                  type="button" 
                  onClick={handleLogout}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors cursor-pointer px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('signin') : (window.location.href = '#/signin')}
                  className="text-sm font-semibold text-[#0b2447] hover:text-black transition-colors cursor-pointer"
                >
                  Login
                </button>

                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('register-role') : (window.location.href = '#/register-role')}
                  className="px-6 py-2.5 bg-[#0b2447] text-white font-semibold text-xs rounded-lg hover:bg-[#00172e] transition-colors shadow-xs cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>

        </div>
      </header>

      {/* Resources Modal Popup */}
      {showResourcesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#000f27]">GovTech Resources &amp; Guidelines</h3>
              <button 
                onClick={() => setShowResourcesModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-[#44474e]">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0b2447] cursor-pointer">
                <strong className="text-[#000f27] block text-sm mb-1">General Financial Rules (GFR) 149(v) Manual</strong>
                Official documentation on direct public procurement exemptions for DPIIT-recognized startups.
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0b2447] cursor-pointer">
                <strong className="text-[#000f27] block text-sm mb-1">Double-Blind Evaluation Framework</strong>
                Detailed guidelines on how academic juries score proposals without vendor bias.
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0b2447] cursor-pointer">
                <strong className="text-[#000f27] block text-sm mb-1">Escrow &amp; Milestone Fund Release SOP</strong>
                Standard operating procedures for milestone-linked tranche disbursements.
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowResourcesModal(false)}
                className="px-4 py-2 bg-[#0b2447] text-white text-xs font-bold rounded-lg hover:bg-blue-900 cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}