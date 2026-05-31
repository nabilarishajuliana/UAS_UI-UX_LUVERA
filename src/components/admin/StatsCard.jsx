const StatsCard = ({ title, value, change, period, isNegative }) => {
  return (
    <div className="bg-white rounded-lg p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>

      {/* Value & Change */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          {/* Teal Icon */}
          <div className="w-9 h-9 rounded-lg bg-[#1A7A6D] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800">{value}</span>
        </div>

        <div className="text-right">
          <span className={`text-xs font-semibold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
            {isNegative ? '↓' : '↑'} {change}
          </span>
          <p className="text-[0.68rem] text-gray-400 mt-0.5">{period}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCard