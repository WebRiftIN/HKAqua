import React, { useState, useMemo, useEffect } from 'react'
import OrderCard from '../components/Orders/OrderCard'
import OrderStats from '../components/Orders/OrderStats'
import OrderFilters from '../components/Orders/OrderFilters'
import Waves from '../components/Waves'
import { useAppContext } from '../context/ShopContext'
import '../App.css'
import '../index.css'

function MyOrders() {
  const { orders, products, getAllOrders } = useAppContext()
  const [notification, setNotification] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch orders when component mounts
  useEffect(() => {
    if (getAllOrders) {
      getAllOrders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transform orders from database format to display format
  const transformedOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return []
    
    return orders.map(order => {
      // Get products from cartItems
      const orderProducts = []
      let totalInstallation = 0
      
      for (const itemId in order.cartItems) {
        const cartItem = order.cartItems[itemId]
        // Handle both old format (number) and new format (object with quantity)
        const quantity = typeof cartItem === 'object' ? cartItem.quantity : cartItem
        
        if (!quantity || quantity <= 0) continue
        
        // Skip extension items for the main display
        if (itemId.startsWith('warranty:') || itemId.startsWith('maintenance:')) continue
        
        const product = products.find(p => p._id === itemId)
        if (product) {
          orderProducts.push({ ...product, quantity })
          // Add installation charge (₹1500 per product)
          totalInstallation += 1500 * quantity
        }
      }

      // Use the first product as the main product for display
      const mainProduct = orderProducts[0] || {}

      // Use the raw status from database (same as admin panel)
      let status = order.status || 'processing'

      // Calculate pricing breakdown
      const installationCharge = totalInstallation
      const productPrice = order.amount
      const subtotal = productPrice + installationCharge
      const gst = Math.round(subtotal * 0.18)
      const total = subtotal + gst

      return {
        id: order._id,
        status: status,
        placedDate: new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        deliveredDate: order.status === 'Delivered' && order.updatedAt ? new Date(order.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
        cancelledDate: order.status === 'Cancelled' && order.updatedAt ? new Date(order.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
        expectedDelivery: order.expectedDelivery ? new Date(order.expectedDelivery) : null,
        product: {
          name: mainProduct.name || 'Product',
          model: mainProduct.category || 'N/A',
          quantity: mainProduct.quantity || 1,
          color: 'White & Blue',
          warranty: mainProduct.warrantyPeriod || '1 Year'
        },
        pricing: {
          productPrice: productPrice,
          installation: installationCharge,
          gst: gst,
          total: total
        },
        rawOrder: order // Keep original order data
      }
    })
  }, [orders, products])

  // Filter orders based on active filter
  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return transformedOrders
    }
    return transformedOrders.filter(order => order.status === activeFilter)
  }, [transformedOrders, activeFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalOrders = transformedOrders.length
    const deliveredOrders = transformedOrders.filter(o => o.status === 'delivered').length
    const transitOrders = transformedOrders.filter(o => ['processing', 'shipped', 'out-for-delivery'].includes(o.status)).length
    const totalSpent = transformedOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.pricing.productPrice, 0)

    return { totalOrders, deliveredOrders, transitOrders, totalSpent }
  }, [transformedOrders])

  // Action handlers
  const handleCancelOrder = (orderId) => {
    // Refresh orders list after cancellation
    if (getAllOrders) {
      getAllOrders()
    }
    showNotification(`Order ${orderId} has been cancelled.`, 'warning')
  }

  const handleGetSupport = (orderId) => {
    showNotification(`Connecting you with support for order ${orderId}...`, 'info')
    // In a real app, this would open chat or redirect to support
    console.log(`Getting support for order: ${orderId}`)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
        <Waves />
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage all your AquaPure water purifier orders</p>
          </div>

          {/* Order Statistics */}
          <OrderStats 
            totalOrders={stats.totalOrders}
            deliveredOrders={stats.deliveredOrders}
            transitOrders={stats.transitOrders}
            totalSpent={stats.totalSpent}
          />

          {/* Order Filters */}
          <OrderFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-600 mb-2">No orders found</h2>
                <p className="text-gray-500">No orders match the current filter</p>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancelOrder={handleCancelOrder}
                  onGetSupport={handleGetSupport}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))
            )}
          </div>
        </main>

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'info' ? 'bg-blue-500 text-white' :
            notification.type === 'warning' ? 'bg-orange-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MyOrders