import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import { AppProvider } from './context/ShopContext.jsx'
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProvider>
     <ScrollToTop />
  <StrictMode>
    <App />
  </StrictMode>
  </AppProvider>
  </BrowserRouter>
)
