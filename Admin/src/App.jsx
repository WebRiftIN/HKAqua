import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ContactPage from './Pages/ContactPage';
import AddProductPage from './Pages/AddProduct';
import './App.css';
import NotFound from './Pages/NotFound';
import ProductListed from './Pages/ProductList';
import OrderReceivedPage from './Pages/OrderReceived';
import ServicesPage from './Pages/ServicesPage';

export const backend = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/listed-product" element={<ProductListed />} />
        <Route path="/orders" element={<OrderReceivedPage />} />
  <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
