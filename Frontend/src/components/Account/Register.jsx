import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Waves from '../Waves'
import { useAppContext } from '../../context/ShopContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



function Register() {
  const navigate = useNavigate();
  const{axios,setToken,setUser} = useAppContext();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false,
  })
  const [show, setShow] = useState({ password: false, confirmPassword: false })
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [submitting, setSubmitting] = useState(false)

  function onChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function toggle(field) {
    setShow((s) => ({ ...s, [field]: !s[field] }))
  }

  function validateName(name) {
    if (!name || name.trim().length < 2) return 'Name must be at least 2 characters long'
    return ''
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) return 'Please enter a valid email address'
    return ''
  }

  function passwordStrength(password) {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    return strength
  }

  const strengthMeta = useMemo(() => {
    const s = passwordStrength(form.password)
    if (s <= 2) return { cls: 'strength-weak', label: 'Weak' }
    if (s === 3) return { cls: 'strength-fair', label: 'Fair' }
    if (s === 4) return { cls: 'strength-good', label: 'Good' }
    return { cls: 'strength-strong', label: 'Strong' }
  }, [form.password])

  function validateAll() {
    const nameErr = validateName(form.fullName)
    const emailErr = validateEmail(form.email)
    const pwStrength = passwordStrength(form.password)
    const pwErr = pwStrength < 3 && form.password.length > 0
      ? 'Password needs more variety (length 8+, upper, lower, number, special)'
      : (form.password ? '' : 'Password is required')
    const confirmErr = form.password === form.confirmPassword ? '' : 'Passwords do not match'
    const next = { name: nameErr, email: emailErr, password: pwErr, confirmPassword: confirmErr }
    setErrors(next)
    return !Object.values(next).some(Boolean)
  }

  const handleRegister=async(e)=> {
    e.preventDefault()
    if (!validateAll()) return; // Prevent submit if validation fails
  setSubmitting(true);
    try {
    const { fullName, email, password } = form;
    const  response  = await axios.post('/api/user/register', { name:fullName, email, password })
    if (response.data.success) {
      setToken(response.data.token)
      setUser(response.data.user)
      try {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      } catch {}
      axios.defaults.headers.common['Authorization'] = response.data.token
      navigate('/')
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message || "register failed")
  }
  setSubmitting(false)
}

  return (
    <>
      <Waves />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join hK aquafresh</h2>
            <p className="text-gray-600">Create your account and start your pure water journey</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 water-ripple">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <input id="fullName" name="fullName" type="text" required className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your full name" value={form.fullName} onChange={onChange} />
                </div>
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input id="email" name="email" type="email" required className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email" value={form.email} onChange={onChange} />
                </div>
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input id="password" name="password" type={show.password ? 'text' : 'password'} required className="input-focus block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Create a strong password" value={form.password} onChange={onChange} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => toggle('password')}>
                    <svg className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Password Strength</span>
                    <span>{strengthMeta.label}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className={`strength-meter ${strengthMeta.cls}`}></div>
                  </div>
                </div>
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type={show.confirmPassword ? 'text' : 'password'} required className="input-focus block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Confirm your password" value={form.confirmPassword} onChange={onChange} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => toggle('confirmPassword')}>
                    <svg className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                </div>
                {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-sky-600 focus:ring-blue-500 border-gray-300 rounded" checked={form.terms} onChange={onChange} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the{' '}
                    <Link to="#" className="text-sky-600 hover:text-blue-800 transition-colors">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="#" className="text-sky-600 hover:text-blue-800 transition-colors">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="newsletter" name="newsletter" type="checkbox" className="h-4 w-4 text-sky-600 focus:ring-blue-500 border-gray-300 rounded" checked={form.newsletter} onChange={onChange} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="text-gray-700">Subscribe to our newsletter for water purification tips and product updates</label>
                </div>
              </div>

              <button type="submit" className="w-full water-gradient text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 water-ripple" disabled={submitting}>
                {submitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or have an account?</span>
                </div>
              </div>


              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-sky-600 hover:text-blue-800 font-medium transition-colors">Sign in here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Register


