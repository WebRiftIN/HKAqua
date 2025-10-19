import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/ShopContext';

const TopDeals = () => {
  const { products: dbProducts = [] } = useAppContext();

  // pick last 4 products that are available (exclude out-of-stock and limited items)
  const available = dbProducts.filter(p => !p.isOutOfStock && !p.isLimited);
  const recent = available.slice(-4).reverse();

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
    e.preventDefault();
    e.stopPropagation();
    // replace with your actual addToCart logic / context action
    console.log('Add to cart:', product);
    // optionally notify global listener:
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: product }));
  };

  if (!recent.length) {
    return null;
  }

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Deals of the Week</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our most popular RO water purifiers with unbeatable prices and premium quality</p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recent.map((p) => {
            const id = p._id || p.id;
            const image = p.image || hktry1;
            const rating = p.rating ?? 4.8;
            const reviews = p.reviews ?? 100;
            const discounted = p.discountedPrice ?? p.price ?? 0;
            const original = p.originalPrice ?? 0;
            return (
              <Link
                key={id}
                to={`/single-product/${id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover border border-gray-100 block hover:shadow-lg transition"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-1 flex flex-col">
                     {/* image container fills available vertical space and shows small "New" badge */}
                    <div className="rounded-lg overflow-hidden mb-3 relative flex-1 flex items-center justify-center ">
                      <img src={image} alt={p.name} className="max-h-70 w-auto object-contain" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.description}</p>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2 text-sm">{renderStars(rating)}</div>
                      <span className="text-xs text-gray-500">({reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-sky-600">₹{Number(discounted).toLocaleString()}</span>
                      {original ? <span className="text-xs text-gray-500 line-through">₹{Number(original).toLocaleString()}</span> : null}
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={`/single-product/${p._id || p.id}`}
                      className="w-full py-2 rounded-lg font-semibold text-sm transition-colors bg-sky-500 text-white hover:bg-sky-600 flex items-center justify-center"
                      onClick={e => e.stopPropagation()}
                    >
                      <i className="fas fa-eye mr-2"></i>
                      View Details
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopDeals;
