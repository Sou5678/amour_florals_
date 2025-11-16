// components/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    // In a real app, you would send this data to your backend
    console.log('Sign up data:', formData);
    
    // Simulate successful signup
    localStorage.setItem('amourFloralsUser', JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      isLoggedIn: true
    }));

    alert('Account created successfully!');
    navigate('/profile'); // Redirect to profile page
  };

  const handleSocialSignup = (provider) => {
    // Social signup logic would go here
    alert(`Sign up with ${provider} - This would integrate with OAuth in a real app`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-light text-gray-800 hover:text-rose-600 transition duration-300">
            Amour Florals
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Step 1 of 2</span>
              <div className="w-16 h-1 bg-rose-200 rounded-full">
                <div className="w-1/2 h-full bg-rose-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-light text-gray-800">Create an Account</h1>
          </div>

          {/* Social Signup */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('Google')}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>

            <button
              onClick={() => handleSocialSignup('Apple')}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-gray-700 font-medium">Sign up with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Sign up to discover exclusive collections and curated bouquets.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 text-rose-600 focus:ring-rose-500 rounded"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-rose-600 hover:text-rose-700">Terms of Service</a> and <a href="#" className="text-rose-600 hover:text-rose-700">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-rose-600 hover:text-rose-700 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;