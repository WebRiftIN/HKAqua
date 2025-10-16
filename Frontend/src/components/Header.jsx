import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAppContext } from '../context/ShopContext'

function Header() {
  const [showAccount, setShowAccount] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, logout } = useAppContext()

  return (
    <>
      <nav className="fixed top-[20px] left-1/2 transform -translate-x-1/2 w-[90%] z-50 glass-effect flex items-center justify-center rounded-full shadow-lg">
        <div className="w-full container mx-auto px-4 py-4 ">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="HK Aquafresh Logo" className="logo-image-size object-contain" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-sky-600 transition-colors font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-sky-600 transition-colors font-medium">Products</Link>
              <Link to="/services" className="text-gray-700 hover:text-sky-600 transition-colors font-medium">Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-sky-600 transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-sky-600 transition-colors font-medium">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-700 hover:text-sky-600 transition-colors relative">
                <i className="fas fa-shopping-cart text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                <span className="sr-only">Cart</span>
              </Link>

              <div className="relative">
                <button className="text-gray-700 hover:text-sky-600 transition-colors" onClick={() => setShowAccount(true)} aria-expanded={showAccount} aria-controls="account-dropdown">
                  <i className="fas fa-user text-xl"></i>
                  <span className="sr-only">Account</span>
                </button>
                {showAccount && (
                  <div id="account-dropdown" className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <span className="font-semibold text-gray-800">{user ? `Hi, ${user.name}` : 'Account'}</span>
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAccount(false)} aria-label="Close account menu">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="py-2">
                      {user ? (
                        <>
                          <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">My Profile</Link>
                          <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">My Orders</Link>
                          <hr className="my-1" />
                          <button onClick={() => { setShowAccount(false); logout(); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">Logout</button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">Login</Link>
                          <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">Register</Link>
                          <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">My Orders</Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="md:hidden text-gray-700 hover:text-sky-600" onClick={() => setShowMobileMenu(true)} aria-expanded={showMobileMenu} aria-controls="mobile-menu">
                <i className="fas fa-bars text-xl"></i>
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div id="mobile-menu" className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute top-0 right-0 w-5/6 max-w-sm h-full bg-white shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="HK Aquafresh Logo" className="h-8 object-contain" />
              </div>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => setShowMobileMenu(false)} aria-label="Close main menu">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <nav className="space-y-2">
              <Link to="/" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/products" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Products</Link>
              <Link to="/services" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Services</Link>
              <Link to="/about" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>About</Link>
              <Link to="/contact" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Contact</Link>
              <hr className="my-2" />
              {user ? (
                <>
                  <Link to="/orders" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>My Orders</Link>
                  <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => { setShowMobileMenu(false); logout(); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Login</Link>
                  <Link to="/register" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800" onClick={() => setShowMobileMenu(false)}>Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header