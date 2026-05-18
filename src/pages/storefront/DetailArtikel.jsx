import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import articles from '../../data/articles.json'

const DetailArtikel = () => {
  const { id } = useParams()
  const article = articles.find((a) => a.id === parseInt(id))

  // Related articles (exclude current)
  const relatedArticles = articles.filter((a) => a.id !== parseInt(id)).slice(0, 3)

  // Scroll reveal
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-luvera-muted">Article not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">

        {/* ══════════════════════════════════════
            ARTICLE HEADER — text left, image right
            ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
          {/* Left — Info */}
          <div>
            <p className="text-[0.72rem] text-luvera-muted uppercase tracking-[0.1em] mb-3">
              {article.date}
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
              {article.tags.map((tag) => (
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
          <div className="overflow-hidden rounded-sm">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>


        {/* ══════════════════════════════════════
            ARTICLE CONTENT
            ══════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mb-20">
          {article.content.map((block, index) => {
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

            if (block.type === 'image') {
              return (
                <div key={index} className="my-8 rounded-sm overflow-hidden reveal">
                  <img
                    src={block.src}
                    alt={block.alt || ''}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )
            }

            return null
          })}
        </div>


        {/* ══════════════════════════════════════
            ON THE BLOG — Related Articles
            ══════════════════════════════════════ */}
        <div className="reveal">
          <div className="text-center mb-10">
            <h3 className="text-[0.88rem] font-bold uppercase tracking-[0.12em] text-luvera-text">
              ON THE BLOG
            </h3>
            <Link to="/blog" className="text-[0.78rem] text-luvera-brown mt-1 inline-block hover:underline">
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related, i) => (
              <div
                key={related.id}
                className="reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <Link to={`/blog/${related.id}`} className="block overflow-hidden rounded-sm mb-3 group">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                {/* Info */}
                <Link to={`/blog/${related.id}`}>
                  <h4 className="text-[0.88rem] font-semibold text-luvera-text leading-snug line-clamp-2 hover:text-luvera-brown transition-colors mb-2">
                    {related.title}
                  </h4>
                </Link>
                <p className="text-[0.78rem] text-luvera-muted leading-relaxed line-clamp-3 mb-3">
                  {related.excerpt}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${related.id}`}
                  className="inline-block w-full text-center border border-luvera-dark text-luvera-dark text-[0.76rem] font-medium tracking-[0.04em] py-2 hover:bg-luvera-dark hover:text-white transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailArtikel