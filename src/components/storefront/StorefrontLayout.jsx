import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const StorefrontLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="bg-luvera-cream min-h-screen">
      <Navbar />
      <main className={isHome ? '' : 'pt-[68px]'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default StorefrontLayout