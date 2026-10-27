import React, { useState } from 'react';

export default function ExpertRegister({ onComplete, onBack }) {
  const [expertData, setExpertData] = useState({
    fullName: '',
    institution: '',
    specialization: 'AI & Machine Learning',
    experienceYears: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setExpertData({ ...expertData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expertData.fullName || !expertData.institution || !expertData.email || !expertData.password) {
      setError('Please fill in all required expert credentials.');
      return;
    }

    // Save expert registration data temporarily
    localStorage.setItem('expertRegisterData', JSON.stringify(expertData));

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <span className="text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          DOMAIN EXPERT &amp; JUROR REGISTRATION
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Academic &amp; Technical Juror Onboarding
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Register to review and score double-blind innovation proposals under MeitY guidelines.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl sm:px-10 border border-purple-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded-md font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={expertData.fullName}
                onChange={handleChange}
                required
                placeholder="Dr. Rajesh Sharma"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Academic / Institutional Affiliation *</label>
              <input
                type="text"
                name="institution"
                value={expertData.institution}
                onChange={handleChange}
                required
                placeholder="IIT Delhi / IISc Bangalore / NITI Aayog Expert Panel"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain Specialization *</label>
                <select
                  name="specialization"
                  value={expertData.specialization}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white"
                >
                  <option value="AI & Machine Learning">AI &amp; Machine Learning / Edge Computing</option>
                  <option value="CleanTech & Environment">CleanTech &amp; Water/Air Monitoring</option>
                  <option value="Smart Infrastructure">Smart Infrastructure &amp; Urban Mobility</option>
                  <option value="Cybersecurity & GovTech">Cybersecurity &amp; GovTech Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={expertData.experienceYears}
                  onChange={handleChange}
                  required
                  placeholder="12"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Email Address *</label>
              <input
                type="email"
                name="email"
                value={expertData.email}
                onChange={handleChange}
                required
                placeholder="expert.name@institution.ac.in"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                name="password"
                value={expertData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
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
                className="px-8 py-2.5 bg-purple-600 text-white font-semibold text-sm rounded-lg hover:bg-purple-700 shadow-md transition-all cursor-pointer"
              >
                Complete Expert Registration &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}