import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getArticles, deleteArticle } from '../../utils/articleHelper'

const KelolaArtikel = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState(getArticles())
  const [search, setSearch] = useState('')

  let filtered = articles
  if (search) filtered = filtered.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      const updated = deleteArticle(id)
      setArticles(updated)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">All Blog</h1>
        <Link
          to="/admin/blog/add"
          className="flex items-center gap-2 bg-[#1A7A6D] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#15665b] transition-colors"
        >
          <span>+</span> ADD NEW ARTICLE
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {/* Search */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm text-gray-500">Total: {filtered.length} articles</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search article"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#1A7A6D]"
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
                <th className="text-left text-xs font-medium px-4 py-3 w-12">No.</th>
                <th className="text-left text-xs font-medium px-4 py-3">Article</th>
                <th className="text-left text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium px-4 py-3">Tags</th>
                <th className="text-center text-xs font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                    No articles found
                  </td>
                </tr>
              ) : (
                filtered.map((article, i) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-[#1A7A6D]" />
                        <span className="text-sm text-gray-600">{i + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-9 h-9 rounded-md object-cover bg-gray-100"
                        />
                        <span className="text-sm text-gray-700 max-w-xs truncate">{article.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{article.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-[10px] text-gray-400">+{article.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/blog/${article.id}`)}
                          className="text-[#1A7A6D] hover:text-[#15665b]"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
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
      </div>
    </div>
  )
}

export default KelolaArtikel