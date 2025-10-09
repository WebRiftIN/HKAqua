import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Footer() {
  function onNewsletterSubmit(e) {
    e.preventDefault()
    alert('Thank you for subscribing to our newsletter!')
    e.currentTarget.reset()
  }

  return (
    <footer className="bg-gray-900 text-white py-16 xl-px-20 lg:px-10 md:px-6 sm:px-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <img src={logo} alt="HK Aquafresh Logo" className="logo-image-size object-contain" />
              </div>
            </div>
            <p className="text-gray-400 mb-6">Leading provider of premium water purification systems for homes and businesses worldwide.</p>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center hover:bg-sky-700 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center hover:bg-sky-700 transition-colors">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center hover:bg-sky-700 transition-colors">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#" className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center hover:bg-sky-700 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="#home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Products</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Home RO Systems</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Commercial RO</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Portable Purifiers</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Replacement Filters</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new products and offers</p>
            <form onSubmit={onNewsletterSubmit} className="space-y-4">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white" required />
              <button type="submit" className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HK Aquafresh. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


