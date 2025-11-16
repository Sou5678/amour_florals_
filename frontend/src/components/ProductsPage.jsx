// components/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const location = useLocation();
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedFlowerType, setSelectedFlowerType] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search from navigation
  useEffect(() => {
    if (location.state?.fromSearch && location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      // Clear the state to avoid repeated searches on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const occasions = ['All', 'Birthday', 'Anniversary', 'Wedding', 'Sympathy', 'Congratulations'];
  const flowerTypes = ['All', 'Roses', 'Lilies', 'Tulips', 'Orchids', 'Mixed'];
  const colors = ['All', 'Red', 'Pink', 'White', 'Yellow', 'Purple', 'Mixed'];

  const products = [
    {
      id: 1,
      name: 'Blushing Sunrise Bouquet',
      price: 85.00,
      image: '/api/placeholder/300/300',
      occasion: 'Birthday',
      flowerType: 'Mixed',
      color: 'Pink',
      popular: true,
      description: 'A beautiful blend of pink roses and seasonal flowers that capture the morning sunrise.'
    },
    {
      id: 2,
      name: 'Midnight Garden',
      price: 95.00,
      image: '/api/placeholder/300/300',
      occasion: 'Anniversary',
      flowerType: 'Roses',
      color: 'Red',
      popular: true,
      description: 'Deep red roses arranged to create a romantic and dramatic statement.'
    },
    {
      id: 3,
      name: 'Golden Hour Roses',
      price: 110.00,
      image: '/api/placeholder/300/300',
      occasion: 'Anniversary',
      flowerType: 'Roses',
      color: 'Yellow',
      popular: true,
      description: 'Premium yellow roses that glow like the golden hour of sunset.'
    },
    {
      id: 4,
      name: 'Pastel Dream',
      price: 75.00,
      image: '/api/placeholder/300/300',
      occasion: 'Wedding',
      flowerType: 'Mixed',
      color: 'Mixed',
      popular: true,
      description: 'Soft pastel flowers perfect for weddings and romantic occasions.'
    },
    {
      id: 5,
      name: 'Crimson Kiss',
      price: 120.00,
      image: '/api/placeholder/300/300',
      occasion: 'Anniversary',
      flowerType: 'Roses',
      color: 'Red',
      popular: false,
      description: 'Luxurious deep crimson roses for the most special occasions.'
    },
    {
      id: 6,
      name: 'Serene Lilies',
      price: 80.00,
      image: '/api/placeholder/300/300',
      occasion: 'Sympathy',
      flowerType: 'Lilies',
      color: 'White',
      popular: false,
      description: 'Elegant white lilies that convey peace and serenity.'
    },
    {
      id: 7,
      name: 'Wildflower Melody',
      price: 70.00,
      image: '/api/placeholder/300/300',
      occasion: 'Birthday',
      flowerType: 'Mixed',
      color: 'Mixed',
      popular: false,
      description: 'A cheerful mix of wildflowers that bring natural beauty indoors.'
    },
    {
      id: 8,
      name: 'Ivory Elegance',
      price: 150.00,
      image: '/api/placeholder/300/300',
      occasion: 'Wedding',
      flowerType: 'Orchids',
      color: 'White',
      popular: false,
      description: 'Sophisticated white orchids for the most elegant celebrations.'
    }
  ];

  // Update the filteredProducts logic to include search
  const filteredProducts = products.filter(product => {
    const matchesFilters = (selectedOccasion === 'All' || product.occasion === selectedOccasion) &&
           (selectedFlowerType === 'All' || product.flowerType === selectedFlowerType) &&
           (selectedColor === 'All' || product.color === selectedColor);
    
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flowerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.occasion.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart logic
    const cartItem = {
      product: product.name,
      productId: product.id,
      price: product.price,
      quantity: 1
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('amourFloralsCart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => 
      item.productId === cartItem.productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('amourFloralsCart', JSON.stringify(existingCart));
    
    // Update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert(`${product.name} added to cart!`);
  };

  // Search Header Component
  const SearchHeader = () => {
    if (!searchQuery) return null;
    
    return (
      <div className="bg-rose-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Search Results for "{searchQuery}"
            </h3>
            <p className="text-gray-600 text-sm">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-rose-600 hover:text-rose-700 font-medium transition duration-300"
          >
            Clear Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Artfully Crafted Bouquets for Every Moment
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The moments of the sparkle helps our listeners create unforgettable memories.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-4">Explore Our Collections</h2>
          </div>

          {/* Search Header */}
          <SearchHeader />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                {/* Search Box in Sidebar */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Search Products</h3>
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to search..."
                      className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-lg transition duration-300"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Occasion Filter */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">Occasion</h3>
                  <div className="space-y-2">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() => setSelectedOccasion(occasion)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition duration-300 ${
                          selectedOccasion === occasion
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flower Type Filter */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">Flower Type</h3>
                  <div className="space-y-2">
                    {flowerTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedFlowerType(type)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition duration-300 ${
                          selectedFlowerType === type
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">Color</h3>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition duration-300 ${
                          selectedColor === color
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedOccasion('All');
                    setSelectedFlowerType('All');
                    setSelectedColor('All');
                    setSearchQuery('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort Header */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 group"
                  >
                    <Link 
                      to={`/products/${product.id}`}
                      className="block"
                    >
                      <div className="bg-gray-100 h-64 flex items-center justify-center cursor-pointer group-hover:bg-gray-200 transition duration-300 relative">
                        <span className="text-gray-400">Product Image</span>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300 font-medium">
                            View Details
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link 
                        to={`/products/${product.id}`}
                        className="block"
                      >
                        <h3 className="text-xl font-medium text-gray-800 mb-2 hover:text-rose-600 transition duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-purple-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                      {product.popular && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                          Popular
                        </span>
                      )}
                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <span className="flex items-center mr-4">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          4.8
                        </span>
                        <span>•</span>
                        <span className="ml-4">{product.flowerType}</span>
                        <span>•</span>
                        <span className="ml-4 capitalize">{product.color.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <p className="text-gray-500 text-lg mb-4">
                    {searchQuery 
                      ? `No products found for "${searchQuery}". Try different keywords.`
                      : 'No products found matching your filters.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOccasion('All');
                      setSelectedFlowerType('All');
                      setSelectedColor('All');
                      setSearchQuery('');
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
              <p className="text-gray-300">
                Artfully crafted bouquets for every special moment in life.
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

export default ProductsPage;