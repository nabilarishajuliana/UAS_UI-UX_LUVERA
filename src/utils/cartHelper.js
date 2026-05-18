// Ambil cart dari localStorage
export const getCart = () => {
  const cart = localStorage.getItem('luvera-cart')
  return cart ? JSON.parse(cart) : []
}

// Simpan cart ke localStorage
export const saveCart = (cart) => {
  localStorage.setItem('luvera-cart', JSON.stringify(cart))
}

// Tambah item ke cart
export const addToCart = (product, quantity = 1) => {
  const cart = getCart()
  const existingIndex = cart.findIndex((item) => item.id === product.id)

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      quantity: quantity,
    })
  }

  saveCart(cart)
  return cart
}

// Hapus item dari cart
export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId)
  saveCart(cart)
  return cart
}

// Update quantity
export const updateQuantity = (productId, quantity) => {
  const cart = getCart()
  const index = cart.findIndex((item) => item.id === productId)
  if (index >= 0) {
    cart[index].quantity = Math.max(1, quantity)
    saveCart(cart)
  }
  return cart
}

// Hitung total items di cart
export const getCartCount = () => {
  return getCart().reduce((total, item) => total + item.quantity, 0)
}

// Hitung total harga
export const getCartTotal = () => {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}