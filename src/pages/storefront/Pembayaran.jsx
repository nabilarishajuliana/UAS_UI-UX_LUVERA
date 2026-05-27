import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart, saveCart } from '../../utils/cartHelper'

const Pembayaran = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    setCart(getCart())
    setLoading(false)
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  const handleCheckout = () => {
    setOrderPlaced(true)
    saveCart([])
    setTimeout(() => navigate('/orders'), 2000)
  }

  if (loading) return <div className="min-h-screen bg-luvera-cream" />

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-luvera-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-luvera-text mb-2">Order Placed!</h2>
          <p className="text-luvera-muted text-sm">Redirecting to your orders...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-luvera-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-luvera-muted text-lg mb-4">Your cart is empty</p>
          <Link to="/shop" className="inline-block bg-luvera-dark text-white text-sm font-medium px-8 py-3 hover:bg-luvera-brown transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT — Forms (2 cols wide) */}
          <div className="md:col-span-2 space-y-5">

            {/* Billing Details */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-sm font-semibold text-luvera-text mb-6">Billing Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-luvera-text mb-1.5">First Name*</label>
                    <input type="text" placeholder="First Name" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-luvera-text mb-1.5">Last Name*</label>
                    <input type="text" placeholder="Last Name" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-luvera-text mb-1.5">Country / Region*</label>
                  <input type="text" placeholder="Country" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-luvera-text mb-1.5">City*</label>
                  <input type="text" placeholder="City" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-luvera-text mb-1.5">Street Address*</label>
                  <input type="text" placeholder="Street Address" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-luvera-text mb-1.5">Phone*</label>
                  <input type="text" placeholder="08XXXXXXXXX" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-luvera-text mb-1.5">Email Address*</label>
                  <input type="email" placeholder="youremail@gmail.com" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <label className="block text-xs font-medium text-luvera-text mb-1.5">Order Notes (optional)</label>
              <input type="text" placeholder="Notes about your order, e.g. special notes for delivery" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-sm font-semibold text-luvera-text mb-5">Payment</h2>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-luvera-dark" />
                  <span className="text-sm text-luvera-text">Credit Card</span>
                  <div className="flex gap-1.5 ml-auto">
                    <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-sm font-bold">MC</span>
                    <span className="text-xs bg-blue-700 text-white px-1.5 py-0.5 rounded-sm font-bold">VISA</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" value="gpay" checked={paymentMethod === 'gpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-luvera-dark" />
                  <span className="text-sm text-luvera-text"><span className="text-blue-500">G</span> Pay</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-luvera-dark" />
                  <span className="text-sm"><span className="text-blue-800 font-bold">Pay</span><span className="text-blue-500 font-bold">Pal</span></span>
                </label>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4 pt-4 border-t border-luvera-cream-dark">
                  <input type="text" placeholder="Card Number" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                  <input type="text" placeholder="Card Name" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration Date (MM/YY)" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                    <input type="text" placeholder="Security Code" className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-text placeholder-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="space-y-5">

            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-sm font-semibold text-luvera-text mb-5">Your Order</h2>

              <div className="flex justify-between pb-3 border-b border-luvera-cream-dark">
                <span className="text-xs font-semibold text-luvera-text">Product</span>
                <span className="text-xs font-semibold text-luvera-text">Subtotal</span>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-3 border-b border-luvera-cream-dark">
                  <span className="text-sm text-luvera-muted pr-4">{item.name} <span className="text-luvera-text font-medium">x{item.quantity}</span></span>
                  <span className="text-sm text-luvera-muted whitespace-nowrap">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}

              <div className="pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-luvera-text">Subtotal</span>
                  <span className="text-luvera-muted">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-luvera-text">Tax (10%)</span>
                  <span className="font-semibold text-luvera-brown">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-luvera-text">Discount</span>
                  <span className="text-luvera-muted">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-luvera-text">Shipping Rate</span>
                  <span className="text-luvera-muted">0</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-luvera-cream-dark">
                  <span className="font-bold text-luvera-text">Total</span>
                  <span className="font-bold text-luvera-text">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <select className="w-full bg-white border border-luvera-cream-dark rounded-sm px-4 py-3 text-sm text-luvera-muted outline-none focus:ring-1 focus:ring-luvera-dark cursor-pointer">
              <option>Shipping method</option>
              <option>Regular (3-5 days)</option>
              <option>Express (1-2 days)</option>
              <option>Same Day Delivery</option>
            </select>

            <button onClick={handleCheckout} className="w-full bg-luvera-dark text-white text-center text-sm font-semibold tracking-widest uppercase py-4 hover:bg-luvera-brown transition-colors duration-300">
              CHECKOUT
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Pembayaran