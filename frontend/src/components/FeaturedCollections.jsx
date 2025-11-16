// components/FeaturedCollections.jsx
import React from 'react';

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "The Autumn Edit",
      description: "Warm tones and seasonal blooms"
    },
    {
      id: 2,
      title: "The Romance Collection",
      description: "Elegant arrangements for special moments"
    },
    {
      id: 3,
      title: "Designer's Guide",
      description: "Expert curated floral designs"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our curated selections, each telling a unique story through the language of flowers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id}
              className="group cursor-pointer transform hover:scale-105 transition duration-300"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-80 rounded-2xl mb-4 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition duration-300 shadow-md">
                <span className="text-gray-500 text-lg">Collection Image</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {collection.title}
              </h3>
              <p className="text-gray-600 text-center mt-2">
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;