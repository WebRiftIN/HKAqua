import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Waves from '../components/Waves'
import ProgressBar from '../components/Cart/ProgressBar'
import OrderSummary from '../components/Cart/OrderSummary'
import PersonalInfo from '../components/Checkout/PersonalInfo'
import AddressInfo from '../components/Checkout/AddressInfo'
import PaymentMethod from '../components/Checkout/PaymentMethod'
import SuccessModal from '../components/Checkout/SuccessModal'

function Checkout() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', pincode: '', landmark: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [modalOpen, setModalOpen] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Reuse same payment info section numbers as Cart page example
  const items = [
    { label: 'hK aquafresh RO System', price: 15999 },
    { label: 'Installation', price: 1500 }
  ]
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price, 0), [])
  const [baseDiscount, setBaseDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const discount = baseDiscount
  const gst = Math.round(subtotal * 0.18)

  function onChange(e) {
    const { name, value } = e.target
    if (name === 'phone') {
      const v = value.replace(/\D/g, '').slice(0, 10)
      setForm(prev => ({ ...prev, [name]: v }))
      setErrors(prev => { const c = { ...prev }; delete c[name]; return c })
      return
    }
    if (name === 'pincode') {
      const v = value.replace(/\D/g, '').slice(0, 6)
      setForm(prev => ({ ...prev, [name]: v }))
      setErrors(prev => { const c = { ...prev }; delete c[name]; return c })
      return
    }
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => { const c = { ...prev }; delete c[name]; return c })
  }

  // Validate fields and return an object with errors (empty if valid)
  function validate() {
    const errs = {}
    if (!String(form.firstName || '').trim()) errs.firstName = 'First name is required'
    if (!String(form.lastName || '').trim()) errs.lastName = 'Last name is required'
    if (!String(form.email || '').trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!String(form.phone || '').trim()) errs.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit phone number'
    if (!String(form.street || '').trim()) errs.street = 'Street address is required'
    if (!String(form.city || '').trim()) errs.city = 'City is required'
    if (!String(form.state || '').trim()) errs.state = 'State is required'
    if (!String(form.pincode || '').trim()) errs.pincode = 'PIN code is required'
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit PIN code'

    setErrors(errs)
    return errs
  }

  function submit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      // focus/scroll first invalid field
      const first = Object.keys(errs)[0]
      const el = document.getElementById(first)
      if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const id = `#AP${new Date().getFullYear()}${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`
    setOrderId(id)
    navigate('/confirmation')
  }

  function applyCoupon(code) {
    const coupons = { SAVE10: 10, FIRST20: 20, WELCOME15: 15 }
    const pct = coupons[(code || '').toUpperCase()]
    if (!pct || couponApplied) return
    const additional = Math.round(subtotal * pct / 100)
    setBaseDiscount(d => d + additional)
    setCouponApplied(true)
  }

  function closeModal() {
    setModalOpen(false)
    setForm({ firstName:'', lastName:'', email:'', phone:'', street:'', city:'', state:'', pincode:'', landmark:'' })
  }

  return (
    <>
      <Waves />
      <ProgressBar currentStep={2} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Pure water, delivered to your doorstep</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 water-ripple">
          <form onSubmit={submit} className="space-y-8">
            <PersonalInfo form={form} onChange={onChange} errors={errors} />
            <AddressInfo form={form} onChange={onChange} errors={errors} />
            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              gst={gst}
              couponApplied={couponApplied}
              onApplyCoupon={applyCoupon}
              showCoupon={false}
              showProceed={false}
              showPaymentIcons={false}
              isSticky={false}
            />

            <div className="text-center">
              <button type="submit" id="placeOrderBtn"
                      className="water-gradient text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <span className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                  <span>Place Order</span>
                </span>
              </button>
            </div>
          </form>
        </div>

        <SuccessModal open={modalOpen} orderId={orderId} onClose={closeModal} />
      </main>
    </>
  )
}

export default Checkout


