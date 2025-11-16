// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedCollections from '../components/FeaturedCollections';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <HeroSection />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;