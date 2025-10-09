import React, { useEffect } from 'react'
import Hero from '../components/Services/Hero'
import Overview from '../components/Services/Overview'
import Installation from '../components/Services/Installation'
import Commercial from '../components/Services/Commercial'
import Maintenance from '../components/Services/Maintenance'
import CTA from '../components/Services/CTA'
import '../components/Services/services.css'

function Services() {
  useEffect(() => {
    // simple hover lift using CSS transitions already in services.css
    // ripple effect handler
    const buttons = Array.from(document.querySelectorAll('.ripple-effect'))
    const handlers = buttons.map((btn) => {
      const handler = (e) => {
        const ripple = document.createElement('span')
        const rect = btn.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        ripple.classList.add('ripple')
        btn.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)
      }
      btn.addEventListener('click', handler)
      return { btn, handler }
    })
    return () => {
      handlers.forEach(({ btn, handler }) => btn.removeEventListener('click', handler))
    }
  }, [])

  return (
    <div>
      <Hero />
      <Overview />
      <Installation />
      <Commercial />
      <Installation />
      <Maintenance />
      <CTA />
    </div>
  )
}

export default Services



