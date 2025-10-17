import React from 'react'
import { Link } from 'react-router-dom'
import heroservicesimg from '../../assets/homepageimg.png'

function Hero() {

  const scrollToServicesBottom = (e) => {
    e?.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-5 pt-15" style={{ background: 'none' }}>
      <div className="absolute inset-0 wave-bg opacity-30"></div>
      <div className="container mx-auto py-30 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              Professional
              <span className="block text-title">Water Services</span>
            </h1>
            <p className="hero-subtitle text-md sm:text-xl lg:text-2xl mb-8 leading-relaxed">
              Complete RO solutions from installation to maintenance - ensuring pure water for your family and business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/booking"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all ripple-effect transform hover:scale-105 inline-block text-center"
              >
                Book Service Now
              </Link>

              <button
                onClick={scrollToServicesBottom}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                type="button"
              >
                View All Services
              </button>
            </div>
          </div>

          <div className="relative hero-image">
            <div className="floating-element">
              <div className="service-image h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                <img
                  src={heroservicesimg}
                  alt="heroservices image"
                  className="w-full h-full object-cover rounded-xl "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero






