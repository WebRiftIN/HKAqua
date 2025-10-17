import React, { useMemo, useState } from 'react'
import './Booking.css'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/ShopContext'
import Waves from '../components/Waves'

const serviceCards = [
  {
    key: 'installation',
    title: 'RO Installation',
    subtitle: 'New system setup',
    desc: 'Professional installation',
    price: 'Starting from ₹350',
    color: 'blue',
    iconPath: 'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z',
  },
  {
    key: 'repair',
    title: 'RO Repair',
    subtitle: 'Fix existing issues',
    desc: 'Quick diagnosis and repair with genuine parts',
    price: 'Starting from ₹200',
    color: 'red',
    iconPath: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z',
  },
  {
    key: 'maintenance',
    title: 'RO Maintenance',
    subtitle: 'Regular servicing',
    desc: 'Filter replacement and system cleaning',
    price: 'Starting from ₹200',
    color: 'green',
    iconPath: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z',
  },
  {
    key: 'commercial',
    title: 'Commercial RO',
    subtitle: 'Business solutions',
    desc: 'Large capacity systems for offices and restaurants',
    price: 'Custom Quote',
    color: 'purple',
    iconPath: 'M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z',
  },
]

function Booking() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    pincode: '',
    selectedService: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const {axios} = useAppContext()

  function onChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function selectService(key) {
    setForm((f) => ({ ...f, selectedService: key }))
  }

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.phone.trim() &&
      form.street.trim() &&
      form.city &&
      form.pincode.trim().length === 6 &&
      form.selectedService
    )
  }, [form])

  const handleSubmit= async(e) =>{
    e.preventDefault()
    setSubmitted(true)
    const payload = {
    name: form.fullName,
    phoneNumber: form.phone,
    email: form.email,
    address: form.street,     // backend expects `address`
    city: form.city,
    pincode: form.pincode,
    serviceType: form.selectedService // backend expects `serviceType`
  }
    try {
      const response = await axios.post('/api/service/bookservice',payload)
      if(response.data.success){
        toast.success(response.data.message)
        resetForm()
      }else{
        toast.message(response.data.message)
      }
    } catch (error) {
      toast.error(error.message||"try again")
    }finally{
      setSubmitted(false)
    }
  }

  function resetForm() {
    setSubmitted(false)
    setForm({ fullName: '', phone: '', email: '', street: '', city: '', pincode: '', selectedService: '' })
  }

  return (
    <>
    <Waves />
    <section id="booking" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-6">Book Your Service</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Fill out the form below and our expert technicians will contact you within 2 hours to confirm your appointment</p>
        </div>

        <div className="form-container rounded-lg p-8 shadow-lg">
          {!submitted ? (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label  htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input onChange={onChange} value={form.fullName} type="text" id="fullName" name="fullName" required className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label value={form.phone} onChange={onChange} htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none" placeholder="+91 98765 43210" value={form.phone} onChange={onChange} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none" placeholder="your.email@example.com" value={form.email} onChange={onChange} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  Service Address
                </h3>
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <textarea id="street" name="street" required rows={3} className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none resize-none" placeholder="House/Flat No., Street Name, Locality" value={form.street} onChange={onChange}></textarea>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <select id="city" name="city" required className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none" value={form.city} onChange={onChange}>
                      <option value="">Select City</option>
                      <option value="ambala">Ambala</option>
                      <option value="ambala-city">Ambala City</option>
                      <option value="ambala-cantt">Ambala Cantt</option>
                      <option value="lalru">Lalru</option>
                      <option value="kurali">Kurali</option>
                      <option value="kharar">Kharar</option>
                      <option value="mohali">Mohali</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                    <input type="text" id="pincode" name="pincode" required className="input-field w-full px-4 py-3 rounded-xl border focus:outline-none" placeholder="134003" maxLength={6} value={form.pincode} onChange={onChange} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  Select Service
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {serviceCards.map((card) => (
                    <div key={card.key} className={`service-option p-6 rounded-xl border-2 ${form.selectedService === card.key ? 'border-blue-500' : 'border-gray-200'} bg-white cursor-pointer`} onClick={() => selectService(card.key)}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-${card.color}-100 rounded-full flex items-center justify-center mr-4`}>
                          <svg className={`w-6 h-6 text-${card.color}-600`} fill="currentColor" viewBox="0 0 20 20">
                            <path d={card.iconPath} />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{card.title}</h4>
                          <p className="text-sm text-gray-600">{card.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{card.desc}</p>
                      <div className={`mt-4 text-${card.color}-600 font-semibold`}>{card.price}</div>
                      <p className="text-gray-600 text-sm">* All prices are Starting Price and may vary depending on the complexity of the service</p>
                    </div>
                  ))}
                </div>
                <input type="hidden" name="selectedService" required value={form.selectedService} readOnly />
              </div>

              <div className="text-center pt-6">
                <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700" >Book Service Now</button>
                <p className="text-sm text-gray-600 mt-4">* Our team will contact you within 2 hours to confirm your appointment</p>
              </div>
            </form>
          ) : (
            <div id="successMessage" className="success-message text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">Thank you for choosing hK aquafresh. Our team will contact you shortly to confirm your appointment.</p>
              <button onClick={resetForm} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Book Another Service</button>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
}

export default Booking

