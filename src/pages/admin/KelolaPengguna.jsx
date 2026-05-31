import { useState } from 'react'
import { Link } from 'react-router-dom'
import users from '../../data/users.json'

const customers = users.filter(u => u.role === 'customer')

const KelolaPengguna = () => {
  const [search, setSearch] = useState('')
  let filtered = customers
  if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Customer</h1>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-end px-5 py-4">
          <div className="relative">
            <input type="text" placeholder="Search your product" value={search} onChange={e => setSearch(e.target.value)}
              className="w-52 bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#1A7A6D]" />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3">Customer Id</th>
                <th className="text-left text-xs font-medium px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium px-4 py-3">Phone</th>
                <th className="text-left text-xs font-medium px-4 py-3">Order Count</th>
                <th className="text-left text-xs font-medium px-4 py-3">Total Spend</th>
                <th className="text-center text-xs font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-sm text-gray-600">#CUST{String(user.id).padStart(3, '0')}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{user.name}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{user.totalOrders}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 font-medium">Rp {user.totalSpent.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/admin/customers/${user.id}`} className="text-[#1A7A6D] hover:text-[#15665b]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                      </Link>
                      <button className="text-red-500 hover:text-red-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default KelolaPengguna