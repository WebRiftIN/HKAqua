import React, { useState } from 'react'

function FAQItem({ question, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <i className={`fas fa-chevron-down text-sky-500 transform transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="px-8 pb-6 text-gray-600">
          {children}
        </div>
      )}
    </div>
  )
}

function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Quick answers to common questions about our products and services</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <FAQItem question="How often should I replace the filters?">
            <p>Filter replacement frequency depends on your water usage and quality. Generally, we recommend replacing filters every 3-4 months for optimal performance. Our systems include filter bottle with free 3 services for chaning water filters. We also provide a free water filter service for our customers.</p>
          </FAQItem>

          <FAQItem question="Do you provide installation services?">
            <p>Yes, we provide professional installation services by certified technicians. Installation is included with most of our systems, and we also offer same-day installation in most areas. Our team will ensure your system is properly set up and functioning optimally.</p>
          </FAQItem>

          <FAQItem question="What warranty do you offer?">
            <p>We offer comprehensive warranty coverage: 1 year on the system, 1 year on electrical components, and 1 year on filters. Our warranty includes free repairs, replacement parts, and technical support. Extended warranty options are also available.</p>
          </FAQItem>

          <FAQItem question="How much water does the system waste?">
            <p>Our advanced RO systems are designed for efficiency. Modern systems typically have a 1:1 to 1:3 pure to waste water ratio, which is significantly better than older systems. The waste water can be collected and used for gardening or cleaning purposes.</p>
          </FAQItem>
        </div>
      </div>
    </section>
  )
}

export default FAQ


