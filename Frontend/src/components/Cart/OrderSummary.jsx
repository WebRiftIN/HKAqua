import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderSummary({ subtotal, discount, gst, onApplyCoupon, couponApplied, showCoupon = true, showProceed = true, showPaymentIcons = true, isSticky = true }) {
  const total = Math.max(0, subtotal - discount + gst)
  const navigate = useNavigate()
  const containerClass = `bg-white rounded-xl shadow-lg p-6 ${isSticky ? 'sticky top-24' : ''}`

  return (
    <div className={containerClass}>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-semibold text-green-600">-₹{discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Charges</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-semibold">₹{gst.toLocaleString()}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-blue-600">₹{total.toLocaleString()}</span>
        </div>
      </div>

      {showCoupon && (
        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={couponApplied}
              id="coupon-input"
            />
            <button
              onClick={() => onApplyCoupon(document.getElementById('coupon-input')?.value || '')}
              disabled={couponApplied}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${couponApplied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              {couponApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">Available coupons: SAVE10, FIRST20, WELCOME15</div>
        </div>
      )}

      {showProceed && (
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors ripple-effect mb-4" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      )}

      <div className="text-center text-sm text-gray-500">
        <i className="fas fa-lock mr-1"></i>
        Secure checkout with 256-bit SSL encryption
      </div>

      {showPaymentIcons && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">We accept:</p>
          <div className="flex items-center space-x-2">
            <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
            <i className="fab fa-cc-mastercard text-2xl text-red-500"></i>
            <i className="fab fa-cc-paypal text-2xl text-blue-500"></i>
            <i className="fas fa-university text-2xl text-gray-600"></i>
            <span className="text-xs text-gray-500">+more</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderSummary


