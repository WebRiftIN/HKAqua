import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/ShopContext';

const TopDeals = () => {
  const { products: dbProducts = [] } = useAppContext();

  // pick last 3 products (most recently added assuming backend pushes newest to end)
  const recent = dbProducts.slice(-3).reverse();

  const starText = (rating = 4.8) => {
    // simple star string fallback (you can replace with icons)
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆☆☆☆'.slice(0, 5 - full - half);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 block hover:shadow-xl transition"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1 flex flex-col">
                    <div className="rounded-lg overflow-hidden mb-4 flex-1 flex items-center justify-center bg-gray-50">
                      <img src={image} alt={p.name} className="object-contain h-full w-full" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{p.description}</p>

                    <div className="flex items-center mb-3">
                      <div className="star-rating text-yellow-400 mr-3">{starText(rating)}</div>
                      <span className="text-sm text-gray-500">({reviews})</span>
                    </div>

                    {!p.isOutOfStock ? (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-sky-600">₹{Number(discounted).toLocaleString()}</span>
                        {original ? <span className="text-sm text-gray-500 line-through">₹{Number(original).toLocaleString()}</span> : null}
                      </div>
                    ) : (
                      <div className="mb-4 text-red-600 font-semibold">Out of Stock</div>
                    )}

                    {p.isLimited && !p.isOutOfStock && (
                      <div className="text-red-600 text-sm font-semibold mt-1">Limited Product</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={(e) => addToCart(e, p)}
                      className="w-full bg-sky-500 text-white hover:bg-sky-600 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Add to Cart
                    </button>
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
