import React from 'react'

function ProductDetails({ cartItems, products }) {
  // Extract products from cart items
  const orderProducts = []
  
  if (cartItems && products) {
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId]
      if (!quantity || quantity <= 0) continue
      
      // Skip extension items for the main display
      if (itemId.startsWith('warranty:') || itemId.startsWith('maintenance:')) continue
      
      const product = products.find(p => p._id === itemId)
      if (product) {
        orderProducts.push({ ...product, quantity })
      }
    }
  }

  // Calculate total price
  const totalPrice = orderProducts.reduce((sum, item) => {
    const price = Number(item.discountedPrice || item.price || 0)
    return sum + (price * item.quantity)
  }, 0)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        Product Details
      </h2>

      {orderProducts.length > 0 ? (
        orderProducts.map((product, index) => (
          <div key={product._id || index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  {product.category && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                      </svg>
                      <span>{product.category}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Quantity: {product.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-sky-600">
                  ₹{(Number(product.discountedPrice || product.price || 0) * product.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center floating">
              <svg className="w-12 h-12 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Loading product details...</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Please wait</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="text-3xl font-bold text-sky-600">₹0</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails




