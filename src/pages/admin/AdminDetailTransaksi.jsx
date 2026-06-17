import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTransactionById, updateTransactionStatus } from '../../utils/transactionHelper'
import { getProducts } from '../../utils/productHelper'

const AdminDetailTransaksi = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const products = getProducts()
  const [order, setOrder] = useState(getTransactionById(id))
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'Delivered')
  const [saved, setSaved] = useState(false)

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-4">Order not found</p>
        <Link to="/admin/orders" className="text-[#1A7A6D] hover:underline text-sm">← Back to Orders</Link>
      </div>
    )
  }

  const handleSaveStatus = () => {
    updateTransactionStatus(id, selectedStatus)
    setOrder({ ...order, status: selectedStatus })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const statusBadge = (status) => {
    const styles = {
      Delivered: 'bg-green-100 text-green-700',
      'In Processing': 'bg-blue-100 text-blue-700',
      Confirmed: 'bg-yellow-100 text-yellow-700',
      Cancelled: 'bg-red-100 text-red-700',
    }
    return styles[status] || styles.Delivered
  }

  return (
    <div>
      {/* Back Path */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/admin" className="hover:text-[#1A7A6D] transition-colors">Dashboard</Link>
        <span>→</span>
        <Link to="/admin/orders" className="hover:text-[#1A7A6D] transition-colors">Orders List</Link>
        <span>→</span>
        <span className="text-gray-800 font-medium">#{id.replace('TRX-', '')}</span>
      </div>

      <h1 className="text-xl font-semibold text-gray-800 mb-6">Orders Details</h1>

      {/* Order ID + Status + Actions */}
      <div className="bg-white rounded-lg p-6 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-800">Orders ID: #{id.replace('TRX-', '')}</h2>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusBadge(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#1A7A6D] text-white text-sm px-4 py-2 rounded-md outline-none cursor-pointer"
            >
              <option value="Delivered">Delivered</option>
              <option value="In Processing">In Processing</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleSaveStatus}
              className={`text-sm font-medium px-5 py-2 rounded-md transition-colors ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-[#1A7A6D] text-white hover:bg-[#15665b]'
              }`}
            >
              {saved ? '✓ Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-5 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {order.date}
        </p>

        {/* 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center text-sm">👤</div>
              <h3 className="text-sm font-semibold text-gray-800">Customer</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Full Name: {order.customerName}</p>
            <p className="text-xs text-gray-600">Phone: 08136728908</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-200 flex items-center justify-center text-sm">📦</div>
              <h3 className="text-sm font-semibold text-gray-800">Order Info</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Payment Method: {order.paymentMethod}</p>
            <p className="text-xs text-gray-600">Status: {order.status}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-200 flex items-center justify-center text-sm">📍</div>
              <h3 className="text-sm font-semibold text-gray-800">Deliver to</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Address: {order.shippingAddress}</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Payment Info</h3>
            <p className="text-xs text-gray-600">{order.paymentMethod}</p>
            <p className="text-xs text-gray-600">Business name: {order.customerName}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Note</h3>
            <textarea
              rows={3}
              placeholder="Type some notes"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#1A7A6D] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg p-6 mb-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-8">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Product Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Order ID</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Quantity</th>
                <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => {
                const product = products.find((p) => p.id === item.productId)
                return (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product?.image || '/images/products/face-wash.png'}
                          alt={item.name}
                          className="w-9 h-9 rounded-md object-cover bg-gray-100"
                        />
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">#{id.replace('TRX-', '')}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mt-4">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (10%)</span>
              <span>Rp {order.tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span>{order.discount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping Rate</span>
              <span>{order.shippingRate}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-gray-800">Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/orders')}
        className="border border-gray-300 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        ← Back to Orders List
      </button>
    </div>
  )
}

export default AdminDetailTransaksi