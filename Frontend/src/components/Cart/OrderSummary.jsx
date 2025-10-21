import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderSummary({ subtotal, discount, gst, onApplyCoupon, couponApplied, showCoupon = true, showProceed = true, showPaymentIcons = true, isSticky = true, priceDiscount = 0, couponDiscount = 0 }) {
  const total = Math.max(0, subtotal - discount)
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
        {priceDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Price Discount</span>
            <span className="font-semibold text-green-600">-₹{priceDiscount.toLocaleString()}</span>
          </div>
        )}
        {couponDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Coupon Discount</span>
            <span className="font-semibold text-green-600">-₹{couponDiscount.toLocaleString()}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Total Discount</span>
            <span className="font-semibold text-green-600">-₹{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Charges</span>
          <span className="font-semibold text-green-600">FREE</span>
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
    </div>
  )
}

export default OrderSummary


