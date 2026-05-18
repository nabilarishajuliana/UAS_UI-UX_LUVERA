import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import articles from '../../data/articles.json'

const ArsipArtikel = () => {
  const [visibleCount, setVisibleCount] = useState(4)

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
  }, [visibleCount])

  const visibleArticles = articles.slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">

        {/* Article List — Zigzag Layout */}
        <div className="space-y-16 md:space-y-20">
          {visibleArticles.map((article, index) => {
            const isEven = index % 2 === 0

            return (
              <article
                key={article.id}
                className="reveal"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  !isEven ? 'md:direction-rtl' : ''
                }`}>

                  {/* Image — kiri di ganjil, kanan di genap */}
                  <div className={`${!isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <Link to={`/blog/${article.id}`} className="block overflow-hidden rounded-sm group">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>
                  </div>

                  {/* Text */}
                  <div className={`${!isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <p className="text-[0.72rem] text-luvera-muted uppercase tracking-[0.1em] mb-2">
                      {article.date}
                    </p>

                    <Link to={`/blog/${article.id}`}>
                      <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-normal text-luvera-text leading-snug mb-4 hover:text-luvera-brown transition-colors">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-[0.85rem] text-luvera-muted leading-[1.7] mb-5">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.68rem] bg-luvera-dark text-white px-3 py-1 rounded-full tracking-wide"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-block bg-luvera-dark text-white text-[0.78rem] font-medium tracking-[0.06em] px-7 py-2.5 hover:bg-luvera-brown transition-colors duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Show More */}
        {visibleCount < articles.length && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisibleCount(visibleCount + 4)}
              className="text-[0.82rem] font-medium text-luvera-text hover:text-luvera-brown transition-colors"
            >
              Show More ↓
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted hover:text-luvera-text transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-luvera-dark text-white text-[0.82rem]">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted text-[0.82rem] hover:text-luvera-text">2</button>
          <span className="text-luvera-muted text-[0.82rem] px-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted text-[0.82rem] hover:text-luvera-text">7</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted hover:text-luvera-text transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default ArsipArtikel