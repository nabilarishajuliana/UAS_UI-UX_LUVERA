import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import articles from '../../data/articles.json'

const LandingPage = () => {
  const previewArticles = articles.slice(0, 2)

  // Scroll reveal — sama kayak kode lama kamu pakai IntersectionObserver
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
  }, [])

  return (
    <div>

      {/* ══════════════════════════════════════
          SECTION 1: HERO — full viewport, zoom animation
          ══════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-end">
        {/* BG Image with zoom */}
        <div
          className="absolute inset-0 animate-hero-zoom bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(160deg, rgba(27,38,28,0.25) 0%, rgba(0,0,0,0.55) 100%), url('/images/banners/hero.png')`,
          }}
        />

        {/* Geometric shapes — decorative */}
        <div className="absolute top-[120px] left-[60px] w-[70px] h-[70px] border border-white/30 rounded-full pointer-events-none hidden md:block" />
        <div className="absolute top-[180px] right-[80px] w-[110px] h-[110px] border border-white/20 rounded-full pointer-events-none hidden md:block" />
        <div className="absolute bottom-[200px] left-[40px] w-[50px] h-[50px] border border-white/25 pointer-events-none hidden md:block" />

        {/* Content */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 items-end gap-8 px-6 md:px-12 pb-12 md:pb-16">
          {/* Brand */}
          <h1 className="font-serif text-[clamp(5rem,12vw,10rem)] font-bold text-luvera-white leading-[0.9] tracking-tight animate-fade-up">
            Luvéra
          </h1>

          {/* Right text */}
          <div className="md:text-right animate-fade-up-delay">
            <p className="text-[0.85rem] text-white/80 leading-[1.7] max-w-[220px] md:ml-auto mb-4">
              We craft clean, grounded skincare using nature's finest ingredients, perfected with careful formulation.
            </p>
            <Link
              to="/shop"
              className="inline-block text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-luvera-white border border-white/60 px-7 py-3 hover:bg-white hover:text-luvera-dark hover:border-white transition-all duration-300"
            >
              Check Out Now
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 2: NATURE REFINED — quote
          ══════════════════════════════════════ */}
      <section className="relative bg-luvera-cream py-24 md:py-32">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luvera-brown to-transparent" />

        <div className="max-w-[820px] mx-auto px-6 text-center">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-luvera-brown mb-8 reveal">
            Nature Refined
          </p>
          <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.6rem)] font-normal leading-[1.45] text-luvera-text reveal">
            Experience the ultimate harmony{' '}
            <em className="italic text-luvera-brown">where pure, earth-grown ingredients meet a truly</em>{' '}
            indulgent and luxurious skincare ritual.
          </blockquote>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 3: FEATURES — dark bg, split layout
          ══════════════════════════════════════ */}
      <section id="about">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Kiri — teks */}
          <div className="bg-luvera-dark h-screen px-6 md:px-14 py-16 md:py-20 reveal">
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal mb-3">
              Features
            </h2>
            <p className="text-white/50 text-[0.82rem] leading-relaxed mb-12 max-w-sm">
              Feel safe and cared for under the sun. Our gentle yet powerful formula keeps your skin protected and glowing from morning to night.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <div>
                <div className="text-white/30 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-[0.85rem] font-semibold mb-2">UVA & UVB Protection</h3>
                <p className="text-white/40 text-xs leading-relaxed">Shield your skin from daily sun exposure with advanced UVA & UVB defense — keeping your skin safe from harmful rays all day long.</p>
              </div>

              <div>
                <div className="text-white/30 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                  </svg>
                </div>
                <h3 className="text-white text-[0.85rem] font-semibold mb-2">Waterproof</h3>
                <p className="text-white/40 text-xs leading-relaxed">Stay protected no matter your activities. Our waterproof blend ensures long-lasting coverage that won't wash away from sweat.</p>
              </div>

              <div>
                <div className="text-white/30 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-white text-[0.85rem] font-semibold mb-2">Works for 8 hours</h3>
                <p className="text-white/40 text-xs leading-relaxed">Enjoy all-day comfort with protection that lasts up to 8 hours. Perfect for busy days when you need skincare that keeps up with you.</p>
              </div>

              <div>
                <div className="text-white/30 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <h3 className="text-white text-[0.85rem] font-semibold mb-2">Invisible, Lightweight Layer</h3>
                <p className="text-white/40 text-xs leading-relaxed">Experience a silky-smooth finish with our invisible formula that melts seamlessly into your skin — no white cast, no stickiness.</p>
              </div>
            </div>
          </div>

          {/* Kanan — gambar */}
          <div className="hidden md:block reveal">
            <img src="/images/banners/features.png" alt="Features" className="w-full h-screen object-cover" />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 4: TESTIMONIALS
          ══════════════════════════════════════ */}
      <section className="bg-luvera-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-luvera-muted mb-2 reveal">
            Customers
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-normal text-luvera-text mb-10 reveal">
            Don't just take it from us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { img: '/images/testimonials/testi-1.jpg', text: "My skin feels smoother than ever. I didn't expect results this fast, but within 2 weeks I could already see a real glow.", name: 'Chloe Bennett' },
              { img: '/images/testimonials/testi-2.jpg', text: "I've tried so many products before, but this is the one that truly calmed and softened my skin. It's now part of my daily routine.", name: 'Amelia Heart' },
              { img: '/images/testimonials/testi-3.jpg', text: "The texture is amazing. My skin looks healthier and more fresh every morning.", name: 'Shanon' },
            ].map((testi, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden h-72 md:h-80 group cursor-pointer reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <img src={testi.img} alt={testi.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-[0.85rem] leading-relaxed mb-3">{testi.text}</p>
                  <p className="text-white/50 text-xs">— {testi.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 5: BLOG PREVIEW
          ══════════════════════════════════════ */}
      <section className="bg-luvera-cream pt-4 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="text-[0.72rem] tracking-[0.18em] uppercase text-luvera-muted mb-2">Blog</p>
              <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-normal text-luvera-text">
                How to Elevate Your Experience
              </h2>
            </div>
            <Link to="/blog" className="hidden md:inline-block text-[0.76rem] font-semibold tracking-[0.1em] uppercase border border-luvera-text px-6 py-2.5 hover:bg-luvera-dark hover:text-white hover:border-luvera-dark transition-all duration-300">
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previewArticles.map((article, i) => (
              <Link
                to={`/blog/${article.id}`}
                key={article.id}
                className="group reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img src={article.image} alt={article.title} className="w-full h-52 md:h-60 object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-semibold text-base text-luvera-text group-hover:text-luvera-brown transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-xs text-luvera-muted mt-1 uppercase tracking-[0.1em]">{article.date}</p>
                <p className="text-[0.85rem] text-luvera-muted mt-2 leading-[1.7] line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center reveal">
            <Link to="/blog" className="inline-block text-[0.76rem] font-semibold tracking-[0.1em] uppercase border border-luvera-text px-6 py-2.5 hover:bg-luvera-dark hover:text-white hover:border-luvera-dark transition-all duration-300">
              VIEW ALL
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingPage