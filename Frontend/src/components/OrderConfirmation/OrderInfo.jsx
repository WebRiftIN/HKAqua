import React from 'react'

function OrderInfo({ orderId, orderDate }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl mb-8 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Order ID</h2>
          <p className="text-2xl font-bold text-blue-600">{orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Order Date</p>
          <p className="text-lg font-semibold text-gray-800">{orderDate}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo





