import React, { useState } from 'react';

export default function RegisterStep3({ onComplete, onBack }) {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      setError('Kripya terms and conditions accept karein.');
      return;
    }
    setError('');
    if (typeof onComplete === 'function') {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-xs font-bold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          STEP 3: FINAL VERIFICATION
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Compliance &amp; Declaration
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          MeitY Sandbox aur GFR 149(v) compliance ke antargat final terms confirm karein.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-6 shadow sm:rounded-2xl border border-gray-200">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 text-red-700 text-xs rounded-md font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-2">
            <p className="font-bold text-gray-900">Statutory Compliance Undertaking:</p>
            <p>1. Saari di gayi jankariyaan satya aur verified hain.</p>
            <p>2. Blind evaluation aur sandbox protocols ka palan kiya jayega.</p>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agree} 
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer font-medium">
              I agree to the MeitY Sandbox terms, GFR 149(v) compliance norms, and blind evaluation protocols.
            </label>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-all"
            >
              &larr; Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-semibold hover:bg-orange-700 shadow-md cursor-pointer transition-all"
            >
              Complete Registration &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}