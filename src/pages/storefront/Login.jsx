import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/authHelper'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const result = login(email, password)

    if (result.success) {
      // Admin → redirect ke admin panel
      if (result.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      setError(result.message)
    }
  }

  const inputClass = "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-luvera-text placeholder-gray-400 outline-none focus:ring-1 focus:ring-luvera-dark focus:border-luvera-dark transition-all"

  return (
    <div className="min-h-screen bg-luvera-cream flex flex-col items-center justify-center px-4 relative">
      
      {/* OPTION 1: Floating Back to Home Button (Top Left) */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-luvera-muted hover:text-luvera-dark transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 w-full max-w-md my-12">

        {/* Header */}
        <h1 className="font-serif text-3xl text-center text-luvera-text mb-2">Login</h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Please enter your e-mail and password:
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-luvera-dark text-white text-sm font-semibold py-3.5 rounded-lg hover:bg-luvera-brown transition-colors duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Button */}
        <button className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 text-sm text-luvera-text hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></span>
          Continue With Google
        </button>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-400">
            Forgot your password? <span className="text-luvera-text underline cursor-pointer">Recover password</span>
          </p>
          <p className="text-sm text-gray-400">
            Don't have an account? <Link to="/register" className="text-luvera-text underline">Create an Account</Link>
          </p>
          
          {/* OPTION 2: Subtle Cancel Link (Bottom Center) */}
          <div className="pt-2">
            <Link to="/" className="text-xs text-gray-400 hover:text-luvera-brown transition-colors">
              Cancel and return to Store
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-6 bg-luvera-cream rounded-lg p-4 text-xs text-luvera-muted">
          <p className="font-semibold text-luvera-text mb-1">Demo Login:</p>
          <p>Customer: <span className="font-mono">nabila@email.com</span></p>
          <p>Admin: <span className="font-mono">admin@luvera.com</span></p>
          <p>Password: <span className="font-mono">password123</span></p>
        </div>

      </div>
    </div>
  )
}

export default Login