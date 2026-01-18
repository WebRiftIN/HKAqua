import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../src/Pages/Dashboard';
import ContactPage from '../src/Pages/ContactPage';
import AddProductPage from '../src/Pages/AddProduct';
import './App.css';
import NotFound from '../src/Pages/NotFound';
import ProductListed from '../src/Pages/ProductList';
import OrderReceivedPage from '../src/Pages/OrderReceived';
import ServicesPage from '../src/Pages/ServicesPage';
import AdminLogin from '../src/Pages/AdminLogin';

export const backend = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [admin, setAdmin] = useState(() => {
    // Check for persistent login in localStorage
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true' ? {} : null;
  });


  const handleLogin = (data) => {
    setAdmin(data);
    localStorage.setItem('isAdmin', 'true');
  };

    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await axios.post('/api/admin/logout');
      } catch (err) {
        // Ignore errors, just proceed
      }
      setAdmin(null);
      localStorage.removeItem('isAdmin');
      navigate('/');
    };

  return (
    <Routes>
      {/* Public route: Login */}
      <Route path="/login" element={
        !admin ? <AdminLogin onLogin={handleLogin} /> : <Navigate to="/" replace />
      } />
      {/* Protected dashboard routes */}
      <Route path="/*" element={
        admin ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/listed-product" element={<ProductListed />} />
        <Route path="/orders" element={<OrderReceivedPage />} />
  <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
