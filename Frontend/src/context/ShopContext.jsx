import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    // const navigate = useNavigate()
    const [token, setToken] = useState(() => localStorage.getItem('token') || undefined)
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })

    useEffect(() => {
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
        axios, token, setToken, user, setUser, logout
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