import React from 'react';

const WhyChoose = () => {
  return (
    <section id="features" className="py-20 water-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AquaPure?</h2>
          <p className="text-xl text-gray-600">Experience the difference with our premium service and quality commitment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Free Installation</h3>
            <p className="text-gray-600">Professional installation service at your doorstep with no additional charges.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Quality</h3>
            <p className="text-gray-600">ISI certified products with international quality standards and rigorous testing.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7 0-1.28.35-2.47.94-3.5L12 14.5l6.06-6c.59 1.03.94 2.22.94 3.5 0 3.87-3.13 7-7 7z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer support and maintenance services for your peace of mind.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66c.03-.08.06-.17.09-.25.85-2.33 2.02-5.25 4.07-6.5C13.5 10.5 16 8 17 8zM3.95 19.44c.03-.08.06-.17.09-.25.85-2.33 2.02-5.25 4.07-6.5C10.5 10.5 13 8 14 8c-9 2-11.1 8.17-13.18 13.34l1.89.66.95-2.66z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly</h3>
            <p className="text-gray-600">Environment-friendly technology with minimal water wastage and energy efficiency.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
