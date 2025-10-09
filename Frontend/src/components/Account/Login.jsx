import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Waves from '../Waves'
import { useAppContext } from '../../context/ShopContext'
import toast from 'react-hot-toast'

function Login() {
  const navigate = useNavigate()
  const{axios,setToken,setUser} = useAppContext()
  const [showPassword, setShowPassword] = useState('')
  const[password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  function togglePassword() {
    setShowPassword((v) => !v)
  }

  const handleLogin=async(e)=> {
    try {
      e.preventDefault()
      const response = await axios.post('/api/user/login',{email,password})
      if(response.data.success){
        setToken(response.data.token)
        setUser(response.data.user)
        try {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch {}
        axios.defaults.headers.common['Authorization'] = response.data.token 
        navigate('/')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message||"Login failed")
    }
  }

  function socialLogin(provider) {
    alert(`Social login with ${provider} (demo)`) // replace with real flow
  }

  return (
    <>
    <Waves />
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your AquaPure account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 water-ripple">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input id="email" onChange={e=>setEmail(e.target.value)} value={email} name="email" type="email" required className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                  </svg>
                </div>
                <input id="password" onChange={e=>setPassword(e.target.value)} value={password} name="password" type={showPassword ? 'text' : 'password'} required className="input-focus block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your password" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePassword}>
                  <svg className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <Link to="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</Link>
            </div>

            <button type="submit" className="w-full water-gradient text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 water-ripple">Sign In</button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Sign up now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  )
}

export default Login


