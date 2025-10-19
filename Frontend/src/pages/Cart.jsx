import React, { useMemo, useState, useEffect } from 'react'
import ProgressBar from '../components/Cart/ProgressBar'
import CartItem from '../components/Cart/CartItem'
import OrderSummary from '../components/Cart/OrderSummary'
import Waves from '../components/Waves'
import { useAppContext } from '../context/ShopContext'

function Cart() {
  const { products, cartItems, user, updateCartQuantity, removeFromCart, clearUserCart } = useAppContext()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  // ✅ FIXED: Build `items` array from `products` and `cartItems` (context)
  useEffect(() => {
    if (products.length > 0 && cartItems && Object.keys(cartItems).length > 0) {
      const itemsArray = []

      Object.entries(cartItems).forEach(([productId, quantity]) => {
        const product = products.find(p => p._id === productId)
        if (product) {
          itemsArray.push({
            id: product._id,
            title: product.name,
            description: product.description,
            price: product.discountedPrice,
            oldPrice: product.originalPrice,
            discountLabel: product.originalPrice > product.discountedPrice
              ? `${Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF`
              : null,
            qty: quantity,
            iconClass: 'fas fa-tint',
            colorClass: 'text-blue-600',
            image: product.image,
            badges: [
              { label: product.category, className: 'bg-blue-100 text-blue-800' },
              ...(product.isNewProduct ? [{ label: 'New', className: 'bg-green-100 text-green-800' }] : []),
              ...(product.isLimited ? [{ label: 'Limited', className: 'bg-red-100 text-red-800' }] : [])
            ],
            stockLabel: product.isOutOfStock ? 'Out of Stock' : 'In Stock',
            deliveryLabel: 'Free delivery',
            warrantyLabel: '2 year warranty'
          })
        }
      })

      setItems(itemsArray)
      setLoading(false)
    } else {
      setItems([])
      setLoading(false)
    }
  }, [products, cartItems])

  // ✅ Calculate subtotal based on original or discounted price
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.oldPrice || item.price
      return sum + (price * item.qty)
    }, 0)
  }, [items])

  // ✅ Calculate actual discount from price differences
  const priceDiscount = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.oldPrice && item.oldPrice > item.price) {
        return sum + ((item.oldPrice - item.price) * item.qty)
      }
      return sum
    }, 0)
  }, [items])

  const totalDiscount = priceDiscount + couponDiscount
  const gst = 0 // Removed GST calculation

  // ✅ Update quantity both in UI and backend
  const updateQuantity = async (id, qty) => {
    const clamped = Math.max(1, Math.min(10, qty || 1))
    setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: clamped } : it)))
    await updateCartQuantity(user._id, id, clamped)
  }

  const increase = async (id) => {
    const currentItem = items.find(it => it.id === id)
    if (currentItem && currentItem.qty < 10) {
      await updateQuantity(id, currentItem.qty + 1)
    }
  }

  const decrease = async (id) => {
    const currentItem = items.find(it => it.id === id)
    if (currentItem && currentItem.qty > 1) {
      await updateQuantity(id, currentItem.qty - 1)
    }
  }

  const removeItem = async (id) => {
    setItems(prev => prev.filter(it => it.id !== id))
    await removeFromCart(user._id, id)
  }

  const clearCart = async () => {
    setItems([])
    await clearUserCart(user._id)
  }

  const applyCoupon = (code) => {
    const coupons = { SAVE10: 10, FIRST20: 20, WELCOME15: 15 }
    const pct = coupons[(code || '').toUpperCase()]
    if (!pct || couponApplied) return
    const additional = Math.round(subtotal * pct / 100)
    setCouponDiscount(additional)
    setCouponApplied(true)
  }

  if (loading) {
    return (
      <>
        <Waves />
        <ProgressBar currentStep={1} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="water-drop w-24 h-24 mx-auto mb-6 opacity-50 animate-pulse"></div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">Loading your cart...</h2>
            <p className="text-gray-500">Please wait while we fetch your items</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Waves />
      <ProgressBar currentStep={1} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold water-blue mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your selected water purifiers</p>
        </div>

        {items.length === 0 ? (
          <div id="empty-cart" className="text-center py-16">
            <div className="water-drop w-24 h-24 mx-auto mb-6 opacity-50"></div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some water purifiers to get started</p>
            <a href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Browse Products</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items (<span id="item-count">{items.length}</span>)
                  </h2>
                  <button className="text-red-500 hover:text-red-700 transition-colors" onClick={clearCart}>
                    <i className="fas fa-trash mr-2"></i>Clear Cart
                  </button>
                </div>

                <div className="space-y-6" id="cart-items">
                  {items.map(it => (
                    <CartItem
                      key={it.id}
                      item={it}
                      onIncrease={increase}
                      onDecrease={decrease}
                      onRemove={removeItem}
                      onQuantityChange={updateQuantity}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a href="/products" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">You might also like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="w-full h-24 water-bg rounded-lg flex items-center justify-center mb-3">
                      <i className="fas fa-wrench text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Installation Kit</h4>
                    <p className="text-sm text-gray-600 mb-2">Professional installation accessories</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">₹1,299</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">Add to Cart</button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="w-full h-24 water-bg rounded-lg flex items-center justify-center mb-3">
                      <i className="fas fa-tools text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Maintenance Kit</h4>
                    <p className="text-sm text-gray-600 mb-2">Annual maintenance essentials</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">₹899</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                discount={totalDiscount}
                priceDiscount={priceDiscount}
                couponDiscount={couponDiscount}
                gst={gst}
                couponApplied={couponApplied}
                onApplyCoupon={applyCoupon}
              />
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Cart