import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/ShopContext'
import hktry1 from '../../assets/hi.png'

function Catalog() {
  const { products: dbProducts } = useAppContext();

  // Add static reviews/rating/image to each product
  const products = useMemo(() => {
    return dbProducts.map((p, i) => ({
      ...p,
      reviews: p.reviews || [1250, 890, 567, 1100, 234, 678][i % 6],
      rating: p.rating || [4.8, 4.6, 4.9, 4.5, 4.7, 4.8][i % 6],
      image: p.image || hktry1,
      features: p.features || [],
      isNew: p.isNew || false
    }));
  }, [dbProducts]);

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [expanded, setExpanded] = useState({ 'ro-systems': true, 'uv-systems': false, 'alkaline': false })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceFilters, setPriceFilters] = useState([])
  const [view, setView] = useState('grid')

  const normalize = (value) => (value || '').toString().toLowerCase().trim()

  const getEffectivePrice = (p) => {
    const discounted = p.discountedPrice != null ? Number(p.discountedPrice) : null
    if (discounted != null && !Number.isNaN(discounted)) return discounted
    const original = p.originalPrice != null ? Number(p.originalPrice) : null
    if (original != null && !Number.isNaN(original)) return original
    const base = p.price != null ? Number(p.price) : 0
    return Number.isNaN(base) ? 0 : base
  }

  const subcategoryKeywords = {
    nexusrosystem: ['nexus'],
    applerosystem: ['apple'],
    livepurerosystem: ['livepure', 'live pure'],
    '50lphro': ['50 lph', '50lph'],
    '100lphro': ['100 lph', '100lph'],
    '250lphro': ['250 lph', '250lph'],
    'alkaline-basic': ['alkaline basic', 'basic alkaline'],
    'alkaline-premium': ['alkaline premium', 'premium alkaline']
  }

  const matchesSelectedCategory = (product, selected) => {
    const sel = normalize(selected)
    if (sel === 'all') return true
    const nameNorm = normalize(product.name)
    const catNorm = normalize(product.category)
    // keyword match on product name
    const keywords = subcategoryKeywords[sel]
    const keywordHit = Array.isArray(keywords) && keywords.some(kw => nameNorm.includes(kw))
    // fallback to category exact match
    const categoryHit = catNorm === sel
    return Boolean(keywordHit || categoryHit)
  }

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
      list = list.filter(p => matchesSelectedCategory(p, selectedCategory))
    }

    if (priceFilters.length > 0) {
      list = list.filter(p => {
        const price = getEffectivePrice(p)
        return priceFilters.some(({ min, max }) => price >= min && price <= max)
      })
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="search-container flex-1 w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search water purifiers..."
                className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="default">Default</option>
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
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['domesticRoSystems'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('domesticRoSystems')}>
                  <span>Domestic Water Purifiers</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['domesticRoSystems'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['domesticRoSystems'] && (
                  <div className="subcategories mt-2 ml-4 space-y-2">
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'NexusRoSystem' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('NexusRoSystem')}>Nexus RO</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'AppleRoSystem' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('AppleRoSystem')}>Apple RO</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === 'LivePureRoSystem' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('LivePureRoSystem')}>LivePure RO</button>
                  </div>
                )}
              </div>

              <div className="category-group">
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['commercialRoSystems'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('commercialRoSystems')}>
                  <span>Commercial Water Purifiers</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['commercialRoSystems'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['commercialRoSystems'] && (
                  <div className="subcategories mt-2 ml-4 space-y-2">
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === '50LPHRO' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('50LPHRO')}>50 LPH RO</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === '100LPHRO' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('100LPHRO')}>100 LPH RO</button>
                    <button className={`subcategory-btn block w-full text-left px-3 py-2 rounded-lg transition-all ${selectedCategory === '250LPHRO' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`} onClick={() => onSelectSubcategory('250LPHRO')}>250 LPH RO</button>

                  </div>
                )}
              </div>

              <div className="category-group">
                <button className={`category-pill w-full text-left px-4 py-3 rounded-xl ${expanded['waterPurifiersSpareParts'] ? 'bg-blue-50 water-blue' : 'bg-gray-50 text-gray-700'} font-medium flex items-center justify-between`} onClick={() => onToggleCategoryGroup('waterPurifiersSpareParts')}>
                  <span>Water Purifiers Spare Parts</span>
                  <i className={`fas fa-chevron-down transition-transform ${expanded['waterPurifiersSpareParts'] ? 'rotate-180' : ''}`}></i>
                </button>
                {expanded['waterPurifiersSpareParts'] && (
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
                {[{ min: 0, max: 6000, label: 'Under ₹6,000' }, { min: 6000, max: 8000, label: '₹6,000 - ₹8,000' }, { min: 8000, max: 10000, label: '₹8,000 - ₹10,000' }, { min: 10000, max: Infinity, label: 'Above ₹10,000' }].map(({ min, max, label }) => {
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

          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-3' : 'space-y-4'}>
            {filteredAndSorted.map(product => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - (product.discountedPrice ?? 0)) / product.originalPrice) * 100)
                : 0;

              const id = product._id || product.id
              const img = product.image || hktry1
              const rating = product.rating ?? 4.8
              const reviews = product.reviews ?? 0
              const discounted = product.discountedPrice ?? product.price ?? 0
              const original = product.originalPrice ?? 0

              return (
                <Link
                  key={id}
                  to={`/single-product/${id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 block hover:shadow-xl transition"
                >
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex-1 flex flex-col">
                      <div className="rounded-lg overflow-hidden mb-3 flex-1 relative flex items-center justify-center">
                        {(product.isNewProduct || product.isNew) && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10">New</span>
                        )}
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10">{discount}% OFF</span>
                        )}
                        <img src={img} alt={product.name} className="max-h-70 w-auto object-contain" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-amber-300 mr-2 text-sm">{starIcons(rating)}</div>
                        <span className="text-xs text-gray-500">({reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-bold text-sky-600">₹{Number(discounted).toLocaleString()}</div>
                        {original ? <div className="text-xs text-gray-500 line-through">₹{Number(original).toLocaleString()}</div> : null}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

        
        </div>
      </div>
    </main>
  )
}

export default Catalog