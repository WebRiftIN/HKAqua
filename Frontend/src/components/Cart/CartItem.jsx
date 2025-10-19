import React from 'react'

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onQuantityChange
}) {
  const { id, title, description, price, oldPrice, discountLabel, qty, iconClass, badges = [], stockLabel, deliveryLabel, warrantyLabel, colorClass = 'text-blue-600', isAddon } = item

  return (
    <div className="cart-item border-b border-gray-200 pb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image / Icon */}
        <div className="w-full md:w-32 md:h-32 h-48 water-bg rounded-lg flex items-center justify-center overflow-hidden">
          {item.image ? (
            <img 
              src={item.image} 
              alt={title}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <i className={`text-4xl ${colorClass} ${iconClass || ''}`}></i>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <div className="flex items-center mt-2 sm:mt-0">
              <button className="text-red-500 hover:text-red-700 transition-colors remove-item" onClick={() => onRemove(id)} aria-label={`Remove ${title}`}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-3 text-sm">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((b, idx) => (
              <span key={idx} className={`px-2 py-1 rounded text-sm ${b.className}`}>{b.label}</span>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-2xl font-bold text-blue-600">₹{Number(price || 0).toLocaleString()}</div>
                {oldPrice ? <div className="text-sm text-gray-500 line-through">₹{Number(oldPrice).toLocaleString()}</div> : null}
                {discountLabel ? <div className="mt-1 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{discountLabel}</div> : null}
              </div>
            </div>

            {!isAddon ? (
              <div className="flex items-center space-x-3">
                <label className="text-gray-600 mr-2 hidden sm:block">Qty:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="quantity-btn px-3 py-2 hover:bg-gray-100 transition-colors" onClick={() => onDecrease(id)} aria-label="Decrease quantity">-</button>
                  <input
                    type="number"
                    className="quantity-input w-16 text-center py-2 border-0 focus:outline-none"
                    value={qty}
                    min={1}
                    max={99}
                    onChange={(e) => onQuantityChange(id, Number(e.target.value))}
                    aria-label={`Quantity for ${title}`}
                  />
                  <button className="quantity-btn px-3 py-2 hover:bg-gray-100 transition-colors" onClick={() => onIncrease(id)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm mr-2">Addon</span>
                <span className="text-sm text-gray-600">Qty: {qty}</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 gap-2">
            <span className="flex items-center"><i className="fas fa-truck mr-1"></i>{deliveryLabel || 'Free delivery'}</span>
            {/* show warranty only for items with price <= 5000; default label is '1 year' */}
            {(() => {
              const numericPrice = Number(String(price || 0).replace(/[^0-9.-]+/g, '')) || 0
              if (numericPrice >= 5000) {
                return (
                  <span className="flex items-center"><i className="fas fa-shield-alt mr-1"></i>{warrantyLabel || '1 year'}</span>
                )
              }
              return null
            })()}
            <span className="flex items-center text-green-600"><i className="fas fa-check-circle mr-1"></i>{stockLabel || 'In Stock'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem




