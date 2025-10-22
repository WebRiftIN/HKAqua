import React from 'react'

function SuccessModal({ open, orderId, onClose }) {
  if (!open) return null
  return (
    <div id="successModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="mb-6">
          {/* Placeholder for lottie; you can replace with a component */}
          <div className="w-[100px] h-[100px] mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 10.435a1 1 0 011.414-1.414l3.051 3.051 6.657-6.657a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h3>
        <p className="text-gray-600 mb-6">Thank you for choosing hK aquafresh. Your RO system will be delivered within 3-5 business days.</p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">Order ID: <span className="font-bold text-sky-600">{orderId}</span></p>
        </div>
        <button onClick={onClose} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default SuccessModal





