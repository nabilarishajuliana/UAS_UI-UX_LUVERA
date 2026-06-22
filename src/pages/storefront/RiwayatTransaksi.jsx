import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' // Tambahkan useLocation
import { getCurrentUser, logout } from '../../utils/authHelper'
import transactions from '../../data/transactions.json'
import products from '../../data/products.json'

const RiwayatTransaksi = () => {
  const navigate = useNavigate()
  const location = useLocation() // Inisialisasi useLocation
  const user = getCurrentUser()
  
  // Deteksi tab aktif dari navigasi luar, jika tidak ada, default ke 'orders'
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'orders')
  
  // State untuk menyimpan URL avatar user saat ini
  const [avatar, setAvatar] = useState(user?.avatar || '/images/users/default.jpg')
  const fileInputRef = useRef(null)

  // Sinkronisasi tab jika user berpindah tab langsung dari Navbar tanpa muat ulang halaman
  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab)
    }
  }, [location.state])

  const userTransactions = transactions.filter((t) => t.userId === user?.id)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Fungsi untuk menangani perubahan foto profil
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const localImageUrl = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setAvatar(base64String)

        const updatedUser = { ...user, avatar: base64String }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeTab])

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">

          {/* LEFT — Account Sidebar */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="font-serif text-xl text-luvera-text mb-4">Account</h2>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => setActiveTab('contact')}
                className={`block transition-colors ${activeTab === 'contact' ? 'text-luvera-text font-semibold' : 'text-luvera-muted hover:text-luvera-text'}`}
              >
                Contact information
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`block transition-colors ${activeTab === 'orders' ? 'text-luvera-text font-semibold' : 'text-luvera-muted hover:text-luvera-text'}`}
              >
                Orders
              </button>
              <button onClick={handleLogout} className="text-luvera-brown hover:underline transition-colors">
                Log Out
              </button>
            </nav>
          </div>

          {/* RIGHT — Content */}
          <div>
            {activeTab === 'contact' ? (
              /* ══════════ CONTACT INFORMATION ══════════ */
              <div>
                <h2 className="font-serif text-xl text-luvera-text mb-6">Contact Information</h2>
                <div className="bg-white rounded-lg p-6 space-y-6">
                  
                  <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-luvera-cream-dark">
                    <div className="relative group w-24 h-24 rounded-full overflow-hidden bg-luvera-cream border border-luvera-cream-dark shadow-inner">
                      <img 
                        src={avatar} 
                        alt={user?.name} 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        onClick={triggerFileInput}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <span className="text-[10px] text-white font-medium tracking-wider uppercase text-center px-2">Change Photo</span>
                      </div>
                    </div>
                    
                    <div className="text-center sm:text-left">
                      <h3 className="font-serif text-lg text-luvera-text">{user?.name}</h3>
                      <p className="text-xs text-luvera-muted capitalize mb-3">{user?.role}</p>
                      <button 
                        onClick={triggerFileInput}
                        className="text-[0.7rem] font-semibold tracking-wider uppercase border border-luvera-text/30 px-4 py-1.5 rounded hover:bg-luvera-dark hover:text-white transition-all"
                      >
                        Upload New Image
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden" 
                      />
                    </div>
                  </div>

                  {/* Grid Data User */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Full Name</p>
                      <p className="text-sm font-medium text-luvera-text">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Email</p>
                      <p className="text-sm font-medium text-luvera-text">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Phone</p>
                      <p className="text-sm font-medium text-luvera-text">{user?.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Address</p>
                      <p className="text-sm font-medium text-luvera-text">{user?.address || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Member Since</p>
                      <p className="text-sm font-medium text-luvera-text">{user?.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luvera-muted mb-1">Role</p>
                      <p className="text-sm font-medium text-luvera-text capitalize">{user?.role}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-luvera-cream-dark flex gap-3">
                    <div className="bg-luvera-cream rounded-lg px-5 py-3 text-center flex-1">
                      <p className="text-lg font-semibold text-luvera-text">{user?.totalOrders}</p>
                      <p className="text-xs text-luvera-muted">Total Orders</p>
                    </div>
                    <div className="bg-luvera-cream rounded-lg px-5 py-3 text-center flex-1">
                      <p className="text-lg font-semibold text-luvera-text">Rp {user?.totalSpent?.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-luvera-muted">Total Spent</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ══════════ ORDERS ══════════ */
              <div>
                <h2 className="font-serif text-xl text-luvera-text mb-6">
                  Your Orders <span className="text-luvera-muted font-sans text-sm font-normal">(All)</span>
                </h2>

                {userTransactions.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-luvera-muted mb-4">You don't have any orders yet.</p>
                    <Link to="/shop" className="inline-block bg-luvera-dark text-white text-sm font-medium px-6 py-3 hover:bg-luvera-brown transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userTransactions.map((trx) => (
                      <div key={trx.id} className="bg-white rounded-lg p-6 reveal">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <p className="text-sm text-luvera-text">
                            <span className="font-medium">Order No. {trx.id}</span>, {trx.date}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                              trx.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              trx.status === 'In Processing' ? 'bg-blue-100 text-blue-700' :
                              trx.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {trx.status}
                            </span>
                            {trx.status !== 'Delivered' && trx.status !== 'Cancelled' && (
                              <button className="text-xs text-red-500 hover:underline">Cancel</button>
                            )}
                          </div>
                        </div>

                        {trx.items.map((item, i) => {
                          const product = products.find((p) => p.id === item.productId)
                          return (
                            <div key={i} className="flex items-center gap-4 py-3 border-t border-luvera-cream-dark">
                              <img
                                src={product?.image || '/images/products/face-wash.png'}
                                alt={item.name}
                                className="w-16 h-16 rounded-sm object-cover bg-luvera-cream-dark"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-luvera-text">{item.name}</p>
                                <p className="text-xs text-luvera-muted">{item.quantity} Pcs</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-luvera-text">Rp {item.price.toLocaleString('id-ID')}</p>
                                <p className="text-xs text-luvera-muted">Total: Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                          )
                        })}

                        <div className="border-t border-luvera-cream-dark pt-3 mt-2 space-y-1 text-sm text-right">
                          <p className="text-luvera-muted">STATUS: <span className="font-medium text-luvera-text">{trx.status}</span></p>
                          <p className="text-luvera-muted">Total: Rp {trx.subtotal.toLocaleString('id-ID')}</p>
                          <p className="text-luvera-muted">Tax: <span className="text-luvera-brown">Rp {trx.tax.toLocaleString('id-ID')}</span></p>
                          <p className="font-semibold text-luvera-text">Total: Rp {trx.total.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default RiwayatTransaksi