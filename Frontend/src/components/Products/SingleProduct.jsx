import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function SingleProduct() {
  const productImages = useMemo(() => ([
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f0f9ff' width='400' height='400'/%3E%3Crect fill='%230277bd' x='50' y='50' width='300' height='300' rx='30'/%3E%3Crect fill='%234fc3f7' x='80' y='80' width='240' height='240' rx='20'/%3E%3Ccircle fill='%23ffffff' cx='200' cy='160' r='30'/%3E%3Crect fill='%23ffffff' x='170' y='220' width='60' height='80' rx='8'/%3E%3Ctext x='200' y='340' text-anchor='middle' fill='%23ffffff' font-size='16' font-weight='bold'%3EAquaPure%3C/text%3E%3C/svg%3E",
   
  ]), [])

  // Showing only one image; no thumbnail selection needed
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const changeQuantity = (delta) => {
    setQuantity(q => Math.max(1, q + delta))
  }

  const submitReview = (e) => {
    e.preventDefault()
    if (selectedRating === 0) return
    if (!reviewText.trim()) return
    setReviewText('')
    setSelectedRating(0)
    setActiveTab('reviews')
  }

  return (
    <div className="pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Water Purifiers</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600">RO Systems</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">AquaPure RO Elite 7L</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
              <img src={productImages[0]} alt="AquaPure RO Elite 7L" className="product-image-main w-full h-96 object-contain" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">AquaPure RO Elite 7L</h1>
              <p className="text-lg text-gray-600">Premium 7-Stage Water Purification System</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-gray-600">(4.8)</span>
              <span className="text-blue-600 hover:underline cursor-pointer">1,250 Reviews</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold water-blue">₹18,999</span>
              <span className="text-2xl text-gray-400 line-through">₹24,999</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">24% OFF</span>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                Experience pure, healthy water with our advanced 7-stage purification system. Combining RO, UV, and Alkaline technologies, this premium water purifier removes 99.9% of contaminants while retaining essential minerals for your family's health.
              </p>
            </div>


            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="px-3 py-2 border-r border-gray-300" onClick={() => changeQuantity(-1)}>-</button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button className="px-3 py-2 border-l border-gray-300" onClick={() => changeQuantity(1)}>+</button>
              </div>
            </div>

            <div className="space-y-4">
              <button className="btn-primary w-full py-4 text-white font-semibold rounded-xl text-lg">
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
              <button className="btn-secondary w-full py-4 font-semibold rounded-xl text-lg">
                <i className="fas fa-bolt mr-2"></i>
                Buy Now
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              {[
                { icon: 'fas fa-shield-alt text-green-500', text: '100% Original Product' },
                { icon: 'fas fa-truck text-blue-500', text: 'Free Delivery & Installation' },
                { icon: 'fas fa-money-bill-wave text-green-500', text: 'Cash on Delivery Available' },
                { icon: 'fas fa-undo text-blue-500', text: 'Easy 30-Day Returns' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center space-x-3">
                  <i className={icon}></i>
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className={`py-4 px-2 font-medium text-lg ${activeTab === 'description' ? 'tab-active' : 'text-gray-500'}`} onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button className={`py-4 px-2 font-medium text-lg ${activeTab === 'reviews' ? 'tab-active' : 'text-gray-500'}`} onClick={() => setActiveTab('reviews')}>
                Reviews (1,250)
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="prose max-w-none">
                  <h4 className="text-xl font-semibold water-blue mb-4">Key Technologies:</h4>
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: 'fas fa-water text-blue-500', title: 'RO Membrane', desc: 'Removes dissolved salts, heavy metals, and microscopic contaminants' },
                      { icon: 'fas fa-sun text-yellow-500', title: 'UV Sterilization', desc: 'Eliminates bacteria, viruses, and other microorganisms' },
                      { icon: 'fas fa-leaf text-green-500', title: 'Alkaline Enhancement', desc: 'Balances pH levels and adds beneficial minerals' },
                    ].map(({ icon, title, desc }) => (
                      <li key={title} className="flex items-start space-x-3">
                        <i className={icon + ' mt-1'}></i>
                        <div>
                          <strong>{title}:</strong> {desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h4 className="text-xl font-semibold water-blue mb-4">Specifications:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p><strong>Storage Capacity:</strong> 7 Liters</p>
                      <p><strong>Purification Rate:</strong> 15 LPH</p>
                      <p><strong>Power Consumption:</strong> 25W</p>
                      <p><strong>Input Water Pressure:</strong> 0.3-2.0 kg/cm²</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Dimensions:</strong> 32 x 25 x 48 cm</p>
                      <p><strong>Weight:</strong> 8.5 kg</p>
                      <p><strong>Warranty:</strong> 2 Years Comprehensive</p>
                      <p><strong>Installation:</strong> Wall Mount/Counter Top</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold water-blue">Customer Reviews</h3>
                  <button className="btn-primary px-6 py-2 text-white rounded-lg" onClick={() => setActiveTab('reviews')}>
                    Write a Review
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-3xl font-bold water-blue">4.8</span>
                        <div className="flex items-center star-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                      </div>
                      <p className="text-gray-600">Based on 1,250 reviews</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">96% Recommended</p>
                      <p className="text-gray-600 text-sm">by customers</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[{
                    name: 'Rajesh Kumar', stars: 5, time: '2 days ago', text: 'Excellent water purifier! The water taste is amazing and installation was hassle-free. Highly recommended for families.'
                  }, {
                    name: 'Priya Sharma', stars: 4, time: '1 week ago', text: 'Great product with good build quality. The 7L storage is perfect for our family of 4. Worth the investment!'
                  }].map((r, i) => (
                    <div key={i} className="review-card border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{r.name}</h4>
                          <div className="flex items-center star-rating mt-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <i key={idx} className={`${idx < r.stars ? 'fas fa-star' : 'far fa-star'}`}></i>
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">{r.time}</span>
                      </div>
                      <p className="text-gray-700">{r.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold water-blue mb-4">Write Your Review</h4>
                  <form onSubmit={submitReview}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i key={i} className={`fas fa-star cursor-pointer ${i < selectedRating ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => setSelectedRating(i + 1)}></i>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                      <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Share your experience with this product..." value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                    </div>
                    <div className="flex space-x-4">
                      <button type="submit" className="btn-primary px-6 py-2 text-white rounded-lg">Submit Review</button>
                      <button type="button" className="btn-secondary px-6 py-2 rounded-lg" onClick={() => { setReviewText(''); setSelectedRating(0) }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold water-blue mb-8">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="related-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer">
                <img src={productImages[(i-1) % productImages.length]} alt="Related" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Related Product {i}</h4>
                  <div className="flex items-center star-rating mb-2">
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star-half-alt text-sm"></i>
                    <span className="text-gray-500 text-sm ml-1">(100)</span>
                  </div>
                  <p className="text-xl font-bold water-blue">₹12,999</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct


