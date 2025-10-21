import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    // const navigate = useNavigate()
    const [token, setToken] = useState()
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    // const [cartData, setCartData] = useState({})
    const [addingToCart, setAddingToCart] = useState({}) // Track loading state for each product
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })
    const userId = user._id;
    
    const addToCart = async (userId, itemId) => {
        if (!token) {
            toast.error("Please login to add items to your cart!");
            window.location.href = "/login";
            return;
        }
        // Set loading state for this specific product
        setAddingToCart(prev => ({ ...prev, [itemId]: true }))

        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        try {
            await axios.post('/api/cart/addToCart', { userId, itemId })
            // Refresh cart data after adding
            fetchCart()
            getCartCount()
            toast.success('Added to cart!')
        } catch (error) {
            toast.error(error.message)
        } finally {
            // Clear loading state for this product
            setAddingToCart(prev => ({ ...prev, [itemId]: false }))
        }
    }

    const updateCartQuantity = async (userId, itemId, quantity) => {
        try {
            await axios.post('/api/cart/updateQuantity', { userId, itemId, quantity })
            // Refresh cart data after updating
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removeFromCart = async (userId, itemId) => {
        try {
            await axios.post('/api/cart/removeItem', { userId, itemId })
            // Refresh cart data after removing
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const clearUserCart = async (userId) => {
        try {
            await axios.post('/api/cart/clearCart', { userId })
            // Refresh cart data after clearing
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCart = async () => {
        try {
            const response = await axios.post('/api/cart/getCart', { userId: user._id })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/allProducts')

            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (!quantity || quantity <= 0) continue;

            // Handle extension items which are stored with a prefix like "warranty:<productId>" or "maintenance:<productId>"
            if (itemId.startsWith('warranty:') || itemId.startsWith('maintenance:')) {
                const [type, productId] = itemId.split(':')
                const product = products.find((p) => p._id === productId)
                if (!product) continue
                // Determine extension price: fallback to 10% for warranty, 8% for maintenance, with minimums
                const basePrice = Number(product.discountedPrice || product.price || 0)
                let extPrice = 0
                if (type === 'warranty') {
                    extPrice = Math.max(499, Math.round(basePrice * 0.10))
                } else if (type === 'maintenance') {
                    extPrice = Math.max(399, Math.round(basePrice * 0.08))
                }
                totalAmount += extPrice * quantity
                continue
            }

            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += Number(itemInfo.discountedPrice || itemInfo.price || 0) * quantity;
            }
        }
        setCartTotal(totalAmount);
    };

    useEffect(() => {
        fetchProducts()
        fetchCart()
        getCartAmount()
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    //useEffect for getting cart total
    useEffect(() => {
        getCartAmount()
    }, [cartItems, products]);

    const logout = () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch { }
        setToken(undefined)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        toast.success('Logged out')
    }

    const value = {
        axios, token, setToken, user, setUser, logout, products, cartItems, addToCart,
        updateCartQuantity, removeFromCart, clearUserCart, addingToCart
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}