import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../utils/authHelper'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  const navigate = useNavigate()
  const user = getCurrentUser()
  
  // State untuk mengontrol hamburger menu & dropdown akun
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    
    <div className="flex bg-gray-50 min-h-screen relative overflow-x-hidden">
      
      {/* Sidebar - Sekarang menerima state open & fungsi close untuk mobile */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 min-w-0 w-full">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          
          {/* Hamburger & Mobile Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 md:hidden"
              title="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div className="md:hidden">
              <Link to="/" className="font-serif text-lg font-semibold text-gray-800">Luvéra</Link>
            </div>
          </div>
          
          <div className="hidden md:block" />

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Notification */}
            <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            {/* Admin Dropdown - Menggunakan Klik State biar aman di HP */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Tutup otomatis saat klik luar luar
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <span>ADMIN</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-11 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    View Store
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout