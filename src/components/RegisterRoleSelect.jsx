import React from 'react';

const RegisterRoleSelect = ({ onRoleSelect, onNavigate }) => {
  const handleSelect = (role) => {
    // Role ko localStorage me save kar lo
    localStorage.setItem('userRole', role);
    
    // Agar App.jsx se onRoleSelect function aaya hai toh use call karo, warna direct navigate karo
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join ProcurePilot
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please select your registration category to proceed
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-4">
          {/* Startup Card */}
          <div 
            onClick={() => handleSelect('startup')}
            className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 hover:border-orange-500 cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              🚀
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Startup / Founder</h3>
            <p className="text-sm text-gray-600">
              Register to solve government challenges, pitch innovations, and secure public procurement contracts.
            </p>
          </div>

          {/* Government Official Card */}
          <div 
            onClick={() => handleSelect('government')}
            className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 hover:border-blue-500 cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              🏛️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Government Official</h3>
            <p className="text-sm text-gray-600">
              Post challenges, evaluate verified Indian startups, and manage GFR 2017 compliant procurements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoleSelect;