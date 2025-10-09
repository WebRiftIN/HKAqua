import React from 'react'
import Hero from '../components/Contact/Hero'
import ContactMethods from '../components/Contact/ContactMethods'
import ContactForm from '../components/Contact/ContactForm'
import FAQ from '../components/Contact/FAQ'

function Contact() {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <Hero />
      <ContactMethods />
      <ContactForm />
      <FAQ />
    </div>
  )
}

export default Contact

