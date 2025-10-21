import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/ShopContext';

function SingleProduct() {
  const { id } = useParams();
  const { products,addToCart,user,addingToCart } = useAppContext();
  const product = products.find(p => p._id === id || p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [warrantySelected, setWarrantySelected] = useState(false);
  const [maintenanceSelected, setMaintenanceSelected] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const changeQuantity = (delta) => {
    setQuantity(q => Math.max(1, q + delta));
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (selectedRating === 0) return;
    if (!reviewText.trim()) return;
    setReviewText('');
    setSelectedRating(0);
    setActiveTab('reviews');
  };

  if (!products.length) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-red-500">Product not found.</div>;
  }

  // Fallbacks for missing fields
  const image = product.image;
  const features = product.features || product.description || '';
  const specifications = product.specifications || [];
  const technologies = [
    { icon: 'fas fa-water', title: 'RO+UV+UF', desc: 'Advanced multi-stage purification.' },
    { icon: 'fas fa-bolt', title: 'Low Power', desc: 'Energy efficient operation.' },
    // ...add more
  ];
  const normalize = str => (str || '').toLowerCase().trim();
  const currentId = product._id || product.id;

  const related = products.filter(p =>
    normalize(p.category) === normalize(product.category) &&
    (p._id || p.id) !== currentId
  );

  const rating = product.rating || 4.8;
  const reviewsCount = product.reviewsCount || 1250;
  const price = product.discountedPrice || product.price || 0;
  const originalPrice = product.originalPrice || 0;
  const discount = originalPrice
    ? `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`
    : '';

  return (
    <div className="pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Water Purifiers</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full">
            <div className="overflow-hidden">
              <img src={image} alt={product.name} className="product-image-main w-full h-96 object-contain" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.category}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-gray-600">({rating})</span>
              <span className="text-blue-600 hover:underline cursor-pointer">{reviewsCount} Reviews</span>
            </div>

            <div className="flex items-center space-x-4">
              {!product.isOutOfStock && (
                <>
                  <span className="text-4xl font-bold water-blue">₹{product.discountedPrice ? Number(product.discountedPrice).toLocaleString() : '0'}</span>
                  <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice ? Number(product.originalPrice).toLocaleString() : '0'}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.originalPrice
                      ? `${Math.round(((product.originalPrice - (product.discountedPrice ?? 0)) / product.originalPrice) * 100)}% OFF`
                      : ''}
                  </span>
                </>
              )}
            </div>
            {product.isOutOfStock && (
              <div className="text-red-600 text-lg font-semibold mt-2">Out of Stock</div>
            )}

            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                {features}
              </p>
            </div>

            {/* Main perks below description */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-tools text-green-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">RO Installation is Free</div>
                  <div className="text-sm text-gray-600">Professional doorstep setup included</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-gift text-blue-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Filter bottle and candle free</div>
                  <div className="text-sm text-gray-600">Complimentary essentials with purchase</div>
                </div>
              </div>
              {price >= 4499 && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-concierge-bell text-purple-600"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">3 services free</div>
                    <div className="text-sm text-gray-600">Free scheduled maintenance visits</div>
                  </div>
                </div>
              )}
            </div>

      

            {/* Extended options - visual cards */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/** compute extension prices */}
                {(() => {
                  const base = Number(product.discountedPrice || product.price || 0)
                  const warrantyPrice = Math.max(499, Math.round(base * 0.10))
                  const maintenancePrice = Math.max(399, Math.round(base * 0.08))
                  const mainFeature = specifications[0] || features.split(/[\.\n]/)[0] || product.name

                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => setWarrantySelected(s => !s)}
                        className={`text-left p-4 rounded-xl border transition-shadow flex flex-col justify-between ${warrantySelected ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200 bg-white hover:shadow-md'}`}
                        aria-pressed={warrantySelected}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-lg font-semibold">1 Year Extended Warranty</h4>
                              {/* <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">1 year</span> */}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Cover manufacturing defects and free replacement parts for one year beyond the standard warranty.</p>
                            {/* <p className="text-sm text-gray-700 mt-3"><strong>Main feature:</strong> {mainFeature}</p> */}
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-2xl font-bold water-blue">₹{warrantyPrice.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">one-time</div>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMaintenanceSelected(s => !s)}
                        className={`text-left p-4 rounded-xl border transition-shadow flex flex-col justify-between ${maintenanceSelected ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200 bg-white hover:shadow-md'}`}
                        aria-pressed={maintenanceSelected}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-lg font-semibold">Extended Maintenance Plan</h4>
                              {/* <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">1 year</span> */}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Annual scheduled servicing and part checks to keep your purifier running at peak performance.</p>
                            {/* <p className="text-sm text-gray-700 mt-3"><strong>Main feature:</strong> {mainFeature}</p> */}
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-2xl font-bold water-blue">₹{maintenancePrice.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">one-time</div>
                          </div>
                        </div>
                      </button>
                    </>
                  )
                })()}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={async ()=>{
                    // Add main product
                    await addToCart(user._id,id)
                    // Add warranty/maintenance as special items keyed to product id
                    if (warrantySelected) {
                      await addToCart(user._id, `warranty:${id}`)
                    }
                    if (maintenanceSelected) {
                      await addToCart(user._id, `maintenance:${id}`)
                    }
                  }} 
                  disabled={addingToCart[id]}
                  className={`btn-primary flex-1 py-4 text-white font-semibold rounded-xl text-lg transition-all ${
                    addingToCart[id] ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {addingToCart[id] ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Adding...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Add to Cart
                    </>
                  )}
                </button>

                <button className="btn-secondary flex-1 py-4 font-semibold rounded-xl text-lg">
                  <i className="fas fa-bolt mr-2"></i>
                  Buy Now
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              {[
                { icon: 'fas fa-shield-alt text-green-500', text: '100% Original Product' },
                { icon: 'fas fa-truck text-blue-500', text: 'Free Delivery & Installation' },
                { icon: 'fas fa-money-bill-wave text-green-500', text: 'Cash on Delivery Available' },
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
                Reviews ({reviewsCount})
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="prose max-w-none">
                  <h4 className="text-xl font-semibold water-blue mb-4">Key Technologies:</h4>
                  <ul className="space-y-3 mb-6">
                    {technologies.map(({ icon, title, desc }) => (
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
                      {specifications.slice(0, 4).map((spec, idx) => (
                        <p key={idx}>{spec}</p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {specifications.slice(4).map((spec, idx) => (
                        <p key={idx}>{spec}</p>
                      ))}
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
                        <span className="text-3xl font-bold water-blue">{rating}</span>
                        <div className="flex items-center star-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                      </div>
                      <p className="text-gray-600">Based on {reviewsCount} reviews</p>
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
            {related.length === 0 && (
              <div className="text-gray-500 col-span-4">No related products found.</div>
            )}
            {related.map((rel, i) => (
              <Link
                key={rel._id || rel.id || i}
                to={`/single-product/${rel._id || rel.id}`}
                className="related-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer block hover:shadow-xl transition"
              >
                <img src={rel.image} alt={rel.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{rel.name}</h4>
                  <div className="flex items-center star-rating mb-2">
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star text-sm"></i>
                    <i className="fas fa-star-half-alt text-sm"></i>
                    <span className="text-gray-500 text-sm ml-1">(100)</span>
                  </div>
                  <p className="text-xl font-bold water-blue">
                    ₹{rel.discountedPrice ? Number(rel.discountedPrice).toLocaleString() : '0'}
                  </p>
                  <span className="text-gray-400 line-through ml-2">
                    ₹{rel.originalPrice ? Number(rel.originalPrice).toLocaleString() : '0'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;


