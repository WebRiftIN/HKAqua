import React from 'react'

function ContactMethods() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Multiple Ways to Reach Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the most convenient way to get in touch with our team</p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="contact-card bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 water-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-phone text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak directly with our experts</p>
            <div className="space-y-2">
              <div className="font-semibold text-sky-600"><a href="tel:+917404471942">+91 740-447-1942</a></div>
              <div className="text-sm text-gray-500">Mon-Sat: 9AM-8PM</div>
              <div className="text-sm text-gray-500">Sun: 9AM-6PM</div>
            </div>
          </div>

          <div className="contact-card bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 water-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-envelope text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us your questions anytime</p>
            <div className="space-y-2">
              <div className="font-semibold text-sky-600">hkaquafreshro@gmail.com</div>
              <div className="text-sm text-gray-500">Response within 12 hours</div>
              <div className="text-sm text-gray-500">Available 24/7</div>
            </div>
          </div>

          <div className="contact-card bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 water-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-comments text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-4">Instant support via chat</p>
            <div className="space-y-2">
              <button
                onClick={() => alert('Live chat feature will be available soon! Please use our contact form or call us directly.')}
                className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                Start Chat
              </button>
              <div className="text-sm text-gray-500">Available 9AM-6PM</div>
            </div>
          </div>

          <div className="contact-card bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 water-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-map-marker-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come to our shop</p>
            <div className="space-y-2">
              <div className="font-semibold text-sky-600">6129, MACHHI MOHALLA</div>
              <div className="text-sm text-gray-500">Ambala Cantt, PC 133001</div>
              <div className="text-sm text-gray-500">Available 9AM-8PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMethods


