import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-luvera-dark2 text-white mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div>
            <h4 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] mb-5 text-white/60">Shop</h4>
            <ul className="space-y-2.5 text-[0.85rem] text-white/50">
              <li><Link to="/shop" className="hover:text-luvera-brown transition-colors">Face Care</Link></li>
              <li><Link to="/shop" className="hover:text-luvera-brown transition-colors">Body Care</Link></li>
              <li><Link to="/shop" className="hover:text-luvera-brown transition-colors">Eye & Lip Care</Link></li>
              <li><Link to="/shop" className="hover:text-luvera-brown transition-colors">Hair & Scalp Care</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] mb-5 text-white/60">Social</h4>
            <ul className="space-y-2.5 text-[0.85rem] text-white/50">
              <li><a href="#" className="hover:text-luvera-brown transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-luvera-brown transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-luvera-brown transition-colors">Tiktok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-end justify-between">
          <h2 className="font-serif text-[clamp(4rem,15vw,9rem)] font-light leading-none text-white/90 tracking-tight">
            Luvéra
          </h2>
          <p className="text-[0.72rem] text-white/25 mt-4 md:mt-0 tracking-[0.04em]">
            2025 Luvera. All right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer