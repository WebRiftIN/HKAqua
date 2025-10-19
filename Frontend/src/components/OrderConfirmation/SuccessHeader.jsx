import React from 'react'

function SuccessHeader() {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-green-400 rounded-full pulse-ring"></div>
        <div className="relative w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center success-bounce shadow-2xl">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path className="checkmark-draw" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4">Order Confirmed!</h1>
      <p className="text-xl text-gray-600 mb-2">Thank you for choosing hK aquafresh</p>
      <p className="text-gray-500">Your order has been successfully placed and is being processed</p>
    </div>
  )
}

export default SuccessHeader




