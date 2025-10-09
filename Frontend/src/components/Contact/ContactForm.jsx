import React, { useState } from 'react'
import { useAppContext } from '../../context/ShopContext'
import toast from 'react-hot-toast'


function ContactForm() {

  const { axios } = useAppContext()

  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent,setSent] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      const response = await axios.post('/api/customer/contact', { name, phoneNumber, email, subject, message })
      if (response.data.success) {
        toast.success(response.data.message)
        setSent(true)
        setName('')
        setPhoneNumber('')
        setEmail('')
        setSubject('')
        setMessage('')
        setTimeout(()=>setSent(false),10000)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message || "Try again")
    }
    setSubmitted(false)
  }

  return (
    <section className="py-20 bg-white xl-px-20 lg:px-10 md:px-6 sm:px-4" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Send us a Message</h2>
              <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Full Name *</label>
                  <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your full name" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Phone Number *</label>
                  <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} type="tel" name="phoneNumber" className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your phone number" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Email Address </label>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your email address" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Subject</label>
                <select
                  name="subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="installation">Installation Service</option>
                  <option value="maintenance">Maintenance Request</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Message *</label>
                <textarea onChange={e => setMessage(e.target.value)} value={message} name="message" rows={6} className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none" placeholder="Tell us how we can help you..." required></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input type="checkbox" id="newsletter" className="mt-1 w-5 h-5 text-sky-600 border-2 border-gray-300 rounded focus:ring-sky-500" />
                <label htmlFor="newsletter" className="text-gray-600">I would like to receive updates about new products and special offers</label>
              </div>

              <button disabled={submitted} type="submit" className="w-full bg-sky-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-sky-600 transition-all transform hover:scale-105 shadow-lg">
                {submitted ? 'Sending...' : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </>
                )}
              </button>

              <div className={`success-message bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl ${sent ? 'show' : ''}`}>
                <i className="fas fa-check-circle mr-2"></i>
                Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 water-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Main Shop</div>
                    <div className="text-gray-600">6129, MACHHI MOHALLA</div>
                    <div className="text-gray-600">Ambala Cantt, PC 133001</div>
                    <div className="text-gray-600">India</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 water-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Phone Numbers</div>
                    <div className="text-gray-600"><a href="tel:+918168171942">Main: +91 816-817-1942</a></div>
                    <div className="text-gray-600"><a href="tel:+917404471942">Support: +91 740-447-1942</a></div>
                    <div className="text-gray-600"><a href="tel:+919466822582">Support 2: +91 946-682-2582</a></div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 water-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Email Addresses</div>
                    <div className="text-gray-600">General: hkaquafresh@gmail.com</div>
                    <div className="text-gray-600">Support: luxmitrders54@gmail.com</div>
                    <div className="text-gray-600">Sales: bgambhir9@gmial.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 water-gradient rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Business Hours</div>
                    <div className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</div>
                    <div className="text-gray-600">Sunday: 9:00 AM - 6:00 PM</div>
                    <div className="text-sm text-sky-600 mt-2">Emergency service available 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Our Location</h3>
              <div className="w-full h-80 bg-gray-300 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.506555358372!2d76.83665479999999!3d30.3365505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb75492837e45%3A0xe0141de3c11d9352!2sHk%20AQUAFRESH%20RO!5e0!3m2!1sen!2sin!4v1758734695691!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => window.open('https://maps.google.com/?q=123+Water+Street,+Pure+City,+PC+12345', '_blank', 'noopener,noreferrer')}
                  className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <i className="fas fa-directions mr-2"></i>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm


