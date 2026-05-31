import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getTransactions, updateTransactionStatus } from '../../utils/transactionHelper'

const ITEMS = 10

const KelolaTransaksi = () => {
  const [transactions, setTransactions] = useState(getTransactions())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  // Filter by status
  let filtered = transactions
  if (statusFilter !== 'All') {
    filtered = filtered.filter((t) => t.status === statusFilter)
  }

  // Search
  if (search) {
    filtered = filtered.filter(
      (t) =>
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())
    )
  }

  const totalPages = Math.ceil(filtered.length / ITEMS)
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS)

  // Quick status change dari tabel
  const handleQuickStatusChange = (orderId, newStatus) => {
    updateTransactionStatus(orderId, newStatus)
    setTransactions(getTransactions())
  }

  // Hitung jumlah per status buat badge
  const statusCounts = {
    All: transactions.length,
    Delivered: transactions.filter((t) => t.status === 'Delivered').length,
    'In Processing': transactions.filter((t) => t.status === 'In Processing').length,
    Confirmed: transactions.filter((t) => t.status === 'Confirmed').length,
    Cancelled: transactions.filter((t) => t.status === 'Cancelled').length,
  }

  const statusStyles = {
    Delivered: { dot: 'bg-green-500', text: 'text-green-600' },
    'In Processing': { dot: 'bg-blue-500', text: 'text-blue-600' },
    Confirmed: { dot: 'bg-yellow-500', text: 'text-yellow-600' },
    Cancelled: { dot: 'bg-red-500', text: 'text-red-600' },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Orders List</h1>
        <span className="text-sm text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          19 Juni 2025 - 19 Juli 2025
        </span>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 py-4">
          {/* Status Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {['All', 'Delivered', 'In Processing', 'Confirmed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status); setPage(1) }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-[#1A7A6D] text-white border-[#1A7A6D]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search order or customer"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-56 bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#1A7A6D]"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3 w-8">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-white" />
                </th>
                <th className="text-left text-xs font-medium px-4 py-3">Order ID</th>
                <th className="text-left text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Customer Name</th>
                <th className="text-left text-xs font-medium px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium px-4 py-3">Amount</th>
                <th className="text-left text-xs font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginated.map((order) => {
                  const style = statusStyles[order.status] || statusStyles.Delivered
                  return (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 font-medium">
                        #{order.id.replace('TRX-', '')}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">{order.date}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{order.customerName.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {/* Status dropdown — bisa langsung ganti dari tabel */}
                        <select
                          value={order.status}
                          onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-none outline-none cursor-pointer ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'In Processing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          <option value="Delivered">Delivered</option>
                          <option value="In Processing">In Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-700 font-medium">
                        Rp {order.subtotal.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3.5">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-sm text-[#1A7A6D] hover:underline font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })
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

export default KelolaTransaksi