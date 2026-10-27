import React, { useState } from 'react';

const RegisterRoleSelect = ({ onRoleSelect, onNavigate }) => {
  const [loadingRole, setLoadingRole] = useState(null);

  const handleSelect = (role) => {
    setLoadingRole(role);
    // Save role to localStorage immediately
    localStorage.setItem('userRole', role);
    
    // Trigger navigation instantly for smooth UX
    if (onRoleSelect) {
      onRoleSelect(role);
    } else if (onNavigate) {
      onNavigate('register-1');
    } else {
      window.location.hash = 'register-1';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-xs font-bold tracking-wider text-[#0b2447] uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          STEP 1: ROLE SELECTION
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Join ProcurePilot
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please select your registration category to proceed with the sandbox onboarding.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-4">
          
          {/* Startup Card */}
          <div 
            onClick={() => handleSelect('startup')}
            className={`bg-white p-6 rounded-2xl shadow-sm border-2 cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col items-center text-center ${
              loadingRole === 'startup' ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-500' : 'border-orange-100 hover:border-orange-500 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-xs">
              🚀
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Startup / Founder</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Register to solve government challenges, pitch innovations, and secure public procurement contracts under GFR 149(v).
            </p>
            <span className="mt-4 text-xs font-semibold text-orange-600">
              Select Startup &rarr;
            </span>
          </div>

          {/* Government Official Card */}
          <div 
            onClick={() => handleSelect('government')}
            className={`bg-white p-6 rounded-2xl shadow-sm border-2 cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col items-center text-center ${
              loadingRole === 'government' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-blue-100 hover:border-blue-500 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-xs">
              🏛️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Government Official</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Post challenges, evaluate verified Indian startups, and manage GFR 2017 compliant public procurements.
            </p>
            <span className="mt-4 text-xs font-semibold text-blue-600">
              Select Government &rarr;
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterRoleSelect;