import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getArticles } from '../../utils/articleHelper'

const AdminPreviewArtikel = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Ambil data dari Local Storage Helper
  const allArticles = getArticles()
  const article = allArticles.find((a) => String(a.id) === String(id))

  // Scroll reveal animation effect (biar previewnya akurat mirip storefront)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 text-gray-500">
        <p>Article draft not found.</p>
        <button onClick={() => navigate('/admin/blog')} className="text-sm text-[#1A7A6D] underline">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luvera-cream pb-12">
      {/* ══════════════════════════════════════
          PREVIEW BANNER (Penanda Mode Draft)
          ══════════════════════════════════════ */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          <p className="text-xs font-medium text-amber-800 tracking-wide uppercase">
            Mode Preview: Tampilan Draft Artikel di Storefront
          </p>
        </div>
        <button 
          onClick={() => navigate('/admin/blog')}
          className="bg-gray-800 text-white text-xs px-4 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          Kembali ke Admin
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* ══════════════════════════════════════
            ARTICLE HEADER — text left, image right
            ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
          {/* Left — Info */}
          <div>
            <p className="text-[0.72rem] text-luvera-muted uppercase tracking-[0.1em] mb-3">
              {article.date || 'Draft Date'}
            </p>
            <h1 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-normal text-luvera-text leading-snug mb-5">
              {article.title}
            </h1>
            <p className="text-[0.85rem] text-luvera-muted leading-[1.7] mb-5">
              {article.excerpt}
            </p>

            {/* Tags */}
            <p className="text-[0.78rem] font-semibold text-luvera-text uppercase tracking-[0.1em] mb-3">
              TAGS
            </p>
            <div className="flex flex-wrap gap-2">
              {article.tags && article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.68rem] bg-luvera-dark text-white px-3 py-1 rounded-full tracking-wide"
                >
                  # {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="overflow-hidden rounded-sm border border-gray-100 shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover bg-white"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════
            ARTICLE CONTENT
            ══════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mb-20">
          {article.content && article.content.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  className="text-[1rem] font-bold uppercase tracking-[0.04em] text-luvera-text mt-12 mb-4 reveal"
                >
                  {block.text}
                </h2>
              )
            }

            if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className="text-[0.88rem] text-luvera-muted leading-[1.8] mb-6 reveal"
                >
                  {block.text}
                </p>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminPreviewArtikel