import React from 'react'
import OrderSummary from '../Cart/OrderSummary'

function OrderCard({ order, onCancelOrder, onGetSupport }) {
  const getStatusBadge = (status) => {
    const statusClasses = {
      delivered: 'status-delivered text-white px-4 py-2 rounded-full font-semibold text-sm',
      shipped: 'status-shipped text-white px-4 py-2 rounded-full font-semibold text-sm',
      processing: 'status-processing text-white px-4 py-2 rounded-full font-semibold text-sm',
      cancelled: 'status-cancelled text-white px-4 py-2 rounded-full font-semibold text-sm'
    }
    
    const statusLabels = {
      delivered: 'Delivered',
      shipped: 'Out for Delivery',
      processing: 'Processing',
      cancelled: 'Cancelled'
    }
    
    return (
      <span className={statusClasses[status]}>
        {statusLabels[status]}
      </span>
    )
  }

  const getOrderSummaryBg = (status) => {
    const bgClasses = {
      delivered: 'bg-green-50',
      shipped: 'bg-blue-50',
      processing: 'bg-orange-50',
      cancelled: 'bg-red-50'
    }
    return bgClasses[status] || 'bg-gray-50'
  }

  const getTotalColor = (status) => {
    const colorClasses = {
      delivered: 'text-green-600',
      shipped: 'text-blue-600',
      processing: 'text-orange-600',
      cancelled: 'text-red-600'
    }
    return colorClasses[status] || 'text-gray-600'
  }

  const canCancel = order.status === 'processing'

  return (
    <div className="order-item bg-white rounded-2xl shadow-xl p-8 card-hover order-fade-in" data-status={order.status}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Order #{order.id}</h3>
          <p className="text-gray-600">
            Placed on {order.placedDate}
            {order.deliveredDate && ` • Delivered on ${order.deliveredDate}`}
            {order.cancelledDate && ` • Cancelled on ${order.cancelledDate}`}
            {order.expectedDeliveryDate && order.status === 'shipped' && ` • Expected delivery: ${order.expectedDeliveryDate}`}
            {order.expectedDeliveryDate && order.status === 'processing' && ` • Expected delivery: ${order.expectedDeliveryDate}`}
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Product Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center floating">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{order.product.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Model:</span> {order.product.model}</p>
                <p><span className="font-medium">Quantity:</span> {order.product.quantity}</p>
                <p><span className="font-medium">Color:</span> {order.product.color}</p>
                <p><span className="font-medium">Warranty:</span> {order.product.warranty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className={`${getOrderSummaryBg(order.status)} p-4 rounded-xl`}>
          <h5 className="font-semibold text-gray-800 mb-3">Order Summary</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Product Price:</span>
              <span className="font-medium">
                {order.status === 'cancelled' ? (
                  <span className="line-through">₹{order.pricing.productPrice.toLocaleString()}</span>
                ) : (
                  `₹${order.pricing.productPrice.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Installation:</span>
              <span className="font-medium">
                {order.status === 'cancelled' ? (
                  <span className="line-through">₹{order.pricing.installation.toLocaleString()}</span>
                ) : (
                  `₹${order.pricing.installation.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST:</span>
              <span className="font-medium">
                {order.status === 'cancelled' ? (
                  <span className="line-through">₹{order.pricing.gst.toLocaleString()}</span>
                ) : (
                  `₹${order.pricing.gst.toLocaleString()}`
                )}
              </span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg">
              <span>{order.status === 'cancelled' ? 'Refunded:' : 'Total:'}</span>
              <span className={getTotalColor(order.status)}>
                ₹{order.pricing.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {canCancel && (
          <button 
            onClick={() => onCancelOrder(order.id)}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
            <span>Cancel Order</span>
          </button>
        )}
        
        <button 
          onClick={() => onGetSupport(order.id)}
          className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
          </svg>
          <span>Support</span>
        </button>
      </div>
    </div>
  )
}

export default OrderCard
