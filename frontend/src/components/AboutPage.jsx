// components/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Where Every Petal Tells a Story
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The unique story and peaceful petals from Tamir, Padma, our residential forest with our customers.
          </p>
        </div>
      </section>

      {/* Passion Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-6">The Spark of Passion</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A short, romantic paragraph about the initial spark or passion for flinting that led to the creation of Anwar Florids. It all started with a single social of no idea to share emotion and create beauty through the timeless art of Flinting.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-6xl text-rose-400 mb-4 inline-block">"</span>
              <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8">
                Please speak a universal language of love, exuberation, and advice. My journey has been back to every fruit belonging and sharing its poetry with the world.
              </blockquote>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-lg font-medium text-gray-800">Jam Sno</p>
                <p className="text-gray-600">Founder & Lead Friend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center text-gray-800 mb-12">Our Journey in Bloom</h2>
          
          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-center md:text-right md:pr-8 mb-6 md:mb-0">
                <div className="bg-rose-100 text-rose-800 px-6 py-3 rounded-full inline-block">
                  <span className="text-2xl font-light">2019</span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mt-2">The First Seed</h3>
              </div>
              <div className="md:w-2/3 bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 leading-relaxed">
                  Our journey found 3 small staff at the local farmers and 2 living car passion for unique, hard-fired foodquirts.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-center md:text-right md:pr-8 mb-6 md:mb-0 order-2 md:order-1">
                <div className="bg-rose-100 text-rose-800 px-6 py-3 rounded-full inline-block">
                  <span className="text-2xl font-light">2021</span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mt-2">Our First Studio</h3>
              </div>
              <div className="md:w-2/3 bg-gray-50 rounded-2xl p-6 order-1 md:order-2">
                <p className="text-gray-600 leading-relaxed">
                  We opened our first 5 third studio space, a photo called Lukking could truly blossom and are excellent workshops.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-center md:text-right md:pr-8 mb-6 md:mb-0">
                <div className="bg-rose-100 text-rose-800 px-6 py-3 rounded-full inline-block">
                  <span className="text-2xl font-light">2022</span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mt-2">Blooming into Amour Florids</h3>
              </div>
              <div className="md:w-2/3 bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 leading-relaxed">
                  Launched our own 8 years Amour Florids, in being one happy, loved designer to honour all on earth in city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-600 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-white mb-6">Ready to Create Your Own Story?</h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            It is our favorite part of their special moments. English professional playwrights who have never received assistance by their fans.
          </p>
          <Link 
            to="/collections" 
            className="bg-white text-rose-600 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Bloom Our Celebration
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
              <p className="text-gray-300 max-w-md">
                Where every petal tells a story. Creating timeless floral arrangements that capture emotions and create lasting memories.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/collections" className="hover:text-white transition">Collections</Link></li>
                <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
                <li><Link to="/subscriptions" className="hover:text-white transition">Subscriptions</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition">Shipping</Link></li>
                <li><Link to="/care" className="hover:text-white transition">Flower Care</Link></li>
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

export default AboutPage;