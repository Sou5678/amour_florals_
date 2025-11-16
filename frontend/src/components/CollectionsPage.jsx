// components/CollectionsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Season', 'Occasion', 'Color Palette'];

  const collections = [
    {
      id: 1,
      title: 'Wild Romance',
      description: 'A celebration of animated beauty and passionate hosts.',
      category: 'Season'
    },
    {
      id: 2,
      title: 'Winter Solstice',
      description: 'Crisp whites and frosted greens to celebrate the quiet season.',
      category: 'Season'
    },
    {
      id: 3,
      title: 'Spring Awakening',
      description: 'A vibrant burst of life and color to welcome the new.',
      category: 'Season'
    },
    {
      id: 4,
      title: 'Pastel Dreams',
      description: 'Soft, gentle haes for moments of quiet beauty.',
      category: 'Color Palette'
    },
    {
      id: 5,
      title: 'Anniversary & Romance',
      description: 'Express your love with classic and timeless arrangements.',
      category: 'Occasion'
    },
    {
      id: 6,
      title: 'Vibrant Tropics',
      description: 'Bold, exotic blooms that bring the heat of the islands.',
      category: 'Season'
    }
  ];

  const filteredCollections = activeFilter === 'All' 
    ? collections 
    : collections.filter(collection => collection.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            The Autumnal Collection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated from collections, thoughtfully composed to capture the essence of every season and sentiment.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition duration-300">
            Explore Now
          </button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-8">Our Collections</h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full border transition duration-300 ${
                    activeFilter === filter
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-amber-600 hover:text-amber-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection) => (
              <div 
                key={collection.id} 
                className="group cursor-pointer transform hover:-translate-y-2 transition duration-300"
              >
                <div className="bg-gray-100 h-80 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-200 transition duration-300 overflow-hidden">
                  <div className="text-center p-6">
                    <span className="text-gray-500 text-sm uppercase tracking-wide">{collection.category}</span>
                    <div className="mt-2 w-16 h-1 bg-amber-500 mx-auto"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">{collection.title}</h3>
                <p className="text-gray-600">{collection.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
              <p className="text-gray-300 italic">
                The Art of Arrangement.
              </p>
            </div>

            {/* Explore Section */}
            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
                <li><Link to="/collections" className="hover:text-white transition">Collections</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition">Shipping</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="font-medium mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                <p>&copy; 2024 Amour Florals. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollectionsPage;