import React from 'react'

function PaymentMethod({ value = 'cod', onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
        </svg>
        Payment Method
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <div className="flex items-center space-x-4">
          <input type="radio" id="cod" name="paymentMethod" value="cod" checked={value === 'cod'}
                 onChange={(e) => onChange && onChange(e.target.value)} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
          <label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 10a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm6 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">Cash on Delivery (COD)</div>
              <div className="text-sm text-gray-600">Pay when your RO system is delivered</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod





