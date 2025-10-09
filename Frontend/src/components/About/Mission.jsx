import React from 'react'
import Hk_mission from '../../assets/hk_mission.jpg'


function Mission() {
  return (
    <section id="mission" className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="mission-image order-2 md:order-1">
            <img src={Hk_mission} alt="Mission Image" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="mission-content order-1 md:order-2">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              To revolutionize water purification technology and make clean, safe drinking water accessible to every household worldwide. We strive to eliminate waterborne diseases and improve public health through innovative, reliable, and affordable water purification solutions.
            </p>
            <div className="space-y-4">
              {['Advanced RO Technology', 'Sustainable Solutions', 'Global Health Impact'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission





