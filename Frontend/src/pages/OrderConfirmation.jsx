import React, { useEffect, useMemo, useState } from 'react'
import Waves from '../components/Waves'
import SuccessHeader from '../components/OrderConfirmation/SuccessHeader'
import OrderInfo from '../components/OrderConfirmation/OrderInfo'
import ProductDetails from '../components/OrderConfirmation/ProductDetails'
import OrderSummary from '../components/Cart/OrderSummary'

function OrderConfirmation() {
  const [orderId, setOrderId] = useState('')
  const [orderDate, setOrderDate] = useState('')

  useEffect(() => {
    const id = `#AP${new Date().getFullYear()}${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`
    setOrderId(id)
    const today = new Date()
    const formatted = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    setOrderDate(formatted)
  }, [])

  // Reuse cart payment info format using OrderSummary with fixed values
  const items = [
    { label: 'Product Price', price: 15999 },
    { label: 'Installation Charges', price: 1500 }
  ]
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price, 0), [])
  const discount = 0
  const gst = Math.round(subtotal * 0.18)

  return (
    <>
      <Waves />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <SuccessHeader />

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 card-hover">
          <OrderInfo orderId={orderId} orderDate={orderDate} />
          <ProductDetails />

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"/>
              </svg>
              Order Summary
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Product Price</span>
                  <span className="font-semibold">₹{items[0].price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Installation Charges</span>
                  <span className="font-semibold">₹{items[1].price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">₹{gst.toLocaleString()}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{(subtotal - discount + gst).toLocaleString()}</span>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Payment Method: Cash on Delivery (COD)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="water-gradient text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Track Order</span>
              </span>
            </button>
            <button className="cancel-button bg-red-500 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
                <span>Cancel Order</span>
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default OrderConfirmation



