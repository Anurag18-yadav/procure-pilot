import React, { useState } from 'react';

const SignInPage = ({ onSignInSuccess, onRegisterClick, onNavigate }) => {
  const [loginRole, setLoginRole] = useState('startup'); // 'startup' or 'government'
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.identifier || !credentials.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (loginRole === 'government') {
      const emailLower = credentials.identifier.trim().toLowerCase();
      if (!emailLower.endsWith('.gov.in') && !emailLower.endsWith('.nic.in')) {
        setError('Government officers must sign in using an official email ending with .gov.in or .nic.in.');
        return;
      }
      localStorage.setItem('userRole', 'government');
      // Pass the correct target page for government
      if (onSignInSuccess) {
        onSignInSuccess('government-portal');
      } else if (onNavigate) {
        onNavigate('government-portal');
      }
    } else {
      localStorage.setItem('userRole', 'startup');
      // Pass the correct target page for startup
      if (onSignInSuccess) {
        onSignInSuccess('startup-profile');
      } else if (onNavigate) {
        onNavigate('startup-profile');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-xs font-bold tracking-wider text-[#0b2447] uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          SECURE PORTAL SIGN IN
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Sign In to ProcurePilot
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Select your portal role and enter your authorized credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Role Selection Dropdown / Toggle Tabs */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Sign-In Role</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => { setLoginRole('startup'); setError(''); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  loginRole === 'startup' 
                    ? 'bg-white text-orange-600 shadow-xs border border-orange-200' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🚀 Startup / Founder
              </button>
              <button
                type="button"
                onClick={() => { setLoginRole('government'); setError(''); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  loginRole === 'government' 
                    ? 'bg-white text-blue-600 shadow-xs border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🏛️ Government Official
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 text-red-700 text-xs rounded-md font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {loginRole === 'government' ? 'Official Government Email (.gov.in / .nic.in)' : 'Startup Email Address or PP-ID'}
              </label>
              <input
                type="text"
                name="identifier"
                value={credentials.identifier}
                onChange={handleChange}
                required
                placeholder={loginRole === 'government' ? 'officer.name@gov.in' : 'startup@roadtechlabs.in or PP-ID'}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Secure Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white transition-all cursor-pointer ${
                  loginRole === 'government' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {loginRole === 'government' ? 'Sign In as Government Official \u2192' : 'Sign In as Startup \u2192'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onRegisterClick ? onRegisterClick() : onNavigate('register-role')}
              className="font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Register here
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;