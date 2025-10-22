import React, { useMemo, useState } from 'react'

function OrderManagement() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [view, setView] = useState('list') // 'list' | 'details'
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      productName: 'AquaPure RO Premium 7-Stage',
      productImage: null,
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 9876543210',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      quantity: 1,
      discountedPrice: 15999,
      originalPrice: 18999,
      paymentType: 'Online Payment',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-22',
      status: 'confirmed',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      productName: 'AquaPure UV Filter Pro',
      productImage: null,
      customerName: 'Priya Sharma',
      customerPhone: '+91 9876543211',
      address: '456 Park Street, Mumbai, Maharashtra 400001',
      quantity: 2,
      discountedPrice: 8999,
      originalPrice: 11999,
      paymentType: 'Cash on Delivery',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-23',
      status: 'shipped',
      trackingNumber: 'TRK123456790'
    },
    {
      id: 'ORD-2024-003',
      productName: 'AquaPure UF Standard',
      productImage: null,
      customerName: 'Amit Patel',
      customerPhone: '+91 9876543212',
      address: '789 Civil Lines, Delhi, Delhi 110001',
      quantity: 1,
      discountedPrice: 6999,
      originalPrice: 8999,
      paymentType: 'UPI Payment',
      orderDate: '2024-01-17',
      deliveryDate: '2024-01-24',
      status: 'pending',
      trackingNumber: 'TRK123456791'
    },
    {
      id: 'ORD-2024-004',
      productName: 'AquaPure Alkaline Plus',
      productImage: null,
      customerName: 'Sunita Reddy',
      customerPhone: '+91 9876543213',
      address: '321 Jubilee Hills, Hyderabad, Telangana 500001',
      quantity: 1,
      discountedPrice: 22999,
      originalPrice: 25999,
      paymentType: 'Credit Card',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-25',
      status: 'delivered',
      trackingNumber: 'TRK123456792'
    },
    {
      id: 'ORD-2024-005',
      productName: 'AquaPure Commercial RO',
      productImage: null,
      customerName: 'Vikram Singh',
      customerPhone: '+91 9876543214',
      address: '654 Sector 15, Gurgaon, Haryana 122001',
      quantity: 1,
      discountedPrice: 45999,
      originalPrice: 52999,
      paymentType: 'Bank Transfer',
      orderDate: '2024-01-19',
      deliveryDate: '2024-01-26',
      status: 'cancelled',
      trackingNumber: 'TRK123456793'
    }
  ])

  const selectedOrder = useMemo(() => orders.find(o => o.id === selectedOrderId) || null, [orders, selectedOrderId])

  const toggleMobileMenu = () => setMobileOpen(x => !x)
  const showOrderList = () => { setView('list'); setSelectedOrderId(null) }
  const showOrderDetails = (orderId) => { setSelectedOrderId(orderId); setView('details') }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'orange', text: 'Pending' },
      confirmed: { color: 'blue', text: 'Confirmed' },
      processing: { color: 'purple', text: 'Processing' },
      shipped: { color: 'indigo', text: 'Shipped' },
      'out-for-delivery': { color: 'yellow', text: 'Out for Delivery' },
      delivered: { color: 'green', text: 'Delivered' },
      cancelled: { color: 'red', text: 'Cancelled' },
      returned: { color: 'gray', text: 'Returned' }
    }
    const cfg = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 text-xs font-medium bg-${cfg.color}-100 text-${cfg.color}-800 rounded-full status-badge`}>{cfg.text}</span>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  const updateDeliveryInfo = (orderId, deliveryDate, trackingNumber) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, deliveryDate, trackingNumber } : o)))
  }

  const sendNotification = () => window.alert('📱 Status update notification sent to customer')
  const printInvoice = () => window.alert('🖨️ Invoice is being prepared for printing')
  const cancelOrder = (orderId) => {
    if (window.confirm(`⚠️ Are you sure you want to cancel order ${orderId}?\n\nThis action cannot be undone.`)) {
      updateStatus(orderId, 'cancelled')
      window.alert(`❌ Order ${orderId} has been cancelled`)
      showOrderList()
    }
  }

  const totalStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  }), [orders])

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {view === 'list' && (
          <div id="order-list-section">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
                  <p className="text-gray-600">Track and manage all customer orders</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <select className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
                    <option value="">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 6h4"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold text-gray-900">{totalStats.total}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-orange-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-gray-900">{totalStats.pending}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-xl font-bold text-gray-900">{totalStats.confirmed}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Shipped</p>
                    <p className="text-xl font-bold text-gray-900">{totalStats.shipped}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-green-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-100">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                    <p className="text-xl font-bold text-gray-900">{totalStats.delivered}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-sky-500 to-sky-400">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => {
                      const totalAmount = order.discountedPrice * order.quantity
                      return (
                        <tr key={order.id} className="table-row">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-sky-600">{order.id}</div>
                            <div className="text-xs text-gray-500">{order.orderDate}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-xs text-gray-500">{order.customerPhone}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{order.quantity}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm font-bold text-sky-600">₹{totalAmount.toLocaleString()}</div>
                            <div className="text-xs text-gray-400 line-through">₹{(order.originalPrice * order.quantity).toLocaleString()}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-600">{order.paymentType}</div>
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button onClick={() => showOrderDetails(order.id)} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200">View</button>
                              <button onClick={() => updateStatus(order.id, 'confirmed')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200">Update</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {view === 'details' && selectedOrder && (
          <div id="order-details-section">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
                  <p className="text-gray-600">View and manage order information</p>
                </div>
                <button onClick={showOrderList} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">← Back to Orders</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 order-details-card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order {selectedOrder.id}</h2>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(selectedOrder.status)}
                      <span className="text-sm text-gray-500">Ordered on {formatDate(selectedOrder.orderDate)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{selectedOrder.productName}</h4>
                        <p className="text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-sky-600">₹{selectedOrder.discountedPrice.toLocaleString()}</span>
                          <span className="text-sm text-gray-400 line-through">₹{selectedOrder.originalPrice.toLocaleString()}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save ₹{(selectedOrder.originalPrice - selectedOrder.discountedPrice).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span className="font-medium text-gray-900">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span className="text-gray-600">{selectedOrder.customerPhone}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-gray-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span className="text-gray-600">{selectedOrder.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-600">Payment Method:</span><span className="font-medium text-gray-900">{selectedOrder.paymentType}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Subtotal:</span><span className="text-gray-900">₹{(selectedOrder.discountedPrice * selectedOrder.quantity).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Discount:</span><span className="text-green-600">-₹{((selectedOrder.originalPrice - selectedOrder.discountedPrice) * selectedOrder.quantity).toLocaleString()}</span></div>
                      <div className="flex justify-between border-t border-gray-200 pt-2"><span className="font-semibold text-gray-900">Total Amount:</span><span className="font-bold text-sky-600 text-lg">₹{(selectedOrder.discountedPrice * selectedOrder.quantity).toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                        <select value={selectedOrder.status} onChange={(e) => updateStatus(selectedOrder.id, e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200">
                          <option value="pending">Order Pending</option>
                          <option value="confirmed">Order Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="out-for-delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="returned">Returned</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Management</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery Date</label>
                        <input type="date" value={selectedOrder.deliveryDate} onChange={(e) => updateDeliveryInfo(selectedOrder.id, e.target.value, selectedOrder.trackingNumber)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                        <input type="text" value={selectedOrder.trackingNumber} onChange={(e) => updateDeliveryInfo(selectedOrder.id, selectedOrder.deliveryDate, e.target.value)} className="form-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-200" placeholder="Enter tracking number" />
                      </div>
                      <button onClick={() => window.alert('✅ Delivery information updated')} className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">Update Delivery Info</button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-sky-600 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order Placed</p>
                          <p className="text-xs text-gray-500">{formatDate(selectedOrder.orderDate)} at 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${selectedOrder.status !== 'pending' ? 'bg-sky-600' : 'bg-gray-300'} rounded-full`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                          <p className="text-xs text-gray-500">{selectedOrder.status !== 'pending' ? `${formatDate(selectedOrder.orderDate)} at 11:15 AM` : 'Pending'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') ? 'bg-sky-600' : 'bg-gray-300'} rounded-full`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Shipped</p>
                          <p className="text-xs text-gray-500">{(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') ? `${formatDate(selectedOrder.deliveryDate)} at 2:00 PM` : 'Pending'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${selectedOrder.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Delivered</p>
                          <p className="text-xs text-gray-500">{selectedOrder.status === 'delivered' ? `${formatDate(selectedOrder.deliveryDate)} at 4:30 PM` : `Expected: ${formatDate(selectedOrder.deliveryDate)}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button onClick={sendNotification} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">Send Status Update to Customer</button>
                      <button onClick={printInvoice} className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">Print Invoice</button>
                      <button onClick={() => cancelOrder(selectedOrder.id)} className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">Cancel Order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default OrderManagement

