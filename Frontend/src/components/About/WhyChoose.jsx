import React from 'react'

function Feature({ title, children }) {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  )
}

function WhyChoose() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="gradient-text">HK Aquafresh</span></h2>
          <div className="gradient-underline mx-auto"></div>
          <p className="text-gray-700 text-lg mt-6 max-w-2xl mx-auto">We combine technical expertise with creative vision to deliver exceptional Water Cleaning solutions.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <Feature title="Fast Delivery">We deliver Products faster than industry average without compromising on quality. Our streamlined processes ensure rapid iterations and quick time-to-deliver.</Feature>
            <Feature title="100% Quality Guarantee">Every Product undergoes rigorous testing and quality assurance. We Provide perfect Product designs as image with ongoing support & service.</Feature>
            <Feature title="Expert Water Purification Team">HK Aquafresh boasts a team of highly skilled engineers and water quality specialists dedicated to delivering the best RO water purifiers.</Feature>
            <Feature title="24/7 Support">Round-the-clock support and maintenance. We're always available to help you with Support and Services of Water purification.</Feature>
          </div>

          <div className="relative">
            <div className="card-gradient rounded-3xl p-8 border border-blue-500/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Track Record</h3>
                <p className="text-gray-700">Numbers that speak for our excellence</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-black/20 rounded-xl border border-blue-500/10">
                  <div className="text-3xl font-bold gradient-text mb-2">4k+</div>
                  <div className="text-gray-700 text-sm">Products Delivered</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-xl border border-blue-500/10">
                  <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                  <div className="text-gray-700 text-sm">Client Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-xl border border-blue-500/10">
                  <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                  <div className="text-gray-700 text-sm">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-xl border border-blue-500/10">
                  <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                  <div className="text-gray-700 text-sm">Support Available</div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Client Retention Rate</span>
                  <span className="font-bold text-blue-400">95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">On-Time Delivery</span>
                  <span className="font-bold text-cyan-400">99%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose





