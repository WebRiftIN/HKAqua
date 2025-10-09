import React from 'react';
import '../../pages/Home.css'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-full pt-16 water-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Quality<br />
              <span className="text-sky-200">Water Purifiers</span>
            </h1>
            <p className="text-xl mb-8 text-sky-100 leading-relaxed">
              Premium RO Water Purifiers & Free Installation to Your Doorstep. Experience pure, healthy water with our advanced filtration technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ripple-effect">
                Shop Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                View Collection
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl water-drop">
              <svg className="w-full h-96 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
