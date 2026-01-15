


import React, { useState } from 'react';
import axios from 'axios';

const OrderCard = ({ order, onCancelOrder, onGetSupport }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get userId from localStorage (user object stored as JSON)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user._id;

      if (!userId) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: {
          // Uncomment and set your token if required by backend:
          // Authorization: `Bearer ${token}`
        }
      };

      // Use order._id instead of order.id for MongoDB ObjectId
      const orderId = order._id || order.id;
      const response = await axios.patch(`/api/order/${orderId}/cancel`, { userId }, config);

      if (response.data.success) {
        setStatus('cancelled');
        setLoading(false);
        if (onCancelOrder) onCancelOrder(orderId);
      } else {
        throw new Error(response.data.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error('Cancel order error:', err);
      if (err.response) {
        console.error('Backend response:', err.response);
      }
      let msg = 'Failed to cancel order.';
      if (err.response && err.response.data && err.response.data.message) {
        msg += ' ' + err.response.data.message;
      }
      setError(msg);
      setLoading(false);
    }
  };

  const canCancel = status === 'pending' || status === 'processing';

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      'out-for-delivery': 'bg-cyan-100 text-cyan-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full font-semibold text-xs ${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    );
  };

  const getOrderSummaryBg = (status) => {
    if (status === 'cancelled') return 'bg-red-50';
    if (status === 'delivered') return 'bg-green-50';
    return 'bg-gray-50';
  };

  const getTotalColor = (status) => {
    if (status === 'cancelled') return 'text-red-600';
    if (status === 'delivered') return 'text-green-600';
    return 'text-gray-800';
  };

  return (
    <div className="order-item bg-white rounded-2xl shadow-xl p-8 card-hover order-fade-in" data-status={status}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Order #{order.id}</h3>
          <p className="text-gray-600">
            Placed on {order.placedDate}
            {order.deliveredDate && ` • Delivered on ${order.deliveredDate}`}
            {order.cancelledDate && ` • Cancelled on ${order.cancelledDate}`}
            {order.expectedDelivery && (status === 'shipped' || status === 'processing' || status === 'out-for-delivery') && ` • Expected delivery: ${new Date(order.expectedDelivery).toLocaleDateString('en-IN')}`}
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          {getStatusBadge(status)}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{order.product.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Model:</span> {order.product.model}</p>
                <p><span className="font-medium">Quantity:</span> {order.product.quantity}</p>
                <p><span className="font-medium">Warranty:</span> {order.product.warranty}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${getOrderSummaryBg(status)} p-4 rounded-xl`}>
          <h5 className="font-semibold text-gray-800 mb-3">Order Summary</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Product Price:</span>
              <span className="font-medium">
                {status === 'cancelled' ? (
                  <span className="line-through">₹{order.pricing.productPrice.toLocaleString()}</span>
                ) : (
                  `₹${order.pricing.productPrice.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Installation:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg">
              <span>{status === 'cancelled' ? 'Total:' : 'Total:'}</span>
              <span className={getTotalColor(status)}>
                ₹{order.pricing.productPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {canCancel && (
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
            <span>{loading ? 'Cancelling...' : 'Cancel Order'}</span>
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
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default OrderCard;