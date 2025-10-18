import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/ShopContext'
import hktry1 from '../../assets/hi.png'

const NewArrivals = () => {
  const { products: dbProducts = [] } = useAppContext()

  // filter products flagged new, exclude out-of-stock and limited, take the most recent 4
  const recentNew = dbProducts
    .filter(p => Boolean(p.isNewProduct || p.isNew) && !p.isOutOfStock && !p.isLimited)
    .slice(-4)
    .reverse()

  const renderStars = (rating = 4.8) => {
    const full = Math.floor(rating)
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fas fa-star mr-0.5 ${i < full ? 'text-yellow-400' : 'text-gray-300'}`}
        aria-hidden="true"
      />
    ))
  }

  const addToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    // replace with your real addToCart logic
    console.log('Add to cart', product)
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: product }))
  }

  if (!recentNew.length) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Latest products just added to our catalogue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentNew.map(p => {
            const id = p._id || p.id
            const img = p.image || hktry1
            const rating = p.rating ?? 4.8
            const reviews = p.reviews ?? 0
            const discounted = p.discountedPrice ?? p.price ?? 0
            const original = p.originalPrice ?? 0

            return (
              <Link
                key={id}
                to={`/single-product/${id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 block hover:shadow-xl transition"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-1 flex flex-col">
                    {/* image container fills available vertical space and shows small "New" badge */}
                    <div className="rounded-lg overflow-hidden mb-3 flex-1 relative flex items-center justify-center ">
                      {(p.isNewProduct || p.isNew) && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10">
                          New
                        </span>
                      )}
                     <img src={img} alt={p.name} className="max-h-70 w-auto object-contain" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{p.name}</h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2 text-sm">{renderStars(rating)}</div>
                      <span className="text-xs text-gray-500">({reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-sky-600">₹{Number(discounted).toLocaleString()}</div>
                      {original ? <div className="text-xs text-gray-500 line-through">₹{Number(original).toLocaleString()}</div> : null}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={e => addToCart(e, p)}
                      className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
