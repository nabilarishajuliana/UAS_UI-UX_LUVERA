import { useParams, Link, useNavigate } from 'react-router-dom'
import users from '../../data/users.json'
import { getTransactions } from '../../utils/transactionHelper'

const AdminDetailPengguna = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = users.find((u) => u.id === parseInt(id))
  const transactions = getTransactions()
  const userTrx = transactions.filter((t) => t.userId === parseInt(id))

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-4">User not found</p>
        <Link to="/admin/customers" className="text-[#1A7A6D] hover:underline text-sm">← Back to Customers</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back Path */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/admin" className="hover:text-[#1A7A6D] transition-colors">Dashboard</Link>
        <span>→</span>
        <Link to="/admin/customers" className="hover:text-[#1A7A6D] transition-colors">Customers</Link>
        <span>→</span>
        <span className="text-gray-800 font-medium">{user.name}</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg p-6 mb-5">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-block mt-1 text-[11px] bg-[#1A7A6D]/10 text-[#1A7A6D] px-2.5 py-0.5 rounded-full font-medium capitalize">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-800">{user.phone}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-800">{user.address}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Join Date</p>
            <p className="text-sm font-medium text-gray-800">{user.joinDate}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Total Spent</p>
            <p className="text-sm font-medium text-gray-800">Rp {user.totalSpent.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold text-gray-800">{user.totalOrders}</p>
          <p className="text-xs text-gray-500 mt-1">Total Orders</p>
        </div>
        <div className="bg-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold text-[#1A7A6D]">Rp {user.totalSpent.toLocaleString('id-ID')}</p>
          <p className="text-xs text-gray-500 mt-1">Total Spent</p>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg p-6 mb-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Order History ({userTrx.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3">Order ID</th>
                <th className="text-left text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Items</th>
                <th className="text-left text-xs font-medium px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium px-4 py-3">Total</th>
                <th className="text-center text-xs font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {userTrx.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">No orders found</td>
                </tr>
              ) : (
                userTrx.map((trx) => (
                  <tr key={trx.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">{trx.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{trx.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{trx.items.length} items</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        trx.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        trx.status === 'In Processing' ? 'bg-blue-100 text-blue-700' :
                        trx.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>{trx.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right">Rp {trx.total.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/admin/orders/${trx.id}`} className="text-sm text-[#1A7A6D] hover:underline">View</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/customers')}
        className="border border-gray-300 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        ← Back to Customers
      </button>
    </div>
  )
}

export default AdminDetailPengguna