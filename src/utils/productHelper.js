import initialProducts from '../data/products.json'

const STORAGE_KEY = 'luvera-products'

// Pertama kali: copy JSON ke localStorage kalau belum ada
const initProducts = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
    return initialProducts
  }
  return JSON.parse(existing)
}

// Get semua produk
export const getProducts = () => {
  return initProducts()
}

// Get 1 produk by ID
export const getProductById = (id) => {
  const products = getProducts()
  return products.find((p) => p.id === parseInt(id))
}

// Add produk baru
export const addProduct = (product) => {
  const products = getProducts()
  const newProduct = {
    ...product,
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    createdAt: new Date().toISOString().split('T')[0],
    rating: 0,
    reviewCount: 0,
    orders: 0,
    reviews: [],
  }
  products.push(newProduct)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  return newProduct
}

// Update produk
export const updateProduct = (id, updatedData) => {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === parseInt(id))
  if (index >= 0) {
    products[index] = { ...products[index], ...updatedData }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    return products[index]
  }
  return null
}

// Delete produk
export const deleteProduct = (id) => {
  const products = getProducts().filter((p) => p.id !== parseInt(id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  return products
}

// Reset ke data awal (opsional, buat debugging)
export const resetProducts = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
  return initialProducts
}