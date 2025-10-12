import React from 'react';
import DashboardPage from './Pages/Dashboard';
import AddProductPage from './Pages/AddProduct';
import './App.css';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </>
  )
}

export default App
