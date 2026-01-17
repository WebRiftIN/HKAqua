import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ContactPage from './Pages/ContactPage';
import AddProductPage from './Pages/AddProduct';
import './App.css';
import NotFound from './Pages/NotFound';
import ProductListed from './Pages/ProductList';
import OrderReceivedPage from './Pages/OrderReceived';
import ServicesPage from './Pages/ServicesPage';
import AdminLogin from './Pages/AdminLogin';

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
    </Routes>
  );
}

export default App;
