import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully!');
            // In a real application, this would redirect to login page
        }
    };

    const navigationItems = [
        { name: 'Dashboard', path: '/', active: location.pathname === '/' },
        { name: 'Add Product', path: '/add-product', active: location.pathname === '/add-product' },
        { name: 'Product List', path: '/listed-product', active: location.pathname === '/listed-product' },
        { name: 'Orders', path: '/orders', active: location.pathname === '/orders' },
        { name: 'Contact', path: '/contact', active: location.pathname === '/contact' },
        { name: 'Services', path: '/services', active: location.pathname === '/services' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="water-gradient shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                src={logo}
                                alt="AquaPure Logo"
                                className="w-auto h-13  shadow-md object-cover"
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavigation(item.path)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${item.active
                                        ? 'bg-sky-600 bg-opacity-20 text-white'
                                        : 'text-white hover:bg-sky-600 hover:bg-opacity-20'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={logout}
                            className="text-white hover:bg-red-500 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white border-opacity-30"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white hover:bg-sky-800 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-deep-water bg-opacity-90 backdrop-blur-sm`}>
                <div className="px-4 pt-2 pb-3 space-y-1">
                    {navigationItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${item.active
                                    ? 'bg-sky-900 bg-opacity-50 text-white'
                                    : 'text-white hover:bg-sky-900 hover:bg-opacity-50'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                    <button
                        onClick={logout}
                        className="block text-white hover:bg-red-500 hover:bg-opacity-30 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 border border-white border-opacity-30 mt-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
