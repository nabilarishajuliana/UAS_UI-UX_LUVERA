import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// 1. Ubah import ke authHelper
import { getCurrentUser, updateCurrentUserProfile } from '../../utils/authHelper' 

const KelolaContact = () => {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
  })
  const [isSaved, setIsSaved] = useState(false)

  // 2. Ambil data admin yang sedang login dari session
  useEffect(() => {
    const adminSession = getCurrentUser()
    if (adminSession) {
      setForm(adminSession)
    }
  }, [])

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Profile image size is too large! Max limit is 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      handleChange('avatar', reader.result)
    }
    reader.readAsDataURL(file)
  }

  // 3. Simpan perubahan ke session auth
  const handleSubmit = (e) => {
    e.preventDefault()
    updateCurrentUserProfile(form)
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      window.location.reload() // Opsional: reload halaman agar text "ADMIN" di navbar layout langsung ter-update otomatis jika namanya diubah
    }, 1500)
  }

  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#1A7A6D]"
  
  return (
    <div className="max-w-4xl">
      {/* Breadcrumb Path */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Link to="/admin" className="hover:text-[#1A7A6D] transition-colors">
          Admin
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700 font-medium">Profile & Contact Information</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#1A7A6D]">Admin Contact Profile</h1>
        <button
          onClick={handleSubmit}
          className="bg-[#1A7A6D] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#15665b] transition-colors flex items-center gap-2"
        >
          {isSaved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
        
        {/* Left: Avatar Upload Box */}
        <div className="bg-white rounded-lg p-5 flex flex-col items-center border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 self-start">Profile Picture</h2>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />

          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-inner bg-gray-50 mb-4 relative group">
            <img 
              src={form.avatar || '/images/users/admin.jpg'} 
              alt="Admin Avatar" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium center"
            >
              Change Photo
            </button>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-xs font-medium text-[#1A7A6D] hover:underline"
          >
            Upload New Avatar
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-2">Supports JPG, PNG up to 2MB</p>
        </div>

        {/* Right: Admin Details Form */}
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm space-y-5">
          <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">Information Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Admin / Store Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Office / Admin Address</label>
            <textarea
              rows={4}
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default KelolaContact