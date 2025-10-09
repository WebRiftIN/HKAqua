import React from 'react'
import Hk_vision from '../../assets/hk_vision.jpg'

function Vision() {
  return (
    <section id="vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="vision-content">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Our Vision</h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              To be the world's leading water purification company, setting new standards in innovation, quality, and customer satisfaction. We envision a future where every drop of water consumed is pure, healthy, and life-enhancing.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              By 2030, we aim to reach 1 million households globally, reducing waterborne illnesses by 80% in the communities we serve, while maintaining our commitment to environmental sustainability and technological excellence.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Vision Goals</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 1M households by 2030</li>
                <li>• 80% reduction in waterborne diseases</li>
                <li>• Carbon-neutral operations</li>
                <li>• Global market leadership</li>
              </ul>
            </div>
          </div>
          <div className="vision-image">
            <img src={Hk_vision} alt="Vision Image" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision





