import React, { useState } from 'react';

const SignInPage = ({ onSignInSuccess, onRegisterClick, onNavigate }) => {
  const [loginRole, setLoginRole] = useState('startup'); // 'startup' or 'government'
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  
  // State for Forgot Password Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

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
      if (onSignInSuccess) {
        onSignInSuccess('government-portal');
      } else if (onNavigate) {
        onNavigate('government-portal');
      }
    } else {
      // Startup Database & Credential Verification
      const registeredStartups = JSON.parse(localStorage.getItem('registeredStartups') || '[]');
      const identifierVal = credentials.identifier.trim();
      const passwordVal = credentials.password;

      const foundStartup = registeredStartups.find(
        s => (s.email === identifierVal || s.uniqueId === identifierVal) && s.password === passwordVal
      );

      if (foundStartup) {
        localStorage.setItem('userRole', 'startup');
        localStorage.setItem('blindEvalId', foundStartup.uniqueId);
        if (onSignInSuccess) {
          onSignInSuccess('startup-profile');
        } else if (onNavigate) {
          onNavigate('startup-profile');
        }
      } else {
        setError('Invalid Unique ID / Email or Password. Please check your credentials or register first.');
      }
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotMessage('Please enter your registered email address.');
      return;
    }
    setForgotMessage('Password reset link has been successfully sent to your registered email address.');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotMessage('');
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8 relative">
      {/* Top Navbar Brand */}
      <div className="absolute top-6 left-8 flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#0b2447] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
          P
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">ProcurePilot</span>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Hero Panel */}
          <div className="md:col-span-5 bg-[#0b2447] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold tracking-wide uppercase border border-blue-700/50 mb-6">
                Enterprise Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Government challenges solved by the right startup, not just the biggest one.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    🎯
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Browse open challenges</h4>
                    <p className="text-[11px] text-slate-300">Discover enterprise requirements and submit tailored proposals.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    📊
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Track proposal status</h4>
                    <p className="text-[11px] text-slate-300">Monitor real-time evaluation metrics and review stages.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    🏛️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Follow pilot milestones</h4>
                    <p className="text-[11px] text-slate-300">Execute contract deliverables and track milestone disbursements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-slate-400 border-t border-slate-800 mt-6">
              Secure 256-bit Encrypted Connection
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-gray-900">Sign in to ProcurePilot</h3>
              <p className="text-xs text-gray-500 mt-1">Select your role and enter your credentials to access your workspace.</p>
            </div>

            {/* Role Toggle Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => { setLoginRole('startup'); setError(''); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  loginRole === 'startup' 
                    ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Startup
              </button>
              <button
                type="button"
                onClick={() => { setLoginRole('government'); setError(''); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  loginRole === 'government' 
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gov Official
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 text-red-700 text-xs rounded-md font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {loginRole === 'government' ? 'Official Government Email (.gov.in / .nic.in)' : 'Email address or Unique Blind ID'}
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  required
                  placeholder={loginRole === 'government' ? 'officer.name@gov.in' : 'name@company.com or BLIND-EVAL-XXXXXX'}
                  className="w-full border border-gray-300 rounded-xl shadow-xs p-2.5 text-xs focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => { setShowForgotModal(true); setForgotMessage(''); setForgotEmail(''); }}
                    className="text-xs font-medium text-amber-700 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
                  className="w-full border border-gray-300 rounded-xl shadow-xs p-2.5 text-xs focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-md text-xs font-bold text-white transition-all cursor-pointer ${
                    loginRole === 'government' ? 'bg-blue-800 hover:bg-blue-900' : 'bg-[#8d770c] hover:bg-[#745f06]'
                  }`}
                >
                  Sign In &rarr;
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              New to ProcurePilot?{' '}
              <button
                onClick={() => onRegisterClick ? onRegisterClick() : onNavigate('register-role')}
                className="font-bold text-gray-900 hover:underline cursor-pointer"
              >
                Register here
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Reset Your Password</h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            
            <p className="text-xs text-gray-600 mb-4">
              Enter your registered email address below, and we will send you instructions to reset your password.
            </p>

            {forgotMessage && (
              <div className={`mb-4 p-3 rounded-lg text-xs font-medium ${
                forgotMessage.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {forgotMessage}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Registered Email Address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com or officer@gov.in"
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-1/2 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#0b2447] text-white rounded-xl text-xs font-bold hover:bg-[#143868] cursor-pointer shadow-sm"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;