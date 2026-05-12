import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="bg-luvera-cream border-b border-luvera-cream-dark">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-semibold text-luvera-olive">
          Luvéra
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? 'text-luvera-olive font-semibold'
                    : 'text-luvera-text-light hover:text-luvera-olive'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="text-luvera-text hover:text-luvera-olive transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* User */}
          <Link to="/login" className="text-luvera-text hover:text-luvera-olive transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="text-luvera-text hover:text-luvera-olive transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </Link>

          {/* Hamburger Menu - Mobile */}
          <button className="md:hidden text-luvera-text">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar