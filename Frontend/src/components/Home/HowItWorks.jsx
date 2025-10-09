import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your 4-Step Journey to Pure Water</h2>
          <p className="text-xl text-gray-600">Getting pure water for your family has never been easier</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-sky-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <svg className="w-12 h-12 text-sky-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse & Select Model</h3>
              <p className="text-gray-600">Choose the perfect RO water purifier that suits your family's needs and budget</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-sky-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <svg className="w-12 h-12 text-sky-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Features & Capacity</h3>
              <p className="text-gray-600">Select additional features and storage capacity based on your requirements</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-sky-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <svg className="w-12 h-12 text-sky-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery & Installation</h3>
              <p className="text-gray-600">Quick delivery and professional installation at your home within 24-48 hours</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="bg-sky-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <svg className="w-12 h-12 text-sky-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoy Pure Water!</h3>
              <p className="text-gray-600">Start enjoying crystal clear, healthy water for your entire family</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-sky-500 text-white hover:bg-sky-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ripple-effect">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
