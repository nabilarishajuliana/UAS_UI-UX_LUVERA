import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div></div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Notification */}
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            {/* Admin Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
              <span>ADMIN</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout