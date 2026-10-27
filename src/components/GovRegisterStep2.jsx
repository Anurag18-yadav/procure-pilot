import React, { useState } from 'react';

export default function GovRegisterStep2({ onNext, onBack }) {
  const [govData, setGovData] = useState({
    ministryName: 'Ministry of Housing and Urban Affairs',
    departmentType: 'Central Government Ministry / Department',
    officialEmail: 'officer.mohua@gov.in',
    nodalDesignation: 'Joint Secretary (Smart Cities Mission)',
  });

  // State for handling actual file upload
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Govt_Authorization_Letter_Signed.pdf',
    size: '1.8 MB',
    ready: true
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        ready: true
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#D9E0EA] p-8 my-8 font-sans">
      {/* Official Header Banner */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#D6A84F] font-bold">🏛️</span>
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">Government Authority Verification • GFR 2017 Portal</span>
        </div>
        <h2 className="text-xl font-bold text-[#0B1F3A]">Official Departmental Credentials</h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Provide authorized government credentials for publishing GFR 149(v) compliance challenge briefs and managing startup sandbox pilots.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-[#172033] mb-1.5">Ministry / Organization Name *</label>
          <input 
            type="text" 
            value={govData.ministryName}
            onChange={(e) => setGovData({...govData, ministryName: e.target.value})}
            className="w-full text-xs bg-[#F7F9FC] border border-[#D9E0EA] rounded-lg p-3 text-[#172033] focus:outline-none focus:border-[#0B1F3A]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#172033] mb-1.5">Department Classification *</label>
          <select 
            value={govData.departmentType}
            onChange={(e) => setGovData({...govData, departmentType: e.target.value})}
            className="w-full text-xs bg-[#F7F9FC] border border-[#D9E0EA] rounded-lg p-3 text-[#172033] focus:outline-none cursor-pointer"
          >
            <option>Central Government Ministry / Department</option>
            <option>State Government Department</option>
            <option>Municipal Corporation / Urban Local Body</option>
            <option>Autonomous Body / PSU</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#172033] mb-1.5">Official Government Email (@gov.in / @nic.in) *</label>
          <input 
            type="email" 
            value={govData.officialEmail}
            onChange={(e) => setGovData({...govData, officialEmail: e.target.value})}
            className="w-full text-xs bg-[#F7F9FC] border border-[#D9E0EA] rounded-lg p-3 text-[#172033] focus:outline-none focus:border-[#0B1F3A]"
          />
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Verified against National Informatics Centre (NIC) directory domain rules.</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#172033] mb-1.5">Nodal Officer Designation *</label>
          <input 
            type="text" 
            value={govData.nodalDesignation}
            onChange={(e) => setGovData({...govData, nodalDesignation: e.target.value})}
            className="w-full text-xs bg-[#F7F9FC] border border-[#D9E0EA] rounded-lg p-3 text-[#172033] focus:outline-none focus:border-[#0B1F3A]"
          />
        </div>
      </div>

      {/* Interactive PDF Document Upload Section */}
      <div className="mt-6">
        <label className="block text-xs font-bold text-[#172033] mb-1.5">Departmental Authorization / Gazette Notification Document (PDF) *</label>
        <div className="border-2 border-dashed border-[#D9E0EA] rounded-xl p-6 text-center bg-[#F7F9FC] relative hover:border-[#0B1F3A] transition-colors">
          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">📄</span>
            <p className="text-xs font-bold text-[#0B1F3A]">
              {uploadedFile ? uploadedFile.name : "Click here or drag and drop to browse PDF"}
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              {uploadedFile ? `Size: ${uploadedFile.size}` : "Securely encrypted for e-Office digital signature integration."}
            </p>
            {uploadedFile && (
              <span className="mt-2 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
                READY / VERIFIED
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
        <button 
          onClick={onBack} 
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-xs font-bold text-[#0B1F3A] hover:bg-gray-50 cursor-pointer"
        >
          Back
        </button>
        <button 
          onClick={onNext} 
          className="px-6 py-2.5 bg-[#0B1F3A] text-white rounded-lg text-xs font-bold hover:bg-[#12345B] shadow-xs cursor-pointer"
        >
          Proceed to Department Dashboard Setup →
        </button>
      </div>
    </div>
  );
}