import React, { useState, useEffect } from 'react';

const RegisterStep1 = ({ onNext }) => {
  const [role, setRole] = useState('startup');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    startupName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.fullName || !formData.startupName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    // Save data to localStorage
    localStorage.setItem('regStep1', JSON.stringify(formData));
    
    // Proceed to next step smoothly
    if (typeof onNext === 'function') {
      onNext();
    } else {
      window.location.hash = 'register-2';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${
          role === 'government' ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-orange-600 bg-orange-50 border-orange-200'
        }`}>
          {role === 'government' ? 'Government Registration - Step 1' : 'Startup Registration - Step 1'}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
          Basic Information & Credentials
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {role === 'government' ? 'Enter your personal credentials before department verification.' : 'Enter your founder details and credentials.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border ${
          role === 'government' ? 'border-blue-100' : 'border-orange-100'
        }`}>
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm rounded-md font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleNext}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="Anurag Yadav"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {role === 'government' ? 'Department / Organization Name' : 'Startup Name'}
              </label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder={role === 'government' ? 'e.g., MeitY / DPIIT' : 'RoadTech Labs'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder={role === 'government' ? 'officer@gov.in' : 'startup@roadtechlabs.in'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-lg p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="9818828974"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white transition-all cursor-pointer ${
                  role === 'government' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                Proceed to Next Step &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;