import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DomainExpertDashboard from './components/DomainExpertDashboard';
import SignInPage from './components/SignInPage';
import ChallengesPage from './components/ChallengesPage';
import RegisterRoleSelect from './components/RegisterRoleSelect';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import RegisterStep3 from './components/RegisterStep3';
import GovRegisterStep2 from './components/GovRegisterStep2';
import SubmitProposalStep1 from './components/SubmitProposalStep1';
import SubmitProposalStep2 from './components/SubmitProposalStep2';
import SubmitProposalStep3 from './components/SubmitProposalStep3';
import GovernmentPortal from './components/GovernmentPortal';
import StartupProfilePage from './components/StartupProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('userRole') || 'startup';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('landing');
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#191c1e] selection:bg-[#cadaff]">
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigate={navigateTo} 
          onExploreChallenges={() => navigateTo('challenges')}
          onRegister={() => navigateTo('register-role')}
        />
      )}

      {currentPage === 'dashboard' && (
        <DomainExpertDashboard 
          onPreviousProposal={() => alert("Showing previous anonymized proposal dossier.")}
          onNextProposal={() => alert("Loading next proposal dossier under GFR 149(v) guidelines.")}
        />
      )}

      {currentPage === 'government-portal' && (
        <GovernmentPortal onNavigate={navigateTo} />
      )}

      {currentPage === 'startup-profile' && (
        <StartupProfilePage onNavigate={navigateTo} />
      )}

      {currentPage === 'signin' && (
        <SignInPage 
          onSignInSuccess={(targetPage) => {
            navigateTo(targetPage || (localStorage.getItem('userRole') === 'government' ? 'government-portal' : 'startup-profile'));
          }}
          onRegisterClick={() => navigateTo('register-role')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'challenges' && (
        <ChallengesPage 
          onNavigate={navigateTo}
          onSubmitProposal={() => navigateTo('proposal-1')}
        />
      )}

      {currentPage === 'register-role' && (
        <RegisterRoleSelect 
          onRoleSelect={(role) => {
            setSelectedRole(role);
            localStorage.setItem('userRole', role);
            navigateTo('register-1');
          }}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'register-1' && (
        <RegisterStep1 
          onNext={() => navigateTo('register-2')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'register-2' && (
        selectedRole === 'government' ? (
          <GovRegisterStep2 
            onNext={() => {
              alert("Government Department Sandbox Registration Completed Successfully!");
              navigateTo('government-portal');
            }}
            onBack={() => navigateTo('register-1')}
          />
        ) : (
          <RegisterStep2 
            onComplete={() => navigateTo('register-3')}
            onBack={() => navigateTo('register-1')}
            onNavigate={navigateTo}
          />
        )
      )}

      {currentPage === 'register-3' && (
        <RegisterStep3 
          onComplete={() => {
            alert("Startup Registration Completed & Verified under MeitY Sandbox!");
            navigateTo('landing');
          }}
          onBack={() => navigateTo('register-2')}
        />
      )}

      {/* PROPOSAL SUBMISSION STEPS */}
      {currentPage === 'proposal-1' && (
        <SubmitProposalStep1 
          onNext={() => navigateTo('proposal-2')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'proposal-2' && (
        <SubmitProposalStep2 
          onNext={() => navigateTo('proposal-3')}
          onBack={() => navigateTo('proposal-1')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'proposal-3' && (
        <SubmitProposalStep3 
          onNext={() => navigateTo('proposal-4')}
          onBack={() => navigateTo('proposal-2')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'proposal-4' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-50">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Step 4: Commercials & Milestone Budgeting</h2>
          <p className="text-xs text-gray-600 mb-6">This step is currently under construction.</p>
          <div className="flex gap-4">
            <button onClick={() => navigateTo('proposal-3')} className="px-4 py-2 bg-gray-200 rounded-xl text-xs font-bold cursor-pointer">Back to Step 3</button>
            <button onClick={() => navigateTo('proposal-5')} className="px-4 py-2 bg-[#0b2447] text-white rounded-xl text-xs font-bold cursor-pointer">Continue to Step 5</button>
          </div>
        </div>
      )}

      {currentPage === 'proposal-5' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-50">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Step 5: Review & Submit</h2>
          <p className="text-xs text-gray-600 mb-6">Final proposal review dossier and escrow submission.</p>
          <div className="flex gap-4">
            <button onClick={() => navigateTo('proposal-4')} className="px-4 py-2 bg-gray-200 rounded-xl text-xs font-bold cursor-pointer">Back to Step 4</button>
            <button onClick={() => {
              alert("Proposal submitted successfully into Blind Evaluation Escrow queue!");
              navigateTo('dashboard');
            }} className="px-4 py-2 bg-green-700 text-white rounded-xl text-xs font-bold cursor-pointer">Submit Proposal</button>
          </div>
        </div>
      )}
    </div>
  );
}