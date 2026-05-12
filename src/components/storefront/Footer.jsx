import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-luvera-green-footer text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/shop" className="hover:text-white transition-colors">Face Care</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Body Care</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Eye & Lip Care</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Hair & Scalp Care</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Social</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tiktok</a></li>
            </ul>
          </div>
        </div>

        {/* Logo & Copyright */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between">
          <h2 className="font-serif text-6xl md:text-8xl font-light">Luvéra</h2>
          <p className="text-sm text-white/50 mt-4 md:mt-0">2025 Luvera. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer