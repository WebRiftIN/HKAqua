import React from 'react';

const NewArrivals = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals: Advanced RO Systems</h2>
          <p className="text-xl text-gray-600">Latest technology water purifiers with cutting-edge features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New Arrival 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-8">
              <svg className="w-32 h-32 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8" cy="12" r="1" fill="white"/>
                <circle cx="16" cy="12" r="1" fill="white"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Smart</h3>
              <p className="text-gray-600 mb-4">IoT-enabled smart water purifier with app control and real-time monitoring.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500">(New)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹24,999</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">New</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* New Arrival 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-8">
              <svg className="w-32 h-32 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7 0-1.28.35-2.47.94-3.5L12 14.5l6.06-6c.59 1.03.94 2.22.94 3.5 0 3.87-3.13 7-7 7z"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 12h12" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Ultra</h3>
              <p className="text-gray-600 mb-4">Ultra-filtration technology with 11-stage purification for maximum purity.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500">(New)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹19,999</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">New</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* New Arrival 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-8">
              <svg className="w-32 h-32 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="9" cy="12" r="0.5" fill="white"/>
                <circle cx="12" cy="12" r="0.5" fill="white"/>
                <circle cx="15" cy="12" r="0.5" fill="white"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Compact</h3>
              <p className="text-gray-600 mb-4">Space-saving design with powerful 6-stage purification for modern homes.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500">(New)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹14,999</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">New</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
