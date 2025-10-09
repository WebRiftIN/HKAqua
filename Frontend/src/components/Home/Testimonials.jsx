import React from 'react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 water-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Real reviews from satisfied families across India</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Rajesh Kumar</h4>
                <div className="star-rating flex">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Excellent water quality and taste! The installation was professional and the water tastes so much better now. Highly recommended!"</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Priya Sharma</h4>
                <div className="star-rating flex">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Best investment for our family's health. The customer service is outstanding and maintenance is hassle-free. Very satisfied!"</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Amit Patel</h4>
                <div className="star-rating flex">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"Amazing product quality and service. The water is crystal clear and tastes great. Worth every penny spent!"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
