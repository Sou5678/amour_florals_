// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { name: "Shop All", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Our Story", path: "/about" }
  ];

  const connectLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Instagram", path: "https://instagram.com" },
    { name: "Pinterest", path: "https://pinterest.com" }
  ];

  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Explore Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-3">
              {connectLinks.map((link, index) => (
                <li key={index}>
                  {link.path.startsWith('http') ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-white transition duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
            <p className="text-gray-300 leading-relaxed">
              Where flowers become art. Luxury floral arrangements crafted with passion and precision, 
              delivering beauty and elegance to your doorstep.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Amour Florals. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;