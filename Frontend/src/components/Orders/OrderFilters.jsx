import React from 'react'

function OrderFilters({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'processing', label: 'Processing' },
    { key: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Orders</h2>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === filter.key
                ? 'filter-active'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OrderFilters
