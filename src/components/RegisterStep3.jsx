import React, { useState } from 'react';

const RegisterStep3 = ({ onComplete, onBack }) => {
  const [dpiitNumber, setDpiitNumber] = useState('');
  const [yearFounded, setYearFounded] = useState('');
  const [teamSize, setTeamSize] = useState('11-25 employees');
  const [city, setCity] = useState('');
  const [fileName, setFileName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [successId, setSuccessId] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleVerifyAndRegister = (e) => {
    e.preventDefault();
    if (!dpiitNumber || !yearFounded || !city) {
      setError('Kripya sabhi zaroori fields bharein!');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate secure MeitY / MCA21 / DPIIT Sandbox API handshake
    setTimeout(() => {
      setIsVerifying(false);
      // Generate a unique ProcurePilot Verification ID
      const generatedId = `PP-2026-${Math.floor(1000 + Math.random() * 9000)}OE`;
      setSuccessId(generatedId);

      // Save complete profile to localStorage
      const finalData = {
        dpiitNumber,
        yearFounded,
        teamSize,
        city,
        ppId: generatedId
      };
      localStorage.setItem('regStep3', JSON.stringify(finalData));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <span className="text-xs font-bold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          STEP 3: CORPORATE & STATUTORY CREDENTIALS
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Verify Incorporation & DPIIT Credentials
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Provide corporate registration details to unlock GFR 149(v) zero tender fee and direct sandbox escrow benefits.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl sm:px-10 border border-orange-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          {successId ? (
            /* Success Modal / Card showing PP-ID */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Startup Registration Completed & Verified!</h3>
              <p className="text-sm text-gray-600">
                Your statutory registry verification under MeitY Sandbox was successful.
              </p>
              
              <div className="my-6 p-4 bg-orange-50 border-2 border-dashed border-orange-300 rounded-xl inline-block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Your ProcurePilot Unique ID (PP-ID)</span>
                <span className="text-2xl font-extrabold text-orange-600 tracking-wider">{successId}</span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (onComplete) onComplete();
                    else window.location.hash = 'landing';
                  }}
                  className="px-8 py-3 bg-orange-600 text-white font-bold text-sm rounded-xl hover:bg-orange-700 shadow-md transition-all cursor-pointer"
                >
                  Proceed to Dashboard / Landing &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* Form Inputs */
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year Founded *</label>
                  <input
                    type="text"
                    value={yearFounded}
                    onChange={(e) => setYearFounded(e.target.value)}
                    required
                    placeholder="2022"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Core Team Size *</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm bg-white"
                  >
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-25 employees">11-25 employees</option>
                    <option value="26-50 employees">26-50 employees</option>
                    <option value="50+ employees">50+ employees</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registered City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="Bengaluru / Greater Noida"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">DPIIT Recognition Number *</label>
                  <input
                    type="text"
                    value={dpiitNumber}
                    onChange={(e) => setDpiitNumber(e.target.value)}
                    required
                    placeholder="DPIIT98765"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              {/* File Upload Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DPIIT Certificate / Incorporation Document *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-500 transition-colors bg-gray-50/50 relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.jpg,.png"
                  />
                  <div className="space-y-1">
                    <span className="material-symbols-outlined text-3xl text-gray-400">cloud_upload</span>
                    <p className="text-xs text-gray-600 font-medium">
                      Upload DPIIT Certificate or Certificate of Incorporation (PDF, max 10MB)
                    </p>
                    <p className="text-[11px] text-orange-600 underline">Click here or drag and drop to browse file</p>
                  </div>
                  {fileName && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1 rounded-md text-xs text-green-700 font-semibold">
                      <span>📄 {fileName}</span>
                      <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">READY</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-all"
                >
                  &larr; Back
                </button>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-8 py-2.5 bg-orange-600 text-white font-semibold text-sm rounded-lg hover:bg-orange-700 shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Verifying with MCA21 / DPIIT...
                    </>
                  ) : (
                    'Verify & Complete Registration →'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterStep3;