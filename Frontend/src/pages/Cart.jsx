import React, { useMemo, useState, useEffect } from 'react'
import ProgressBar from '../components/Cart/ProgressBar'
import CartItem from '../components/Cart/CartItem'
import OrderSummary from '../components/Cart/OrderSummary'
import Waves from '../components/Waves'
import { useAppContext } from '../context/ShopContext'
import toast from 'react-hot-toast'

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

      Object.entries(cartItems).forEach(([productId, cartItem]) => {
        // Handle both old format (number) and new format (object with quantity)
        const quantity = typeof cartItem === 'object' ? cartItem.quantity : cartItem
        
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
            colorClass: 'text-sky-600',
            image: product.image,
            badges: [
              { label: product.category, className: 'bg-blue-100 text-blue-800' },
              ...(product.isNewProduct ? [{ label: 'New', className: 'bg-green-100 text-green-800' }] : []),
              ...(product.isLimited ? [{ label: 'Limited', className: 'bg-red-100 text-red-800' }] : [])
            ],
            stockLabel: product.isOutOfStock ? 'Out of Stock' : 'In Stock',
            deliveryLabel: 'Free delivery',
            warrantyLabel: '1 year warranty'
          })
        } else if (productId && (productId.startsWith('warranty:') || productId.startsWith('maintenance:'))) {
          // extension item
          const [type, pid] = productId.split(':')
          const prod = products.find(p => p._id === pid)
          const basePrice = Number(prod?.discountedPrice || prod?.price || 0)
          const extPrice = type === 'warranty' ? 2999 : 999
          itemsArray.push({
            id: productId,
            title: type === 'warranty' ? `1yr Extended Warranty for ${prod?.name || pid}` : `Maintenance for ${prod?.name || pid}`,
            description: prod ? `Addon linked to ${prod.name}` : 'Addon',
            price: extPrice,
            oldPrice: null,
            discountLabel: null,
            qty: quantity,
            iconClass: type === 'warranty' ? 'fas fa-shield-alt' : 'fas fa-tools',
            colorClass: 'text-green-600',
            image: prod?.image,
            badges: [],
            stockLabel: 'In Stock',
            deliveryLabel: 'One-time service',
            warrantyLabel: type === 'warranty' ? '1 year extended' : '1 year maintenance'
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
    if (!user?._id) {
      toast.error('Please login to update cart')
      return
    }
    const clamped = Math.max(1, Math.min(10, qty || 1))
    // Optimistically update UI
    setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: clamped } : it)))
    // Update backend
    try {
      await updateCartQuantity(user._id, id, clamped)
    } catch (error) {
      console.error('Failed to update quantity:', error)
      // Revert on error by refetching
      const item = items.find(it => it.id === id)
      if (item) {
        setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: item.qty } : it)))
      }
    }
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
                      Cart Items (<span id="item-count">{items.filter(i => !i.id?.startsWith?.('warranty:') && !i.id?.startsWith?.('maintenance:')).length}</span>)
                    </h2>
                  <button className="text-red-500 hover:text-red-700 transition-colors" onClick={clearCart}>
                    <i className="fas fa-trash mr-2"></i>Clear Cart
                  </button>
                </div>

                <div className="space-y-6" id="cart-items">
                  {items.map(it => {
                    // If this is an extension, decorate title to show target product
                    if (it.id.startsWith('warranty:') || it.id.startsWith('maintenance:')) {
                      const [type, pid] = it.id.split(':')
                      const product = products.find(p => p._id === pid)
                      const title = product ? `${type === 'warranty' ? '1yr Extended Warranty for' : 'Maintenance for'} ${product.name}` : (type === 'warranty' ? '1yr Extended Warranty' : 'Maintenance')
                      return (
                        <div key={it.id} className="cart-item border-b border-gray-200 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{title}</h3>
                              <p className="text-sm text-gray-600">One-time add-on linked to product</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-sky-600">₹{it.price?.toLocaleString?.() ?? it.price}</div>
                              <div className="text-sm text-gray-500">Qty: {it.qty}</div>
                              <button className="text-red-500 hover:text-red-700 mt-2" onClick={() => removeItem(it.id)}>Remove</button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return (
                      <CartItem
                        key={it.id}
                        item={it}
                        onIncrease={increase}
                        onDecrease={decrease}
                        onRemove={removeItem}
                        onQuantityChange={updateQuantity}
                      />
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a href="/products" className="text-sky-600 hover:text-blue-700 font-semibold transition-colors">
                    <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                  </a>
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