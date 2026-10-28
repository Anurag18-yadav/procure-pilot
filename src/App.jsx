import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DomainExpertAIPreScreen from './components/DomainExpertAIPreScreen'; // Step 1: AI Pre-Screening Component
import DomainExpertHumanReview from './components/DomainExpertHumanReview'; // Step 2: Human Expert Final Review Component
import DomainExpertDashboard from './components/DomainExpertDashboard';      // Legacy Dashboard (if needed)
import SignInPage from './components/SignInPage';
import ChallengesPage from './components/ChallengesPage';
import RegisterRoleSelect from './components/RegisterRoleSelect';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import RegisterStep3 from './components/RegisterStep3';
import GovRegisterStep2 from './components/GovRegisterStep2';
import ExpertRegister from './components/ExpertRegister';
import SubmitProposalStep1 from './components/SubmitProposalStep1';
import SubmitProposalStep2 from './components/SubmitProposalStep2';
import SubmitProposalStep3 from './components/SubmitProposalStep3';
import SubmitProposalStep4 from './components/SubmitProposalStep4';
import SubmitProposalStep5 from './components/SubmitProposalStep5';
import GovernmentPortal from './components/GovernmentPortal';
import StartupProfilePage from './components/StartupProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Check if opened via query parameter in a new tab
    const params = new URLSearchParams(window.location.search);
    if (params.get('role') === 'expert') {
      localStorage.setItem('userRole', 'expert');
      return 'dashboard';
    }
    const initialHash = window.location.hash.replace('#', '');
    return initialHash || 'landing';
  });
  
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('tempRole') || localStorage.getItem('userRole') || 'startup';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        let currentRole = localStorage.getItem('userRole') || '';

        if ((hash === 'dashboard' || hash === 'human-review') && !currentRole) {
          localStorage.setItem('userRole', 'expert');
          currentRole = 'expert';
        }

        // Allow startup profile & proposal steps if hash starts with proposal- or is startup-profile
        if ((hash === 'startup-profile' || hash.startsWith('proposal-')) && !currentRole) {
          localStorage.setItem('userRole', 'startup');
          currentRole = 'startup';
        }

        if (hash === 'government-portal' && currentRole !== 'government') {
          alert("Access Denied: Government Portal is restricted to official government accounts.");
          window.location.hash = 'landing';
          setCurrentPage('landing');
          return;
        }

        if ((hash === 'dashboard' || hash === 'human-review') && currentRole !== 'expert' && currentRole !== 'government') {
          alert("Access Denied: Expert Panel / Dashboard is restricted to domain experts.");
          window.location.hash = 'landing';
          setCurrentPage('landing');
          return;
        }

        if (hash === 'startup-profile' && currentRole !== 'startup' && currentRole !== 'government') {
          alert("Access Denied: Startup Profile is restricted to startup accounts.");
          window.location.hash = 'landing';
          setCurrentPage('landing');
          return;
        }

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

      {/* STEP 1: AI Pre-Screening Page */}
      {currentPage === 'dashboard' && (
        <DomainExpertAIPreScreen 
          onProceedToHumanReview={() => navigateTo('human-review')}
          onNavigate={navigateTo}
        />
      )}

      {/* STEP 2: Human Expert Final Review Page */}
      {currentPage === 'human-review' && (
        <DomainExpertHumanReview 
          onNavigate={navigateTo}
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
            const role = localStorage.getItem('userRole');
            let defaultTarget = 'startup-profile';
            if (role === 'government') defaultTarget = 'government-portal';
            else if (role === 'expert') defaultTarget = 'dashboard';

            navigateTo(targetPage || defaultTarget);
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
            localStorage.setItem('tempRole', role);
            localStorage.removeItem('userRole'); 
            navigateTo('register-1');
          }}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'register-1' && (
        selectedRole === 'government' ? (
          <GovRegisterStep2 
            onNext={() => {
              const role = localStorage.getItem('tempRole') || 'government';
              localStorage.setItem('userRole', role);
              localStorage.removeItem('tempRole');
              alert("Government Department Sandbox Registration Completed Successfully!");
              navigateTo('government-portal');
            }}
            onBack={() => navigateTo('register-role')}
          />
        ) : selectedRole === 'expert' ? (
          <ExpertRegister 
            onComplete={() => {
              const role = localStorage.getItem('tempRole') || 'expert';
              localStorage.setItem('userRole', role);
              localStorage.removeItem('tempRole');
              alert("Domain Expert Registration Completed & Verified!");
              navigateTo('dashboard');
            }}
            onBack={() => navigateTo('register-role')}
          />
        ) : (
          <RegisterStep1 
            onNext={() => navigateTo('register-2')}
            onNavigate={navigateTo}
          />
        )
      )}

      {currentPage === 'register-2' && (
        <RegisterStep2 
          onComplete={() => navigateTo('register-3')}
          onBack={() => navigateTo('register-1')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'register-3' && (
        <RegisterStep3 
          onComplete={() => {
            const role = localStorage.getItem('tempRole') || 'startup';
            localStorage.setItem('userRole', role);
            localStorage.removeItem('tempRole');
            alert("Startup Registration Completed & Verified under MeitY Sandbox!");
            navigateTo('startup-profile');
          }}
          onBack={() => navigateTo('register-2')}
        />
      )}

      {/* PROPOSAL SUBMISSION PIPELINE */}
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
        <SubmitProposalStep4 
          onNext={() => navigateTo('proposal-5')}
          onBack={() => navigateTo('proposal-3')}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'proposal-5' && (
        <SubmitProposalStep5 
          onSubmit={() => {
            alert("Proposal submitted successfully into Blind Evaluation Escrow queue!");
            navigateTo('dashboard');
          }}
          onBack={() => navigateTo('proposal-4')}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
}