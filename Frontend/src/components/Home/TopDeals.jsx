import React from 'react';

const TopDeals = () => {
  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Deals of the Week</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our most popular RO water purifiers with unbeatable prices and premium quality</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="water-light p-8">
              <svg className="w-24 h-24 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Pro</h3>
              <p className="text-gray-600 mb-4">Advanced 7-stage RO purification with UV sterilization and mineral enhancement technology.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500">(4.8)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹12,999</span>
                <span className="text-sm text-gray-500 line-through">₹15,999</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="water-light p-8">
              <svg className="w-24 h-24 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7 0-1.28.35-2.47.94-3.5L12 14.5l6.06-6c.59 1.03.94 2.22.94 3.5 0 3.87-3.13 7-7 7z"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Elite</h3>
              <p className="text-gray-600 mb-4">Premium 9-stage purification with alkaline enhancement and smart monitoring system.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500">(4.9)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹18,999</span>
                <span className="text-sm text-gray-500 line-through">₹22,999</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
            <div className="water-light p-8">
              <svg className="w-24 h-24 mx-auto text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AquaPure Essential</h3>
              <p className="text-gray-600 mb-4">Compact 5-stage RO system perfect for small families with essential purification features.</p>
              <div className="flex items-center mb-4">
                <div className="star-rating flex mr-2">
                  ★★★★☆
                </div>
                <span className="text-sm text-gray-500">(4.7)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-sky-600">₹8,999</span>
                <span className="text-sm text-gray-500 line-through">₹10,999</span>
              </div>
              <button className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDeals;
