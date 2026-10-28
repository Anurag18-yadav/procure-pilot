import React, { useState, useEffect } from 'react';

const RegisterStep2 = ({ onComplete, onBack }) => {
  const [selectedSector, setSelectedSector] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedSector = localStorage.getItem('startupSector');
    if (savedSector) {
      setSelectedSector(savedSector);
    }
  }, []);

  // 5 specific industry fields
  const sectors = [
    { id: 'tech', title: 'Tech / IT', icon: '💻', desc: 'SaaS, AI/ML, software, and digital public goods.' },
    { id: 'medtech', title: 'MedTech / Healthcare', icon: '🩺', desc: 'Medical devices, health tech, and diagnostics.' },
    { id: 'agri', title: 'Agriculture / AgriTech', icon: '🌾', desc: 'Smart farming, agritech, and food supply chain.' },
    { id: 'open', title: 'Open Innovation', icon: '💡', desc: 'Disruptive multi-sector problem solving & R&D.' },
    { id: 'disaster', title: 'Disaster Management', icon: '🛡️', desc: 'Early warning systems, emergency response & rescue tech.' }
  ];

  const handleNextStep = () => {
    if (!selectedSector) {
      setError('Kripya apna sector/field select karein!');
      return;
    }
    
    // Save selection to localStorage
    localStorage.setItem('startupSector', selectedSector);
    
    if (typeof onComplete === 'function') {
      onComplete();
    } else {
      window.location.hash = 'register-3';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <span className="text-xs font-bold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          STEP 2: DOMAIN &amp; SECTOR SELECTION
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Select Your Startup Field
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose the primary industry vertical your startup belongs to under GFR 149(v) compliance.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl px-4">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded-md font-medium">
            {error}
          </div>
        )}

        {/* Sector Grid Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sec) => (
            <div
              key={sec.id}
              onClick={() => {
                setSelectedSector(sec.title);
                setError('');
              }}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col items-center text-center bg-white shadow-xs ${
                selectedSector === sec.title
                  ? 'border-orange-600 bg-orange-50/60 ring-2 ring-orange-500 shadow-md'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl mb-4 shadow-xs">
                {sec.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{sec.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-all"
          >
            &larr; Back
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-8 py-2.5 bg-orange-600 text-white font-semibold text-sm rounded-lg hover:bg-orange-700 shadow-md transition-all cursor-pointer"
          >
            Proceed &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;