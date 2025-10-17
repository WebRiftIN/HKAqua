import React, { useState, useMemo } from 'react'
import OrderStats from '../components/Orders/OrderStats'
import OrderFilters from '../components/Orders/OrderFilters'
import OrderCard from '../components/Orders/OrderCard'
import Waves from '../components/Waves'
import '../App.css'
import '../index.css'

function MyOrders() {
  // Sample order data - in a real app, this would come from an API
  const [orders] = useState([
    {
      id: 'AP2024001',
      status: 'shipped',
      placedDate: 'January 15, 2024',
      deliveredDate: null,
      cancelledDate: null,
      expectedDeliveryDate: 'January 22, 2024 (Monday)',
      product: {
        name: 'AquaPure Advanced RO Water Purifier',
        model: 'AP-RO-7S',
        quantity: 1,
        color: 'White & Blue',
        warranty: '2 Years'
      },
      pricing: {
        productPrice: 15999,
        installation: 1500,
        gst: 3150,
        total: 20649
      }
    },
    {
      id: 'AP2023089',
      status: 'delivered',
      placedDate: 'December 28, 2023',
      deliveredDate: 'January 2, 2024 (Tuesday)',
      cancelledDate: null,
      product: {
        name: 'AquaPure Premium RO System',
        model: 'AP-RO-10P',
        quantity: 1,
        color: 'Silver & Blue',
        warranty: '3 Years'
      },
      pricing: {
        productPrice: 22999,
        installation: 2000,
        gst: 4500,
        total: 29499
      }
    },
    {
      id: 'AP2024002',
      status: 'processing',
      placedDate: 'January 16, 2024',
      deliveredDate: null,
      cancelledDate: null,
      expectedDeliveryDate: 'January 25, 2024 (Thursday)',
      product: {
        name: 'AquaPure Compact RO Filter',
        model: 'AP-RO-5C',
        quantity: 2,
        color: 'White',
        warranty: '1 Year'
      },
      pricing: {
        productPrice: 17998, // 8999 * 2
        installation: 1000,
        gst: 3420,
        total: 22418
      }
    },
    {
      id: 'AP2023067',
      status: 'delivered',
      placedDate: 'November 15, 2023',
      deliveredDate: 'November 20, 2023 (Monday)',
      cancelledDate: null,
      product: {
        name: 'AquaPure Basic RO System',
        model: 'AP-RO-3B',
        quantity: 1,
        color: 'White',
        warranty: '1 Year'
      },
      pricing: {
        productPrice: 8999,
        installation: 800,
        gst: 1764,
        total: 11563
      }
    },
    {
      id: 'AP2023045',
      status: 'cancelled',
      placedDate: 'October 10, 2023',
      deliveredDate: null,
      cancelledDate: 'October 12, 2023 (Thursday)',
      product: {
        name: 'AquaPure Industrial RO System',
        model: 'AP-RO-50I',
        quantity: 1,
        color: 'Steel Gray',
        warranty: '5 Years'
      },
      pricing: {
        productPrice: 45999,
        installation: 5000,
        gst: 9180,
        total: 60179
      }
    }
  ])

  const [activeFilter, setActiveFilter] = useState('all')
  const [notification, setNotification] = useState(null)

  // Filter orders based on active filter
  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return orders
    }
    return orders.filter(order => order.status === activeFilter)
  }, [orders, activeFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length
    const transitOrders = orders.filter(order => order.status === 'shipped').length
    const totalSpent = orders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + order.pricing.total, 0)

    return {
      totalOrders,
      deliveredOrders,
      transitOrders,
      totalSpent
    }
  }, [orders])

  // Action handlers
  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      showNotification(`Order ${orderId} has been cancelled.`, 'warning')
      // In a real app, this would update the order status
      console.log(`Cancelling order: ${orderId}`)
    }
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

        {/* Filter Buttons */}
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
