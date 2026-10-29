import React, { useState, useEffect } from 'react';

const RegisterStep1 = ({ onNext }) => {
  const [role, setRole] = useState('startup');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || localStorage.getItem('tempRole');
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cross-verification: Phone field me sirf numbers allow honge aur max 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.fullName.trim() || !formData.startupName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    // Name validation (Only alphabets and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.fullName)) {
      setError('Full Name should only contain alphabets and spaces.');
      return;
    }

    // Phone validation
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setLoading(true);

    try {
      // Check duplicate email against FastAPI /api/check-email before proceeding
      const response = await fetch('http://localhost:8000/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'This email is already registered!');
        setLoading(false);
        return; // Yahin rok dega, aage nahi jaane dega!
      }

    } catch (err) {
      console.error("Backend pre-check connection error:", err);
      setError('Backend server se connect nahi ho pa raha hai!');
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }

    // Save data to localStorage for multi-step form continuity
    localStorage.setItem('regStep1', JSON.stringify(formData));
    
    // Strict Hash Navigation to Step 2
    window.location.hash = 'register-2';
    window.location.reload();
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
          Basic Information &amp; Credentials
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
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-50 ${
                  role === 'government' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {loading ? 'Checking Email...' : 'Proceed to Next Step \u2192'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;