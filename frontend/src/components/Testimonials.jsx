// components/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Absolutely breathtaking! The most beautiful arrangement I've ever received.",
      author: "Tablets 1",
      location: "New York"
    },
    {
      id: 2,
      text: "The quality and artistry are unparalleled. Amour Florals is my go-to.",
      author: "Mature B.",
      location: "Chicago"
    },
    {
      id: 3,
      text: "Every detail was perfect, from the packaging to the flowers themselves.",
      author: "Emily F.",
      location: "San Francisco"
    },
    {
      id: 4,
      text: "My subscription brings joy every month. Always fresh, always beautiful.",
      author: "Jessica T.",
      location: "Miami"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center text-gray-800 mb-12">
          Words of Admiration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-gray-500 text-sm font-medium">
                  - {testimonial.author}
                </p>
                <p className="text-gray-400 text-xs">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;