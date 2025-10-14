import React from 'react';
import DashboardPage from './Pages/Dashboard';
import AddProductPage from './Pages/AddProduct';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import ProductListed from './Pages/ProductList';

export const backend = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/listed-product" element={<ProductListed />} />
      </Routes>
    </>
  )
}

export default App
