import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DomainExpertDashboard from './components/DomainExpertDashboard';
import SignInPage from './components/SignInPage';
import ChallengesPage from './components/ChallengesPage';
import RegisterRoleSelect from './components/RegisterRoleSelect'; // Role Selection Component
import RegisterStep1 from './components/RegisterStep1'; // Basic Info & Credentials
import RegisterStep2 from './components/RegisterStep2'; // Sector Selection Cards
import RegisterStep3 from './components/RegisterStep3'; // DPIIT Verification & PP-ID
import GovRegisterStep2 from './components/GovRegisterStep2'; // Government Department Form
import SubmitProposalStep1 from './components/SubmitProposalStep1';
import SubmitProposalStep2 from './components/SubmitProposalStep2';
import GovernmentPortal from './components/GovernmentPortal';
import StartupProfilePage from './components/StartupProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  
  // FIX: localStorage se current role uthao taki refresh hone par bhi role lost na ho
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('userRole') || 'startup';
  });

  // Simple Hash-based routing sync so browser back/forward buttons work smoothly
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
          onSignInSuccess={() => navigateTo('dashboard')}
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

      {/* STEP 1: Role Selection Page (Startup vs Government) */}
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

      {/* STEP 2: Basic Credentials & Form (RegisterStep1) */}
      {currentPage === 'register-1' && (
        <RegisterStep1 
          onNext={() => {
            navigateTo('register-2');
          }}
          onNavigate={navigateTo}
        />
      )}

      {/* STEP 3: Conditional Branching based on Role (Government vs Startup Sector Cards) */}
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
            onComplete={() => {
              // Startup sector select hone ke baad DPIIT verification step par bhejo
              navigateTo('register-3');
            }}
            onBack={() => navigateTo('register-1')}
            onNavigate={navigateTo}
          />
        )
      )}

      {/* STEP 4: DPIIT Verification & Unique PP-ID Generation (Startup Only) */}
      {currentPage === 'register-3' && (
        <RegisterStep3 
          onComplete={() => {
            alert("Startup Registration Completed & Verified under MeitY Sandbox!");
            navigateTo('landing');
          }}
          onBack={() => navigateTo('register-2')}
        />
      )}

      {currentPage === 'proposal-1' && (
        <SubmitProposalStep1 
          onNext={() => navigateTo('proposal-2')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'proposal-2' && (
        <SubmitProposalStep2 
          onSubmit={() => {
            alert("Proposal submitted successfully into Blind Evaluation Escrow queue!");
            navigateTo('dashboard');
          }}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
}