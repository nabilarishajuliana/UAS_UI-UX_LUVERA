import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getArticles } from '../../utils/articleHelper'

const LandingPage = () => {
  const articles = getArticles()
  const previewArticles = articles.slice(0, 2)

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
          SECTION 1: HERO — full screen
          ══════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden flex items-end">
        <div
          className="absolute inset-0 animate-hero-zoom bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(160deg, rgba(20,30,20,0.15) 0%, rgba(0,0,0,0.5) 100%), url('/images/banners/hero.png')`,
          }}
        />
        <div className="absolute top-[140px] left-[70px] w-[65px] h-[65px] border border-white/20 rounded-full pointer-events-none hidden md:block" />
        <div className="absolute top-[200px] right-[90px] w-[95px] h-[95px] border border-white/15 rounded-full pointer-events-none hidden md:block" />

        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 items-end px-8 md:px-16 pb-16 md:pb-24">
          <h1 className="font-serif text-[clamp(5rem,12vw,10rem)] font-bold text-white leading-[0.85] tracking-tight animate-fade-up">
            Luvéra
          </h1>
          <div className="md:text-right animate-fade-up-delay mt-6 md:mt-0">
            <p className="text-[0.8rem] text-white/70 leading-[1.9] max-w-[180px] md:ml-auto mb-5">
              We craft clean, grounded skincare using nature's finest ingredients, perfected with careful formulation.
            </p>
            <Link
              to="/shop"
              className="inline-block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-white border border-white/40 px-8 py-3 hover:bg-white hover:text-luvera-dark transition-all duration-300"
            >
              Check Out Now
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 2: NATURE REFINED — min 70vh, teks besar sentral
          ══════════════════════════════════════ */}
      <section className="relative bg-luvera-cream flex flex-col items-center justify-center min-h-[70vh] py-20 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luvera-brown/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luvera-brown/20 to-transparent" />

        {/* Decorative line atas */}
        <div className="w-px h-12 bg-luvera-brown/25 mb-10 reveal" />

        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-luvera-brown mb-7 reveal">
            Nature Refined
          </p>
          <blockquote className="font-serif text-[clamp(1.5rem,3.2vw,2.3rem)] font-normal leading-[1.65] text-luvera-text reveal">
            Experience the ultimate harmony{' '}
            <em className="italic text-luvera-brown">where pure, earth-grown ingredients meet a truly</em>{' '}
            indulgent and luxurious skincare ritual.
          </blockquote>
        </div>

        {/* Decorative line bawah */}
        <div className="w-px h-12 bg-luvera-brown/25 mt-10 reveal" />
      </section>


{/* ══════════════════════════════════════
          SECTION 3: FEATURES
          ══════════════════════════════════════ */}
      <section id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {/* Kiri — teks */}
          <div className="bg-luvera-dark px-8 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col justify-center reveal z-10">
            <div className="max-w-md w-full mx-auto md:ml-0">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-normal mb-5 tracking-wide">
                Features
              </h2>
              <p className="text-white/50 text-[0.85rem] leading-relaxed mb-14 max-w-sm">
                Feel safe and cared for under the sun. Our gentle yet powerful formula keeps your skin protected and glowing from morning to night.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                <div>
                  <div className="text-white/30 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-[0.85rem] font-semibold mb-2 tracking-wide">UVA & UVB Protection</h3>
                  <p className="text-white/40 text-[0.76rem] leading-relaxed">Shield your skin from daily sun exposure with advanced UVA & UVB defense — keeping your skin safe all day.</p>
                </div>

                <div>
                  <div className="text-white/30 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                    </svg>
                  </div>
                  <h3 className="text-white text-[0.85rem] font-semibold mb-2 tracking-wide">Waterproof</h3>
                  <p className="text-white/40 text-[0.76rem] leading-relaxed">Our waterproof blend ensures long-lasting coverage that won't wash away from sweat or water.</p>
                </div>

                <div>
                  <div className="text-white/30 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-[0.85rem] font-semibold mb-2 tracking-wide">Works for 8 hours</h3>
                  <p className="text-white/40 text-[0.76rem] leading-relaxed">Protection that lasts up to 8 hours. Perfect for busy days when you need skincare that keeps up.</p>
                </div>

                <div>
                  <div className="text-white/30 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-[0.85rem] font-semibold mb-2 tracking-wide">Invisible, Lightweight</h3>
                  <p className="text-white/40 text-[0.76rem] leading-relaxed">A silky-smooth finish that melts into your skin — no white cast, no stickiness, just pure comfort.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan — gambar (Sekarang ditambahkan class 'reveal' agar transisinya bareng teks) */}
          <div className="hidden md:block md:absolute md:top-0 md:bottom-0 md:right-0 md:w-1/2 reveal">
            <img
              src="/images/banners/features.png"
              alt="Features"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 4: TESTIMONIALS — min 80vh, kartu tinggi
          ══════════════════════════════════════ */}
      <section className="bg-luvera-cream flex flex-col justify-center min-h-[80vh] py-16 md:py-24">
        <div className="w-full px-4 md:px-8">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-luvera-muted mb-3 reveal">
            Customers
          </p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] font-normal text-luvera-text mb-10 reveal">
            Don't just take it from us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                img: '/images/testimonials/testi-1.jpg',
                text: "My skin feels smoother than ever. I didn't expect results this fast, but within 2 weeks I could already see a real glow.",
                name: 'Chloe Bennett'
              },
              {
                img: '/images/testimonials/testi-3.jpg',
                text: "I've tried so many products before, but this is the one that truly calmed and softened my skin. It's now part of my daily routine.",
                name: 'Amelia Heart'
              },
              {
                img: '/images/testimonials/testi-4.jpg',
                text: "The texture is amazing. My skin looks healthier and more fresh every morning.",
                name: 'Shanon'
              },
            ].map((testi, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden h-80 md:h-96 group cursor-pointer reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <img
                  src={testi.img}
                  alt={testi.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-[0.82rem] leading-[1.7] mb-3">{testi.text}</p>
                  <p className="text-white/50 text-[0.7rem] tracking-wider">— {testi.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ══════════════════════════════════════
    MARQUEE — Brand values ticker
    ══════════════════════════════════════ */}
<div className="bg-luvera-cream py-8 border-y border-luvera-brown/15 overflow-hidden">
  <div className="flex whitespace-nowrap animate-marquee">
    {[...Array(3)].map((_, i) => (
      <span key={i} className="flex items-center gap-0 shrink-0">
        {[
          'CLEAN BEAUTY',
          'NATURE REFINED',
          'SKIN RITUAL',
          'ETHICALLY SOURCED',
          'DERMATOLOGIST TESTED',
          'CONSCIOUS LUXURY',
        ].map((text, j) => (
          <span key={j} className="flex items-center">
            <span className="font-serif italic text-luvera-brown/60 text-[0.85rem] tracking-widest px-8">
              {text}
            </span>
            <span className="text-luvera-brown/30 text-[0.6rem]">✦</span>
          </span>
        ))}
      </span>
    ))}
  </div>
</div>

      {/* ══════════════════════════════════════
          SECTION 5: BLOG PREVIEW — min 80vh, gambar besar
          ══════════════════════════════════════ */}
      <section className="bg-luvera-cream flex flex-col justify-center min-h-[80vh] py-16 md:py-24">
        <div className="w-full px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="text-[0.65rem] tracking-[0.28em] uppercase text-luvera-muted mb-3">Blog</p>
              <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] font-normal text-luvera-text">
                How to Elevate Your Experience
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-block text-[0.7rem] font-semibold tracking-[0.14em] uppercase border border-luvera-text px-6 py-2.5 hover:bg-luvera-dark hover:text-white hover:border-luvera-dark transition-all duration-300"
            >
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
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-60 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-semibold text-[1rem] text-luvera-text group-hover:text-luvera-brown transition-colors duration-300 leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-[0.67rem] text-luvera-muted uppercase tracking-[0.12em] mb-2.5">{article.date}</p>
                <p className="text-[0.83rem] text-luvera-muted leading-[1.7] line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 md:hidden text-center reveal">
            <Link
              to="/blog"
              className="inline-block text-[0.7rem] font-semibold tracking-[0.14em] uppercase border border-luvera-text px-6 py-2.5 hover:bg-luvera-dark hover:text-white hover:border-luvera-dark transition-all duration-300"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingPage