// components/ProfilePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Olivia Chen',
    email: 'olivia.chen@gmail.com',
    phone: '+1 (555) 123-4567',
    birthday: 'October 26th'
  });

  const favorites = [
    { id: 1, name: 'Pastel Dreams', price: 75.00 },
    { id: 2, name: 'Sunny Radiance', price: 65.00 },
    { id: 3, name: 'Ivory Elegance', price: 85.00 },
    { id: 4, name: 'Crimson Passi', price: 95.00 }
  ];

  const orderHistory = [
    { id: 'AF-10385', date: 'July 15, 2024', status: 'Delivered' },
    { id: 'AF-10211', date: 'May 02, 2024', status: 'Delivered' },
    { id: 'AF-10159', date: 'March 18, 2024', status: 'Delivered' }
  ];

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    // Logout logic here
    alert('Logged out successfully!');
    // In a real app, you would clear authentication and redirect
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Welcome back, Olivia</h2>
              <p className="text-gray-600">
                Manage your profile, view orders, and update your preferences.
              </p>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-light text-gray-800">Personal Details</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-rose-600 hover:text-rose-700 font-medium transition duration-300"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="text-gray-600 font-medium md:w-1/3">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800">{userData.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="text-gray-600 font-medium md:w-1/3">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800">{userData.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="text-gray-600 font-medium md:w-1/3">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800">{userData.phone}</span>
                  )}
                </div>

                {/* Birthday */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="text-gray-600 font-medium md:w-1/3">Birthday</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.birthday}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800">{userData.birthday}</span>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSave}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">My Favorites</h2>
              <p className="text-gray-600">
                Your cherished floral arrangements, saved for easy access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">🌷</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-rose-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <button className="text-rose-600 hover:text-rose-700 transition duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Order History</h2>
              <p className="text-gray-600">
                Track your recent orders and their delivery status.
              </p>
            </div>

            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Order ID</h4>
                      <p className="text-gray-800 font-medium">#{order.id}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Date</h4>
                      <p className="text-gray-800">{order.date}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Status</h4>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-green-600">{order.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-rose-600 hover:text-rose-700 font-medium transition duration-300">
                      View Order Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
            <h2 className="text-3xl font-light text-gray-800 mb-2">Welcome back, Olivia</h2>
            <p className="text-gray-600">
              Manage your profile, view orders, and update your preferences.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-rose-600 hover:text-rose-700 transition duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <Link to="/" className="text-2xl font-light text-gray-800">
              Amour Florals
            </Link>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-light mx-auto mb-4">
                  OC
                </div>
                <h1 className="text-2xl font-light text-gray-800 mb-1">Olivia Chen</h1>
                <p className="text-gray-500 text-sm">Member since 2023</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                    activeSection === 'profile'
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                    activeSection === 'orders'
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Order History
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-300">
                  Saved Addresses
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-300">
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveSection('favorites')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                    activeSection === 'favorites'
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Favorites
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-300">
                  Preferences
                </button>
              </nav>

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
              <p className="text-gray-300">
                Where flowers become art. Creating timeless arrangements for every special moment.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/products" className="hover:text-white transition">Shop All</Link></li>
                <li><Link to="/collections" className="hover:text-white transition">Collections</Link></li>
                <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Amour Florals. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;