import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  const menuItems = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/products', label: 'All Products', icon: '📦' },
    { to: '/admin/orders', label: 'Order List', icon: '📋' },
    { to: '/admin/blog', label: 'All Blog', icon: '📰' },
    { to: '/admin/customers', label: 'Customer', icon: '👥' },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen p-4 hidden md:block">
      {/* Logo */}
      <h1 className="font-serif text-xl text-luvera-olive mb-8 px-2">Luvéra</h1>

      {/* Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-admin-teal text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar