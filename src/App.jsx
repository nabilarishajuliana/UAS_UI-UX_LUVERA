import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth, RequireAdmin } from './components/ProtectedRoute'
import ScrollToTop from './utils/ScrollToTop'
// Layouts
import StorefrontLayout from './components/storefront/StorefrontLayout'
import AdminLayout from './components/admin/AdminLayout'

// Storefront Pages
import LandingPage from './pages/storefront/LandingPage'
import KatalogProduk from './pages/storefront/KatalogProduk'
import DetailProduk from './pages/storefront/DetailProduk'
import ArsipArtikel from './pages/storefront/ArsipArtikel'
import DetailArtikel from './pages/storefront/DetailArtikel'
import Keranjang from './pages/storefront/Keranjang'
import Pembayaran from './pages/storefront/Pembayaran'
import RiwayatTransaksi from './pages/storefront/RiwayatTransaksi'
import Login from './pages/storefront/Login'
import Register from './pages/storefront/Register'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import KelolaProduk from './pages/admin/KelolaProduk'
import KelolaArtikel from './pages/admin/KelolaArtikel'
import KelolaPengguna from './pages/admin/KelolaPengguna'
import KelolaTransaksi from './pages/admin/KelolaTransaksi'
import AdminAddProduct from './pages/admin/AdminAddProduct'
import AdminAddArticle from './pages/admin/AdminAddArticle'
import AdminDetailPengguna from './pages/admin/AdminDetailPengguna'
import AdminDetailTransaksi from './pages/admin/AdminDetailTransaksi'
import AdminPreviewArtikel from './pages/admin/AdminPreviewArtikel'
import KelolaContact from './pages/admin/KelolaContact'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* ==========================================
            STOREFRONT — Halaman Customer
            Semua halaman ini punya Navbar + Footer
            ========================================== */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<KatalogProduk />} />
          <Route path="/shop/:id" element={<DetailProduk />} />
          <Route path="/blog" element={<ArsipArtikel />} />
          <Route path="/blog/:id" element={<DetailArtikel />} />
          <Route path="/cart" element={<Keranjang />} />
          <Route path="/checkout" element={<RequireAuth><Pembayaran /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><RiwayatTransaksi /></RequireAuth>} />
        </Route>

        {/* ==========================================
            AUTH — Halaman Login/Register
            Tanpa Navbar & Footer (standalone)
            ========================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ==========================================
            ADMIN — Halaman Admin Panel
            Semua halaman ini punya Sidebar + Top Bar
            ========================================== */}
        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<KelolaProduk />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="products/:id" element={<AdminAddProduct />} />
          <Route path="blog" element={<KelolaArtikel />} />
          <Route path="blog/add" element={<AdminAddArticle />} />
          <Route path="blog/:id" element={<AdminAddArticle />} />
          <Route path="customers" element={<KelolaPengguna />} />
          <Route path="customers/:id" element={<AdminDetailPengguna />} />
          <Route path="orders" element={<KelolaTransaksi />} />
          <Route path="orders/:id" element={<AdminDetailTransaksi />} />
          <Route path="blog/preview/:id" element={<AdminPreviewArtikel />} />
          <Route path="contact" element={<KelolaContact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App