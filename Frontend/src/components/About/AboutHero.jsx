import React from 'react'
import hk_about from '../../assets/hk_about.png'



function AboutHero() {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'none' }}>
      <div className="absolute inset-0 wave-bg opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">About HK Aquafresh</h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              For over 1 decade, HK Aquafresh has been at the forefront of water purification technology. We are committed to providing families across the Haryana and Punjab with access to clean, safe, and healthy drinking water through our innovative RO systems.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Our state-of-the-art manufacturing facilities and rigorous quality control processes ensure that every HK Aquafresh system meets the highest standards of excellence. We believe that clean water is not a luxury, but a fundamental right.
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={hk_about} alt="About HK Aquafresh" className="w-full h-auto rounded-lg shadow-lg floating" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero





