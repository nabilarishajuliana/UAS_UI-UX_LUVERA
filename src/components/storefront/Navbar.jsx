import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, logout } from '../../utils/authHelper'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Update user setiap pindah halaman
  useEffect(() => {
    setUser(getCurrentUser())
  }, [location])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/#about', label: 'About', isAnchor: true },
    { to: '/blog', label: 'Blog' },
  ]

  const handleNavClick = (link) => {
    setMobileMenuOpen(false)
    if (link.isAnchor) {
      if (location.pathname === '/') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setMobileMenuOpen(false)
    navigate('/')
  }

  // Dynamic styles
  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-luvera-cream/95 backdrop-blur-md border-b border-luvera-brown/15'

  const logoColor = isHome && !scrolled
    ? 'text-luvera-white'
    : 'text-luvera-dark'

  const linkColor = isHome && !scrolled
    ? 'text-white/85 hover:text-luvera-brown'
    : 'text-luvera-text hover:text-luvera-brown'

  const iconColor = isHome && !scrolled
    ? 'text-white/85 hover:text-white'
    : 'text-luvera-text hover:text-luvera-dark'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className={`font-serif text-[1.55rem] font-bold tracking-[0.04em] transition-colors duration-400 ${logoColor}`}
        >
          Luvéra
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <button
                key={link.to}
                onClick={() => handleNavClick(link)}
                className={`text-[0.8rem] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${linkColor}`}
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[0.8rem] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${isActive && !(isHome && !scrolled)
                    ? 'text-luvera-dark font-semibold'
                    : linkColor
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button className={`transition-colors duration-300 ${iconColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* Cart */}
          <Link to="/cart" className={`transition-colors duration-300 ${iconColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </Link>

          {/* User — conditional: logged in vs not */}
          {user ? (
            <div className="relative group">
              <button className={`flex items-center gap-1.5 transition-colors duration-300 ${iconColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
                <span className={`hidden md:inline text-[0.75rem] font-medium ${isHome && !scrolled ? 'text-white/85' : 'text-luvera-text'
                  }`}>
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-8 bg-white border border-luvera-cream-dark rounded-lg shadow-lg py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  to="/orders"
                  className="block px-4 py-2.5 text-[0.82rem] text-luvera-muted hover:text-luvera-text hover:bg-luvera-cream transition-colors"
                >
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2.5 text-[0.82rem] text-luvera-muted hover:text-luvera-text hover:bg-luvera-cream transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="h-px bg-luvera-cream-dark mx-3 my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 text-[0.82rem] text-red-500 hover:bg-red-50 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className={`transition-colors duration-300 ${iconColor}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
            </Link>
          )}



          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-luvera-dark'
              } ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-luvera-dark'
              } ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-luvera-dark'
              } ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-luvera-dark2 border-b border-white/10 shadow-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'
        }`}>
        <div className="flex flex-col items-center gap-5">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <button
                key={link.to}
                onClick={() => handleNavClick(link)}
                className="text-[0.88rem] text-white/80 tracking-[0.1em] uppercase hover:text-luvera-brown transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[0.88rem] text-white/80 tracking-[0.1em] uppercase hover:text-luvera-brown transition-colors"
              >
                {link.label}
              </NavLink>
            )
          )}

          {/* Mobile: Auth Links */}
          <div className="h-px w-16 bg-white/20 my-1" />
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="text-[0.88rem] text-white/80 tracking-[0.1em] uppercase hover:text-luvera-brown transition-colors">
                My Orders
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[0.88rem] text-white/80 tracking-[0.1em] uppercase hover:text-luvera-brown transition-colors">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="text-[0.88rem] text-red-400 tracking-[0.1em] uppercase hover:text-red-300 transition-colors">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-[0.88rem] text-white/80 tracking-[0.1em] uppercase hover:text-luvera-brown transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar