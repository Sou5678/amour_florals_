// components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
          Where Flowers Become Art
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience: The luxury of artfully crafted bouquets, designed to captivate and inspire.
        </p>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Shop The Collection
        </button>
      </div>
    </section>
  );
};

export default HeroSection;