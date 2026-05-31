import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, addProduct, updateProduct } from '../../utils/productHelper'

const AdminAddProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = id && id !== 'add'

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    category: 'Face Care',
    size: '',
    image: '/images/products/face-wash.png',
    featured: false,
  })
  const [saved, setSaved] = useState(false)

  // Load product data kalau edit mode
  useEffect(() => {
    if (isEdit) {
      const product = getProductById(id)
      if (product) {
        setForm({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          discountPrice: product.discountPrice || '',
          stock: product.stock ?? '',
          category: product.category || 'Face Care',
          size: product.size || '',
          image: product.image || '/images/products/face-wash.png',
          featured: product.featured || false,
        })
      }
    }
  }, [id, isEdit])

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert('Product name and price are required')
      return
    }

    const productData = {
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, '-'),
      description: form.description,
      price: parseInt(form.price) || 0,
      discountPrice: parseInt(form.discountPrice) || 0,
      stock: parseInt(form.stock) || 0,
      category: form.category,
      size: form.size,
      image: form.image,
      images: [form.image],
      featured: form.featured,
    }

    if (isEdit) {
      updateProduct(id, productData)
    } else {
      addProduct(productData)
    }

    setSaved(true)
    setTimeout(() => navigate('/admin/products'), 1500)
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
          <h2 className="text-lg font-semibold text-gray-800">{isEdit ? 'Product Updated!' : 'Product Added!'}</h2>
          <p className="text-sm text-gray-500 mt-1">Redirecting...</p>
        </div>
      </div>
    )
  }

  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#1A7A6D]"

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#1A7A6D]">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button
          onClick={handleSubmit}
          className="bg-[#1A7A6D] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#15665b] transition-colors"
        >
          {isEdit ? 'Save Changes' : 'Publish Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Basic Details */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Luvera Essential Face Wash"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                <textarea
                  rows={5}
                  placeholder="Write product description here..."
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <input
                  type="text"
                  placeholder="e.g. 100ml"
                  value={form.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Pricing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Price (Rp) *</label>
                <input
                  type="number"
                  placeholder="189000"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discounted Price (Rp) <span className="text-gray-400">(Optional, isi 0 kalau tidak ada diskon)</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.discountPrice}
                  onChange={(e) => handleChange('discountPrice', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Inventory</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                placeholder="100"
                value={form.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">Isi 0 untuk out of stock</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Image */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Product Image</h2>
            {form.image && (
              <img src={form.image} alt="Preview" className="w-full h-48 object-cover rounded-lg bg-gray-100 mb-3" />
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
              <input
                type="text"
                placeholder="/images/products/nama-file.png"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">Path gambar di folder public/images/products/</p>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Categories</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={inputClass}
                >
                  <option value="Face Care">Face Care</option>
                  <option value="Body Care">Body Care</option>
                  <option value="Eye & Lip Care">Eye & Lip Care</option>
                  <option value="Hair & Scalp Care">Hair & Scalp Care</option>
                  <option value="Makeup">Makeup</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-4 h-4 accent-[#1A7A6D] rounded"
                  />
                  <span className="text-sm text-gray-700">Highlight this product in featured section</span>
                </label>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/admin/products')}
            className="w-full border border-gray-300 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to All Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAddProduct