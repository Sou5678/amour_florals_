// components/Nav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('amourFloralsCart') || '[]');
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem('amourFloralsUser') || 'null');
      setIsLoggedIn(!!user?.isLoggedIn);
    };

    // Initial load
    updateCartCount();
    checkAuthStatus();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    // Listen for auth updates
    window.addEventListener('authUpdated', checkAuthStatus);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('authUpdated', checkAuthStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate('/products', { 
        state: { 
          searchQuery: searchQuery.trim(),
          fromSearch: true 
        } 
      });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleProfileClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-light text-gray-800 hover:text-rose-600 transition duration-300"
          >
            Amour Florals
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium"
            >
              Collections
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium"
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium"
            >
              Our Story
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon with Functional Search Bar */}
            <div className="relative">
              <button 
                onClick={toggleSearch}
                className="text-gray-600 hover:text-rose-600 transition duration-300 p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 z-50">
                  <form onSubmit={handleSearchSubmit} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for flowers, bouquets..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg transition duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quick Search Suggestions */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium">QUICK SEARCH</p>
                      <div className="flex flex-wrap gap-2">
                        {['Roses', 'Tulips', 'Wedding', 'Birthday', 'Anniversary'].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              setSearchQuery(term);
                              setTimeout(() => {
                                document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                              }, 100);
                            }}
                            className="text-xs bg-gray-100 hover:bg-rose-100 text-gray-700 hover:text-rose-700 px-2 py-1 rounded transition duration-300"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Account Icon - Always show user icon, conditionally link to profile or login */}
            <Link 
              to={isLoggedIn ? "/profile" : "/login"}
              onClick={!isLoggedIn ? handleProfileClick : undefined}
              className="text-gray-600 hover:text-rose-600 transition duration-300 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart Icon with Badge */}
            <Link 
              to="/cart" 
              className="text-gray-600 hover:text-rose-600 transition duration-300 p-2 relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-rose-600 transition duration-300 p-2"
              onClick={toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/collections" 
                className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              
              {/* Mobile Search */}
              <div className="py-2">
                <form onSubmit={handleSearchSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Conditional Auth Links in Mobile Menu */}
              {isLoggedIn ? (
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <Link 
                to="/cart" 
                className="text-gray-600 hover:text-rose-600 transition duration-300 font-medium py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for search dropdown */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={() => setIsSearchOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Nav;