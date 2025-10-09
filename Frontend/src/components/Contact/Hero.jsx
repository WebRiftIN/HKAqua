import React from 'react'

function Hero() {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: 'none' }}>
      <div className="absolute inset-0 wave-bg opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[40vh]">
        <h1
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-center text-sky-900"
          style={{ textShadow: '0 2px 8px rgba(14,165,233,0.15)' }}
        >
          GET in Touch
        </h1>
        <p
          className="text-xl mb-2 text-center text-sky-800 max-w-xl"
          style={{ textShadow: '0 1px 4px rgba(14,165,233,0.10)' }}
        >
          Have questions about our water purification systems?
          <br />
          Our expert team is here to help you find the perfect solution for your needs.
        </p>
      </div>
    </section>
  )
}

export default Hero


