import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../utils/productHelper'

const ITEMS = 10

const KelolaProduk = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(getProducts())
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState('all')

  // Filter berdasarkan tab
  let filtered = products
  if (tab === 'featured') filtered = products.filter((p) => p.featured)
  if (tab === 'sale') filtered = products.filter((p) => p.discountPrice && p.discountPrice > 0)
  if (tab === 'out') filtered = products.filter((p) => p.stock === 0)

  // Search
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const totalPages = Math.ceil(filtered.length / ITEMS)
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS)

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      const updated = deleteProduct(id)
      setProducts(updated)
      // Reset page kalau halaman sekarang jadi kosong
      const newTotalPages = Math.ceil(updated.length / ITEMS)
      if (page > newTotalPages && newTotalPages > 0) setPage(newTotalPages)
    }
  }

  const handleTabChange = (key) => {
    setTab(key)
    setPage(1)
  }

  const tabs = [
    { key: 'all', label: `All Product (${products.length})` },
    { key: 'featured', label: `Featured (${products.filter((p) => p.featured).length})` },
    { key: 'sale', label: `On Sale (${products.filter((p) => p.discountPrice && p.discountPrice > 0).length})` },
    { key: 'out', label: `Out of Stock (${products.filter((p) => p.stock === 0).length})` },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">All Products</h1>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-[#1A7A6D] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#15665b] transition-colors"
        >
          <span>+</span> ADD NEW PRODUCT
        </Link>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTabChange(t.key)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'bg-[#1A7A6D] text-white border-[#1A7A6D]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search your product"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-52 bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#1A7A6D]"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3 w-12">No.</th>
                <th className="text-left text-xs font-medium px-4 py-3">Product</th>
                <th className="text-left text-xs font-medium px-4 py-3">Created Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Orders</th>
                <th className="text-left text-xs font-medium px-4 py-3">Stocks</th>
                <th className="text-center text-xs font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                paginated.map((product, i) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                        <span className="text-sm text-gray-600">{(page - 1) * ITEMS + i + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-9 h-9 rounded-md object-cover bg-gray-100" />
                        <div>
                          <span className="text-sm text-gray-700">{product.name}</span>
                          {product.stock === 0 && (
                            <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Out of stock</span>
                          )}
                          {product.discountPrice > 0 && (
                            <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Sale</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.createdAt}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.orders}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                          className="text-[#1A7A6D] hover:text-[#15665b]"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-30"
            >
              ← Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-md text-sm ${
                    page === p ? 'bg-[#1A7A6D] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default KelolaProduk