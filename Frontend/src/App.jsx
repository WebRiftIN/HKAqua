import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollTopButton from './components/ScrollTopButton'
import { Suspense, lazy } from 'react'
const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))
const Booking = lazy(() => import('./pages/Booking'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./components/account/Login'))
const Register = lazy(() => import('./components/account/Register'))
const Products = lazy(() => import('./pages/Products'))
const SingleProduct = lazy(() => import('./pages/SingleProduct'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const MyOrders = lazy(() => import('./pages/MyOrders'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="py-16 text-center text-gray-600">Loading...</div>}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default App
