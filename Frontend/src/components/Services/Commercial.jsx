import React from 'react'
import { Link } from 'react-router-dom'
import commercial_ro from '../../assets/commercial-ro-system.jpg'


function Commercial() {
  return (
    <section id="commercial" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="commercial-image">
            <div className="service-image h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <img
                src={commercial_ro}
                alt="commercial ro"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
          <div className="commercial-content">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 rounded-full p-3 mr-4 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">Commercial RO Services</h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Large-scale water purification solutions for offices, restaurants, hotels, and industrial facilities. Our commercial RO systems deliver high-capacity, reliable water treatment for your business needs.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'High-capacity systems (500-5000 LPH)',
                'Custom design and installation',
                '3 free Services and Regular maintenance',
              ].map((text) => (
                <div key={text} className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>
            <Link to="/booking" className="inline-block w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all ripple-effect service-card transform hover:scale-105">Get Commercial Quote</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Commercial


