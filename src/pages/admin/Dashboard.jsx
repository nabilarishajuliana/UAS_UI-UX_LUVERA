import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)
import StatsCard from '../../components/admin/StatsCard'
import transactions from '../../data/transactions.json'
import products from '../../data/products.json'

// Data dummy untuk chart
const monthlyData = [
  { name: 'JAN', orders: 15000 },
  { name: 'FEB', orders: 21345 },
  { name: 'MAR', orders: 28000 },
  { name: 'APR', orders: 25000 },
  { name: 'MAY', orders: 32000 },
  { name: 'JUN', orders: 27000 },
]

const weeklyData = [
  { name: 'Mon', orders: 3200 },
  { name: 'Tue', orders: 4100 },
  { name: 'Wed', orders: 3800 },
  { name: 'Thu', orders: 5200 },
  { name: 'Fri', orders: 4800 },
  { name: 'Sat', orders: 6100 },
  { name: 'Sun', orders: 3500 },
]

const yearlyData = [
  { name: '2020', orders: 120000 },
  { name: '2021', orders: 185000 },
  { name: '2022', orders: 210000 },
  { name: '2023', orders: 280000 },
  { name: '2024', orders: 350000 },
  { name: '2025', orders: 420000 },
]

// Best sellers — ambil 4 produk pertama yang featured
const bestSellers = [
  { ...products[0], sales: '4rb' },
  { ...products[2], sales: '3.3rb' },
  { ...products[1], sales: '3rb' },
  { ...products[15], sales: '1.8rb' },
]

const Dashboard = () => {
  const [chartPeriod, setChartPeriod] = useState('monthly')

  const chartData = chartPeriod === 'weekly' ? weeklyData : chartPeriod === 'yearly' ? yearlyData : monthlyData

  // Recent orders — ambil 6 transaksi pertama
  const recentOrders = transactions.slice(0, 6)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          19 JULI 2025
        </div>
      </div>

      {/* ══════════════════════════════════════
          STATS CARDS
          ══════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Orders" value="< 10k" change="34.7%" period="/ Month" />
        <StatsCard title="New Orders" value="100" change="60.7%" period="/ Day" />
        <StatsCard title="Completed Orders" value="50" change="21.2%" period="/ Day" />
        <StatsCard title="Cancel Orders" value="3" change="50%" period="/ Day" isNegative />
      </div>

      {/* ══════════════════════════════════════
          CHART + BEST SELLERS
          ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mb-6">

        {/* Sales Graph */}
        <div className="bg-white rounded-lg p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-800">Sale Graph</h2>
            <div className="flex gap-2">
              {['weekly', 'monthly', 'yearly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md border transition-colors ${chartPeriod === period
                      ? 'bg-[#1A7A6D] text-white border-[#1A7A6D]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Label */}
          <p className="text-sm text-gray-600 mb-2">Total Orders</p>

          {/* Line Chart */}
          {/* Line Chart */}
          <div style={{ height: 260 }}>
            <Line
              data={{
                labels: chartData.map(d => d.name),
                datasets: [{
                  label: 'Total Orders',
                  data: chartData.map(d => d.orders),
                  borderColor: '#1A7A6D',
                  backgroundColor: 'rgba(26,122,109,0.1)',
                  borderWidth: 2,
                  pointRadius: 4,
                  pointBackgroundColor: '#1A7A6D',
                  tension: 0.3,
                  fill: true,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 12 }, color: '#9ca3af' } },
                  y: {
                    grid: { color: '#f0f0f0' },
                    ticks: {
                      font: { size: 12 },
                      color: '#9ca3af',
                      callback: (v) => v >= 1000 ? `${v / 1000}k` : v,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1A7A6D]" />
            <span className="text-xs text-[#1A7A6D]">Total Orders</span>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="bg-white rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-800">Best Sellers Product</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{product.sales} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RECENT ORDERS TABLE
          ══════════════════════════════════════ */}
      <div className="bg-white rounded-lg p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="bg-[#1A7A6D] text-white">
                <th className="text-left text-xs font-medium px-4 py-3 rounded-l-lg w-8">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-white" />
                </th>
                <th className="text-left text-xs font-medium px-4 py-3">Product</th>
                <th className="text-left text-xs font-medium px-4 py-3">Order ID</th>
                <th className="text-left text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Customer Name</th>
                <th className="text-left text-xs font-medium px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium px-4 py-3 rounded-r-lg">Amount</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {recentOrders.map((order) => {
                const product = products.find((p) => p.id === order.items[0]?.productId)
                return (
                  <tr key={order.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product?.image || '/images/products/face-wash.png'}
                          alt={order.items[0]?.name}
                          className="w-9 h-9 rounded-md object-cover bg-gray-100"
                        />
                        <span className="text-sm text-gray-700">{order.items[0]?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">#{order.id.replace('TRX-', '')}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{order.date}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200" />
                        <span className="text-sm text-gray-700">{order.customerName.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${order.status === 'Delivered' ? 'text-green-600' :
                          order.status === 'In Processing' ? 'text-blue-600' :
                            order.status === 'Confirmed' ? 'text-yellow-600' :
                              'text-red-600'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' :
                            order.status === 'In Processing' ? 'bg-blue-500' :
                              order.status === 'Confirmed' ? 'bg-yellow-500' :
                                'bg-red-500'
                          }`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-700 text-right font-medium">
                      Rp {order.subtotal.toLocaleString('id-ID')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 py-4">
        <p className="text-xs text-gray-400">&copy; 2025 - Luvera</p>
      </div>
    </div>
  )
}

export default Dashboard