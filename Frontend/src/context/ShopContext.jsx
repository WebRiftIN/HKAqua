import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    // const navigate = useNavigate()
    const [token, setToken] = useState()
    const [products,setProducts] = useState([])
    const [cartItems,setCartItems] = useState({})
    const [cartData,setCartData] = useState({})
    const [addingToCart, setAddingToCart] = useState({}) // Track loading state for each product
    console.log(cartData)
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })

    const addToCart = async(userId,itemId) =>{
        // Set loading state for this specific product
        setAddingToCart(prev => ({ ...prev, [itemId]: true }))
        
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        try {
            await axios.post('/api/cart/addToCart',{userId,itemId})
            // Refresh cart data after adding
            fetchCart()
            toast.success('Added to cart!')
        } catch (error) {
            toast.error(error.message)
        } finally {
            // Clear loading state for this product
            setAddingToCart(prev => ({ ...prev, [itemId]: false }))
        }
    }

    const updateCartQuantity = async(userId, itemId, quantity) => {
        try {
            await axios.post('/api/cart/updateQuantity', {userId, itemId, quantity})
            // Refresh cart data after updating
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removeFromCart = async(userId, itemId) => {
        try {
            await axios.post('/api/cart/removeItem', {userId, itemId})
            // Refresh cart data after removing
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const clearUserCart = async(userId) => {
        try {
            await axios.post('/api/cart/clearCart', {userId})
            // Refresh cart data after clearing
            fetchCart()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCart = async()=>{
        try {
            const response = await axios.post('/api/cart/getCart',{ userId: user._id })
            if(response.data.success){
                setCartData(response.data)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchProducts = async()=>{
        try {
            const {data} = await axios.get('/api/product/allProducts')
            
            if(data.success){
                setProducts(data.products)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    console.log(products);
    

    useEffect(() => {
        fetchProducts()
        fetchCart()
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    const logout = () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch {}
        setToken(undefined)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        toast.success('Logged out')
    }

    const value = {
        axios, token, setToken, user, setUser, logout, products, cartItems, addToCart, 
        updateCartQuantity, removeFromCart, clearUserCart, cartData, addingToCart
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