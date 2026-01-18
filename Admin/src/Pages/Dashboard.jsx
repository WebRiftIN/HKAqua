import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { backend } from '../App';
import '../App.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalServices: 0,
        totalContacts: 0,
        totalRevenue: 0
    });
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchStatsOrdersContacts = async () => {
            try {
                const url = backend.endsWith('/') ? backend : backend + '/';
                // Fetch dashboard stats
                const statsRes = await axios.get(url + 'api/admin/getAdminDashboard', { withCredentials: true });
                if (statsRes.data.success) {
                    setStats(statsRes.data.dashboard);
                }
                // Fetch orders
                const ordersRes = await axios.get(url + 'api/admin/getAllOrders', { withCredentials: true });
                if (ordersRes.data.success) {
                    setOrders(ordersRes.data.orders);
                }
                // Fetch contacts
                const contactsRes = await axios.get(url + 'api/admin/getAllContacts', { withCredentials: true });
                if (contactsRes.data.success) {
                    setContacts(contactsRes.data.contacts);
                }
            } catch (err) {
                // Optionally handle error
            }
        };
        fetchStatsOrdersContacts();
    }, []);

    // ...existing static data...
    const statsData = [
        {
            title: "Total Sales",
            value: `₹${stats.totalRevenue}`,
            changeColor: "text-green-600",
            icon: (
                <svg className="w-8 h-8 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            )
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            changeColor: "text-green-600",
            icon: (
                <svg className="w-8 h-8 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                </svg>
            )
        },
        {
            title: "Total Services",
            value: stats.totalServices,
            changeColor: "text-sky-600",
            icon: (
                <svg className="w-8 h-8 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        },
        {
            title: "Contact Messages",
            value: stats.totalContacts,
            changeColor: "text-orange-600",
            icon: (
                <svg className="w-8 h-8 text-water-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            )
        }
    ];
    // Show top 3 most recent orders
    const recentOrders = orders.slice(0, 3);
    // Show top 3 most recent contacts
    const recentMessages = contacts.slice(0, 3).map((contact, idx) => ({
        name: contact.name || contact.fullName || 'Contact',
        message: contact.message || contact.subject || 'Message',
        time: contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '',
        borderColor: idx === 0 ? 'border-water-blue' : idx === 1 ? 'border-water-gradient' : 'border-deep-water'
    }));

    const handleQuickAction = (action) => {
        if (action === 'Add New Product') {
            navigate('/add-product');
        } else if (action === 'Process Orders') {
            navigate('/orders');
        } else if (action === 'Schedule Service') {
            navigate('/services');
        }
    };

    
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600 text-lg">Welcome to hK aquafresh RO Admin Panel - Monitor your water purification business</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 card-hover border border-blue-100">
                        <div className="flex items-center">
                            <div className="p-4 rounded-2xl stat-icon">
                                {stat.icon}
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                        <button className="text-water-blue hover:text-deep-water font-medium text-sm" onClick={() => navigate('/orders')}>View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                            <div key={order._id || index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
                                <div className="flex items-center">
                                    <div className={`w-12 h-12 bg-water-blue rounded-xl flex items-center justify-center mr-4`}>
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.productName || order.product || 'Product'}</p>
                                        <p className="text-sm text-gray-600">Order {order._id} • {order.customerName || order.customer || 'Customer'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium`}>
                                        {order.status || 'Status'}
                                    </span>
                                    <p className="text-sm text-gray-500 mt-1">₹{order.amount || order.price || '0'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Messages */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleQuickAction('Add New Product')}
                                className="w-full bg-gradient-to-r from-blue-300 to-blue-500 hover:from-deep-water hover:to-water-blue text-white p-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                Add New Product
                            </button>
                            <button
                                onClick={() => handleQuickAction('Process Orders')}
                                className="w-full bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 text-water-blue p-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                Process Orders
                            </button>
                            <button
                                onClick={() => handleQuickAction('Schedule Service')}
                                className="w-full bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 text-green-700 p-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                Schedule Service
                            </button>
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Recent Messages</h3>
                            {/* <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">5 New</span> */}
                        </div>
                        <div className="space-y-4">
                            {recentMessages.map((message, index) => (
                                <div key={index} className={`p-3 bg-gradient-to-r from-blue-50 to-white rounded-xl border-l-4 ${message.borderColor}`}>
                                    <p className="font-semibold text-gray-900 text-sm">{message.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                                    <p className="text-xs text-gray-500 mt-2">{message.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </>
    );
};

export default Dashboard;