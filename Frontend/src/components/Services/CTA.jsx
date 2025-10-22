import React from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section className="py-16 sm:py-20 water-gradient-light text-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg sm:text-xl text-blue-800 mb-8 max-w-3xl mx-auto leading-relaxed">
          Contact us today for a free consultation and let our experts help you choose the perfect water purification solution for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to='tel:8168171942' className="bg-white text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-50 transition-all ripple-effect transform hover:scale-105">Call Now: 81-681-HKhK aquafresh</Link>
          <Link to='/contact' className="border-2 border-blue-600 text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-sky-600 transition-all transform hover:scale-105">Get Free Quote</Link>
        </div>
      </div>
    </section>
  )
}

export default CTA



