import React from 'react'

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onQuantityChange
}) {
  const { id, title, description, price, oldPrice, discountLabel, qty, iconClass, badges = [], stockLabel, deliveryLabel, warrantyLabel, colorClass = 'text-blue-600' } = item

  return (
    <div className="cart-item border-b border-gray-200 pb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-32 h-32 water-bg rounded-lg flex items-center justify-center">
          {item.image ? (
            <img 
              src={item.image} 
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <i className={`text-4xl ${colorClass} ${iconClass || ''}`}></i>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <button className="text-red-500 hover:text-red-700 transition-colors remove-item" onClick={() => onRemove(id)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((b, idx) => (
              <span key={idx} className={`px-2 py-1 rounded text-sm ${b.className}`}>{b.label}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-blue-600">₹{price.toLocaleString()}</span>
              {oldPrice ? <span className="text-lg text-gray-500 line-through">₹{oldPrice.toLocaleString()}</span> : null}
              {discountLabel ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{discountLabel}</span> : null}
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="quantity-btn px-3 py-1 hover:bg-gray-100 transition-colors" onClick={() => onDecrease(id)}>-</button>
                <input
                  type="number"
                  className="quantity-input w-16 text-center py-1 border-0 focus:outline-none"
                  value={qty}
                  min={1}
                  max={10}
                  onChange={(e) => onQuantityChange(id, Number(e.target.value))}
                />
                <button className="quantity-btn px-3 py-1 hover:bg-gray-100 transition-colors" onClick={() => onIncrease(id)}>+</button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <span><i className="fas fa-truck mr-1"></i>{deliveryLabel || 'Free delivery'}</span>
            <span><i className="fas fa-shield-alt mr-1"></i>{warrantyLabel || '2 year warranty'}</span>
            <span className="text-green-600"><i className="fas fa-check-circle mr-1"></i>{stockLabel || 'In Stock'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem




