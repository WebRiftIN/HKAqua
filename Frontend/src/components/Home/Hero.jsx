import React from 'react';
import '../../pages/Home.css'
import { Link } from 'react-router-dom';
import homepageimg from '../../assets/heroservicesimg.webp';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-sky-900">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Quality<br />
              <span className="text-sky-600">Water Purifiers</span>
            </h1>
            <p className="text-xl mb-8 text-sky-700 leading-relaxed">
              Premium RO Water Purifiers & Free Installation to Your Doorstep. Experience pure, healthy water with our advanced filtration technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-sky-600 text-white hover:bg-sky-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ripple-effect inline-block text-center"
              >
                Shop now
              </Link>
              <Link
                to="/products"
                className="border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-block text-center"
              >
                View Collection
              </Link>
            </div>
          </div>

          <div className="relative flex justify-end">
            <div className="bg-transparent">
              <img
                src={homepageimg}
                alt="Homepage hero"
                className="w-full h-100 object-contain"
              />
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
