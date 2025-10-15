import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import hktry1 from '../../assets/hi.png'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [expanded, setExpanded] = useState({ 'ro-systems': true, 'uv-systems': false, 'alkaline': false })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceFilters, setPriceFilters] = useState([])
  const [view, setView] = useState('grid')

  const products = useMemo(() => ([
    {
      id: 1,
      name: 'AquaPure RO Elite 7L',
      category: 'under-sink',
      price: 18999,
      originalPrice: 24999,
      rating: 4.8,
      reviews: 1250,
      image: {hktry1},
      features: ['7-Stage Purification', 'UV + RO + Alkaline', '7L Storage'],
      isNew: true
    },
    {
      id: 2,
      name: 'AquaPure UV Pro 10L',
      category: 'uv-basic',
      price: 12999,
      originalPrice: 16999,
      rating: 4.6,
      reviews: 890,
      image: {hktry1},
      features: ['UV Sterilization', '10L Capacity', 'Auto Shut-off'],
      isNew: false
    },
    {
      id: 3,
      name: 'AquaPure Alkaline Max 12L',
      category: 'alkaline-premium',
      price: 35999,
      originalPrice: 42999,
      rating: 4.9,
      reviews: 567,
      image: {hktry1},
      features: ['Alkaline Enhancement', '12L Storage', 'Smart Display'],
      isNew: true
    },
    {
      id: 4,
      name: 'AquaPure Compact RO 5L',
      category: 'countertop',
      price: 14999,
      originalPrice: 18999,
      rating: 4.5,
      reviews: 1100,
      image: {hktry1},
      features: ['Compact Design', '5L Capacity', 'Easy Installation'],
      isNew: false
    },
    {
      id: 5,
      name: 'AquaPure Whole House System',
      category: 'whole-house',
      price: 65999,
      originalPrice: 79999,
      rating: 4.7,
      reviews: 234,
      image: {hktry1},
      features: ['Whole House Coverage', 'High Flow Rate', 'Professional Installation'],
      isNew: true
    },
    {
      id: 6,
      name: 'AquaPure UV Advanced 8L',
      category: 'uv-advanced',
      price: 22999,
      originalPrice: 28999,
      rating: 4.8,
      reviews: 678,
      image: {hktry1},
      features: ['Advanced UV Technology', '8L Storage', 'Digital Display'],
      isNew: false
    }
  ]), [])

  const starIcons = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 !== 0
    const empty = 5 - Math.ceil(rating)
    return (
      <>
        {Array.from({ length: full }).map((_, i) => <i key={`f-${i}`} className="fas fa-star"></i>)}
        {half && <i className="fas fa-star-half-alt"></i>}
        {Array.from({ length: empty }).map((_, i) => <i key={`e-${i}`} className="far fa-star"></i>)}
      </>
    )
  }

  const filteredAndSorted = useMemo(() => {
    let list = products

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(term) || p.features.some(f => f.toLowerCase().includes(term)))
    }

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory)
    }

    if (priceFilters.length > 0) {
      list = list.filter(p => priceFilters.some(({ min, max }) => p.price >= min && p.price <= max))
    }

    const sorted = [...list]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sorted
  }, [products, searchTerm, sortBy, selectedCategory, priceFilters])

  const onToggleCategoryGroup = (id) => {
    setExpanded(e => ({ ...e, [id]: !e[id] }))
  }

  const onSelectSubcategory = (category) => {
    setSelectedCategory(category)
  }

  const onTogglePrice = (min, max, checked) => {
    setPriceFilters(prev => {
      if (checked) return [...prev, { min, max }]
      return prev.filter(r => !(r.min === min && r.max === max))
    })
  }

  const addToCart = (product) => {
    // Placeholder action; integrate with cart context later
    // Visual feedback could be added with a toast component
    // eslint-disable-next-line no-console
    console.log(`Added ${product.name} to cart`)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold water-blue mb-4">Premium Water Purifiers</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover our range of advanced RO water purification systems designed to provide you with the purest, healthiest water for your family.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="search-container flex-1 w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search water purifiers..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold water-blue mb-6">Categories</h3>

            <div className="space-y-4">
              <div className="mb-4">
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium ${selectedCategory === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </button>
              </div>
              <div className="category-group">
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['ro-systems'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('ro-systems')}>
                  <span>RO Systems</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['ro-systems'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['ro-systems'] && (
                  <div className="subcategories mt-2 ml-4 space-y-2">
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'under-sink' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('under-sink')}>Under Sink</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'countertop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('countertop')}>Countertop</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'whole-house' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('whole-house')}>Whole House</button>
                  </div>
                )}
              </div>

              <div className="category-group">
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['uv-systems'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('uv-systems')}>
                  <span>UV Systems</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['uv-systems'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['uv-systems'] && (
                  <div className="subcategories mt-2 ml-4 space-y-2">
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'uv-basic' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('uv-basic')}>Basic UV</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'uv-advanced' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('uv-advanced')}>Advanced UV</button>
                  </div>
                )}
              </div>

              <div className="category-group">
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['alkaline'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('alkaline')}>
                  <span>Alkaline Systems</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['alkaline'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['alkaline'] && (
                  <div className="subcategories mt-2 ml-4 space-y-2">
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'alkaline-basic' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('alkaline-basic')}>Basic Alkaline</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'alkaline-premium' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('alkaline-premium')}>Premium Alkaline</button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold water-blue mb-4">Price Range</h4>
              <div className="space-y-3">
                {[{ min: 0, max: 15000, label: 'Under ₹15,000' }, { min: 15000, max: 30000, label: '₹15,000 - ₹30,000' }, { min: 30000, max: 50000, label: '₹30,000 - ₹50,000' }, { min: 50000, max: 999999, label: 'Above ₹50,000' }].map(({ min, max, label }) => {
                  const checked = priceFilters.some(r => r.min === min && r.max === max)
                  return (
                    <label key={`${min}-${max}`} className="flex items-center">
                      <input type="checkbox" className="price-filter rounded text-blue-600" checked={checked} onChange={(e) => onTogglePrice(min, max, e.target.checked)} />
                      <span className="ml-2 text-gray-600">{label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600"><span>{filteredAndSorted.length}</span> products found</p>
            <div className="flex space-x-2">
              <button className={`p-2 rounded-lg ${view === 'grid' ? 'bg-blue-100 water-blue' : 'text-gray-400 hover:bg-gray-100'}`} onClick={() => setView('grid')}>
                <i className="fas fa-th-large"></i>
              </button>
              <button className={`p-2 rounded-lg ${view === 'list' ? 'bg-blue-100 water-blue' : 'text-gray-400 hover:bg-gray-100'}`} onClick={() => setView('list')}>
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredAndSorted.map(product => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              return (
                <div key={product.id} className={`product-card bg-white rounded-2xl shadow-lg overflow-hidden ${view === 'list' ? 'grid grid-cols-1 md:grid-cols-3' : ''}`}>
                  <div className={view === 'list' ? 'relative overflow-hidden h-96 md:h-full' : 'relative overflow-hidden h-96'}>
                    <img src={hktry1} alt={product.name} className="w-full h-full object-cover" />
                    {product.isNew && <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">NEW</span>}
                    <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">{discount}% OFF</span>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <Link to="/single-product/1" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold transform translate-y-4 hover:translate-y-0 transition-all">Quick View</Link>
                    </div>
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center star-rating text-yellow-400">{starIcons(product.rating)}</div>
                      <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold water-blue">₹{product.price.toLocaleString()}</span>
                        <span className="text-gray-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.map((feature) => (
                          <span key={feature} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{feature}</span>
                        ))}
                      </div>
                    </div>
                    <button className="ripple-effect w-full water-bg text-white py-3 rounded-xl font-semibold bg-blue-700 transition-all transform hover:scale-105" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <button className="ripple-effect water-bg text-white px-8 py-3 rounded-xl font-semibold bg-blue-700 transition-all transform hover:scale-105">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Catalog