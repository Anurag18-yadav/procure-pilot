import React, { useState } from 'react';

const RegisterSectorSelect = ({ onNext, onBack }) => {
  const [selectedSector, setSelectedSector] = useState('');
  const [error, setError] = useState('');

  const sectors = [
    { id: 'tech', title: 'Tech / IT', icon: '💻', desc: 'Software, SaaS, AI/ML, and digital infrastructure solutions.' },
    { id: 'medtech', title: 'MedTech / Healthcare', icon: '🩺', desc: 'Medical devices, health diagnostics, and biotech innovations.' },
    { id: 'agri', title: 'Agriculture / AgriTech', icon: '🌾', desc: 'Smart farming, supply chain, crop monitoring, and agritech.' },
    { id: 'open', title: 'Open Innovation', icon: '💡', desc: 'Cross-domain disruptive ideas and multi-sector problem solvers.' },
    { id: 'disaster', title: 'Disaster Management', icon: '🛡️', desc: 'Early warning systems, rescue tech, and emergency response.' }
  ];

  const handleProceed = () => {
    if (!selectedSector) {
      setError('Kripya kam se kam ek sector select karein!');
      return;
    }
    // Sector ko localStorage me save kar lo
    localStorage.setItem('startupSector', selectedSector);
    
    if (onNext) {
      onNext(selectedSector);
    } else {
      window.location.hash = 'register-step3'; // Next step par jaane ke liye
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Select Your Startup Domain & Sector
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose the primary industry sector your startup operates in for GFR 149(v) compliance mapping.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sec) => (
            <div
              key={sec.id}
              onClick={() => {
                setSelectedSector(sec.title);
                setError('');
              }}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center bg-white shadow-xs ${
                selectedSector === sec.title
                  ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-500'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-3">{sec.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{sec.title}</h3>
              <p className="text-xs text-gray-500">{sec.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            &larr; Back
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="px-8 py-2 bg-orange-600 text-white font-semibold text-sm rounded-md hover:bg-orange-700 shadow-md transition-all cursor-pointer"
          >
            Proceed to Next Step &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSectorSelect;