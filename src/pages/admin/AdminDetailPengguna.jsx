import { useParams, Link } from 'react-router-dom'
import users from '../../data/users.json'
import transactions from '../../data/transactions.json'

const AdminDetailPengguna = () => {
  const { id } = useParams()
  const user = users.find(u => u.id === parseInt(id))
  const userTrx = transactions.filter(t => t.userId === parseInt(id))

  if (!user) return <div className="p-10 text-center text-gray-500">User not found</div>

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/admin/customers" className="hover:text-[#1A7A6D]">Customers</Link>
        <span>→</span>
        <span className="text-gray-800">{user.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Customer Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-gray-800 font-medium">{user.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-gray-800">{user.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="text-gray-800">{user.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="text-gray-800">{user.address}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Join Date</span><span className="text-gray-800">{user.joinDate}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">{user.totalOrders}</p>
              <p className="text-xs text-gray-500 mt-1">Total Orders</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-gray-800">Rp {user.totalSpent.toLocaleString('id-ID')}</p>
              <p className="text-xs text-gray-500 mt-1">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Order History ({userTrx.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3">Order ID</th>
                <th className="text-left text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {userTrx.map(trx => (
                <tr key={trx.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 text-sm text-gray-600">{trx.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{trx.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      trx.status === 'Delivered' ? 'bg-green-100 text-green-700' : trx.status === 'In Processing' ? 'bg-blue-100 text-blue-700' : trx.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{trx.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right">Rp {trx.total.toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {userTrx.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-400">No orders found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDetailPengguna