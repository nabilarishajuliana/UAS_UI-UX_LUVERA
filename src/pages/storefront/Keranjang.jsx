import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../../utils/cartHelper'

const Keranjang = () => {
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const handleRemove = (productId) => {
    const updated = removeFromCart(productId)
    setCart(updated)
  }

  const handleQuantityChange = (productId, newQty) => {
    const updated = updateQuantity(productId, newQty)
    setCart(updated)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === 'luvera10') {
      setCouponApplied(true)
    } else {
      setCouponApplied(false)
      alert('Coupon code not valid')
    }
  }

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
  }, [cart])

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-14">

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="text-center py-20 reveal">
            <p className="text-luvera-muted text-lg mb-4">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block bg-luvera-dark text-white text-[0.82rem] font-medium tracking-[0.06em] px-8 py-3 hover:bg-luvera-brown transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* ══════════════════════════════════════
                CART TABLE
                ══════════════════════════════════════ */}
            <div className="bg-white rounded-lg p-6 md:p-8 mb-5 reveal">
              {/* Header — desktop only */}
              <div className="hidden md:grid md:grid-cols-[auto_1fr_120px_100px_120px] gap-4 items-center pb-4 border-b border-luvera-cream-dark">
                <div className="w-6" />
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-luvera-text">Product</p>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-luvera-text">Price</p>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-luvera-text">Quantity</p>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-luvera-text">Subtotal</p>
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_120px_100px_120px] gap-4 items-center py-5 border-b border-luvera-cream-dark last:border-b-0"
                >
                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-luvera-muted hover:text-red-500 transition-colors text-lg"
                  >
                    ✕
                  </button>

                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-sm object-cover bg-luvera-cream-dark"
                    />
                    <div>
                      <p className="text-[0.85rem] font-medium text-luvera-text">{item.name}</p>
                      {/* Mobile: show price & subtotal inline */}
                      <p className="md:hidden text-[0.78rem] text-luvera-muted mt-0.5">
                        Rp {item.price.toLocaleString('id-ID')} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Price — desktop */}
                  <p className="hidden md:block text-[0.85rem] text-luvera-text">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>

                  {/* Quantity */}
                  <div className="col-start-2 md:col-start-auto">
                    <div className="inline-flex items-center border border-luvera-cream-dark">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-luvera-muted hover:text-luvera-text text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-[0.82rem] font-medium border-x border-luvera-cream-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-luvera-muted hover:text-luvera-text text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal — desktop */}
                  <p className="hidden md:block text-[0.85rem] font-medium text-luvera-text">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>

            {/* ══════════════════════════════════════
                COUPON
                ══════════════════════════════════════ */}
            <div className="bg-white rounded-lg p-6 md:p-8 mb-5 reveal">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-luvera-cream border-none rounded-sm px-4 py-3 text-[0.85rem] text-luvera-text placeholder:text-luvera-muted/50 outline-none focus:ring-1 focus:ring-luvera-dark"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-luvera-dark text-white text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-6 py-3 hover:bg-luvera-brown transition-colors duration-300 whitespace-nowrap"
                >
                  APPLY COUPON
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-600 text-[0.78rem] mt-2">Coupon "LUVERA10" applied! 10% discount.</p>
              )}
            </div>

            {/* ══════════════════════════════════════
                CART TOTALS
                ══════════════════════════════════════ */}
            <div className="bg-white rounded-lg p-6 md:p-8 mb-5 reveal">
              <h3 className="text-[0.88rem] font-semibold text-luvera-text mb-4">Cart Totals</h3>

              <div className="space-y-3 text-[0.85rem]">
                <div className="flex justify-between">
                  <span className="font-medium text-luvera-text">Subtotal</span>
                  <span className="text-luvera-text">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-medium">Discount (10%)</span>
                    <span>- Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-luvera-cream-dark">
                  <span className="font-semibold text-luvera-text">Total</span>
                  <span className="font-semibold text-luvera-text">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* PROCEED TO CHECKOUT */}
            {/* PROCEED TO CHECKOUT */}
            {(() => {
              const user = JSON.parse(localStorage.getItem('luvera-user'))
              if (!user) {
                return (
                  <Link
                    to="/login"
                    className="block w-full bg-luvera-dark text-white text-center text-sm font-semibold tracking-widest uppercase py-4 hover:bg-luvera-brown transition-colors duration-300 reveal"
                  >
                    LOGIN TO CHECKOUT
                  </Link>
                )
              }
              return (
                <Link
                  to="/checkout"
                  className="block w-full bg-luvera-dark text-white text-center text-sm font-semibold tracking-widest uppercase py-4 hover:bg-luvera-brown transition-colors duration-300 reveal"
                >
                  PROCEED TO CHECKOUT
                </Link>
              )
            })()}
          </>
        )}

      </div>
    </div>
  )
}

export default Keranjang