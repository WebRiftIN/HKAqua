import React from 'react'
import { Link } from 'react-router-dom'
import Ro_installtion from '../../assets/Ro-installtion.jpg'

function Installation() {
  return (
    <section id="installation" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="installation-content order-2 lg:order-1">
            <div className="flex items-center mb-6">
              <div className="bg-sky-600 rounded-full p-3 mr-4 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-sky-600">RO Installation</h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Professional installation of your RO water purification system by certified technicians. We ensure optimal placement, proper connections, and thorough testing for peak performance.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Proffesional installtion',
                'Same-day installation available',
                'Post-installation support and training',
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
              <button className="w-full sm:w-auto bg-sky-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-sky-500 transition-all ripple-effect service-card transform hover:scale-105">Book Installation Service</button>
            </Link>
          </div>

          <div className="installation-image order-1 lg:order-2">
            <div className="service-image h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <img
                src={Ro_installtion}
                alt="HK Mission"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Installation






