import React, { useState } from 'react';

const RegisterStep1 = ({ onNext }) => {
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
      setError('Kripya sabhi fields bharein!');
      return;
    }
    if (formData.phone.length !== 10) {
      setError('Phone number 10 digits ka hona chahiye.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords match nahi kar rahe hain!');
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          ProcurePilot Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step 1: Basic Information & Credentials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-orange-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Anurag Yadav"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Startup Name</label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="RoadTech Labs"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="startup@roadtechlabs.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md p-2 focus:ring-orange-500 focus:border-orange-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all cursor-pointer"
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