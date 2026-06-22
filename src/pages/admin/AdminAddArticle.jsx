import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getArticleById, addArticle, updateArticle } from '../../utils/articleHelper'

const AdminAddArticle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const isEdit = id && id !== 'add'

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    image: '', // Awalnya kosong, diisi string base64 setelah upload file
    tags: '',
    contentText: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const article = getArticleById(id)
      if (article) {
        setForm({
          title: article.title || '',
          excerpt: article.excerpt || '',
          image: article.image || '',
          tags: article.tags ? article.tags.join(', ') : '',
          contentText: article.content
            ? article.content.map((b) => (b.type === 'heading' ? `## ${b.text}` : b.text)).join('\n\n')
            : '',
        })
      }
    }
  }, [id, isEdit])

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  // Fungsi handle upload file gambar artikel & konversi ke Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validasi ukuran (disarankan di bawah 2MB karena keterbatasan Local Storage)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size is too large! Please upload an image under 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      handleChange('image', reader.result) // Menyimpan string base64 data:image/...
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!form.title) {
      alert('Article title is required')
      return
    }

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const contentBlocks = form.contentText
      .split('\n\n')
      .filter((block) => block.trim().length > 0)
      .map((block) => {
        const trimmed = block.trim()
        if (trimmed.startsWith('## ')) {
          return { type: 'heading', text: trimmed.replace('## ', '') }
        }
        return { type: 'paragraph', text: trimmed }
      })

    const articleData = {
      title: form.title,
      slug: form.title.toLowerCase().replace(/\s+/g, '-'),
      excerpt: form.excerpt,
      image: form.image || '/images/articles/article-1.jpg', // Fallback default image jika tidak ada upload
      tags: tagsArray,
      content: contentBlocks,
    }

    if (isEdit) {
      updateArticle(id, articleData)
    } else {
      addArticle(articleData)
    }

    setSaved(true)
    setTimeout(() => navigate('/admin/blog'), 1500)
  }

  if (saved) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{isEdit ? 'Article Updated!' : 'Article Published!'}</h2>
          <p className="text-sm text-gray-500 mt-1">Redirecting...</p>
        </div>
      </div>
    )
  }

  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#1A7A6D]"

  return (
    <div>
      {/* Back Path */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/admin" className="hover:text-[#1A7A6D] transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/admin/blog" className="hover:text-[#1A7A6D] transition-colors">All Article</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{isEdit ? 'Edit Article' : 'Add New Article'}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#1A7A6D]">
          {isEdit ? 'Edit Article' : 'Add New Article'}
        </h1>
        <button
          onClick={handleSubmit}
          className="bg-[#1A7A6D] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#15665b] transition-colors"
        >
          {isEdit ? 'Save Changes' : 'Publish Article'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Left */}
        <div className="space-y-5">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Article Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Glow Smarter: 5 Daily Habits for Radiant Skin"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt / Summary</label>
                <textarea
                  rows={3}
                  placeholder="Short description of the article..."
                  value={form.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <p className="text-xs text-gray-400 mb-2">
                  Tulis heading dengan awalan "## " (double hash + spasi). Pisahkan paragraf dengan baris kosong.
                </p>
                <textarea
                  rows={14}
                  placeholder={`## START WITH THE RIGHT KIND OF HYDRATION\n\nTrue hydration begins with choosing the right ingredients. Drinking enough water is important...\n\n## LOCK THE MOISTURE IN\n\nOnce your skin is hydrated, the next step is to lock that moisture in...`}
                  value={form.contentText}
                  onChange={(e) => handleChange('contentText', e.target.value)}
                  className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="Tips, AntiAging, Ingredients, Organic (pisahkan dengan koma)"
                  value={form.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  className={inputClass}
                />
                <p className="text-xs text-gray-400 mt-1">Pisahkan setiap tag dengan koma</p>

                {/* Tags Preview */}
                {form.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tags.split(',').map((tag, i) => {
                      const trimmed = tag.trim()
                      if (!trimmed) return null
                      return (
                        <span key={i} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          # {trimmed}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">
          {/* Featured Image Area */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Featured Image</h2>
            
            {/* Hidden native input file */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {form.image ? (
              <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-48 object-cover bg-gray-50"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('image', '')}
                    className="bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Click uploader frame */
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 text-center hover:border-[#1A7A6D] hover:bg-gray-50/50 transition-all group"
              >
                <svg className="w-8 h-8 text-gray-400 group-hover:text-[#1A7A6D] mb-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-xs font-medium text-gray-600 group-hover:text-[#1A7A6D] transition-colors">Click to upload article image</span>
                <span className="text-[10px] text-gray-400 mt-1">Supports JPG, PNG up to 2MB</span>
              </button>
            )}
          </div>

          {/* Content Preview Info */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Preview Info</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Headings</span>
                <span className="font-medium text-gray-800">
                  {form.contentText.split('\n').filter((l) => l.startsWith('## ')).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Paragraphs</span>
                <span className="font-medium text-gray-800">
                  {form.contentText.split('\n\n').filter((b) => b.trim() && !b.trim().startsWith('## ')).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tags</span>
                <span className="font-medium text-gray-800">
                  {form.tags.split(',').filter((t) => t.trim()).length}
                </span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="w-full border border-gray-300 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to All Article
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAddArticle