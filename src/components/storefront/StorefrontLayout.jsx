import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const StorefrontLayout = () => {
  return (
    <div className="bg-luvera-cream min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default StorefrontLayout