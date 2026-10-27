import React, { useState } from 'react';

const GovRegisterStep2 = ({ onNext, onBack }) => {
  const [govData, setGovData] = useState({
    departmentName: '',
    designation: '',
    officialEmail: '',
    employeeId: '',
    stateOrCentral: 'Central Government',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setGovData({ ...govData, [e.target.name]: e.target.value });
  };

  const handleGovSubmit = (e) => {
    e.preventDefault();
    if (!govData.departmentName || !govData.designation || !govData.officialEmail || !govData.employeeId) {
      setError('Please fill in all required government fields.');
      return;
    }
    
    // Robust official email validation checking endsWith (.gov.in or .nic.in)
    const emailTrimmed = govData.officialEmail.trim().toLowerCase();
    if (!emailTrimmed.endsWith('.gov.in') && !emailTrimmed.endsWith('.nic.in')) {
      setError('Please enter a valid official Government email ID ending with .gov.in or .nic.in.');
      return;
    }

    // Save government credentials to localStorage
    localStorage.setItem('govRegisterData', JSON.stringify(govData));
    localStorage.setItem('userRole', 'government');

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          GOVERNMENT OFFICIAL SANDBOX REGISTRATION
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Department & Official Verification
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Verify your official credentials under GFR 2017 public procurement guidelines.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl sm:px-10 border border-blue-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded-md font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleGovSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Department / Ministry Name *</label>
              <input
                type="text"
                name="departmentName"
                value={govData.departmentName}
                onChange={handleChange}
                required
                placeholder="Ministry of Electronics and Information Technology (MeitY)"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Official Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={govData.designation}
                  onChange={handleChange}
                  required
                  placeholder="Joint Secretary / Procurement Director"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Employee / Officer ID *</label>
                <input
                  type="text"
                  name="employeeId"
                  value={govData.employeeId}
                  onChange={handleChange}
                  required
                  placeholder="GOV-987654"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Official Government Email (.gov.in / .nic.in) *</label>
              <input
                type="email"
                name="officialEmail"
                value={govData.officialEmail}
                onChange={handleChange}
                required
                placeholder="officer.name@gov.in"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Jurisdiction Level *</label>
              <select
                name="stateOrCentral"
                value={govData.stateOrCentral}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              >
                <option value="Central Government">Central Government Ministry / Department</option>
                <option value="State Government">State Government Department</option>
                <option value="PSU / Autonomous Body">PSU / Autonomous Body / Municipal Corporation</option>
              </select>
            </div>

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
                className="px-8 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 shadow-md transition-all cursor-pointer"
              >
                Complete Government Registration &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GovRegisterStep2;