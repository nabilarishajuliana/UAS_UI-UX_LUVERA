import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [registered, setRegistered] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    // Simulasi register — langsung redirect ke login
    setRegistered(true)
    setTimeout(() => navigate('/login'), 1500)
  }

  const inputClass = "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-luvera-text placeholder-gray-400 outline-none focus:ring-1 focus:ring-luvera-dark focus:border-luvera-dark transition-all"

  if (registered) {
    return (
      <div className="min-h-screen bg-luvera-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-luvera-text mb-2">Account Created!</h2>
          <p className="text-luvera-muted text-sm">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luvera-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 w-full max-w-md">

        <h1 className="font-serif text-3xl text-center text-luvera-text mb-2">Register</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Please fill in form below</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">First Name</label>
            <input type="text" placeholder="First Name" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Last Name</label>
            <input type="text" placeholder="Last Name" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Email</label>
            <input type="email" placeholder="Email" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" className={inputClass} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-luvera-text mb-1.5">Confirm Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" className={inputClass} />
            </div>
          </div>

          <button onClick={handleRegister} className="w-full bg-luvera-dark text-white text-sm font-semibold py-3.5 rounded-lg hover:bg-luvera-brown transition-colors duration-300">
            Register
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 text-sm text-luvera-text hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></span>
          Continue With Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Do you already have an account? <Link to="/login" className="text-luvera-text underline">Back to Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register