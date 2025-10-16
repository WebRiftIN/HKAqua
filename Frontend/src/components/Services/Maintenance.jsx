import React from 'react'
import { Link } from 'react-router-dom'
import ro_Maintenance from '../../assets/ro_maintaince.jpg'

function Maintenance() {
  return (
    <section id="maintenance" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="maintenance-image">
            <div className="service-image h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <img
                src={ro_Maintenance}
                alt="HK Mission"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
          <div className="maintenance-content">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 rounded-full p-3 mr-4 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">RO Maintenance</h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Keep your RO system running at peak performance with our comprehensive maintenance services. Regular servicing extends system life and ensures consistently pure water quality.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Scheduled filter replacements',
                'System sanitization and cleaning',
                'Annual maintenance contracts available',
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
            <Link to="/booking">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all ripple-effect service-card transform hover:scale-105">Schedule Maintenance</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Maintenance






