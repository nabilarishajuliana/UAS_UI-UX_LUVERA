import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/shop/${product.id}`} className="group">
      {/* Image */}
      <div className="overflow-hidden rounded-sm bg-luvera-cream-dark aspect-square mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Info */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-[0.82rem] font-medium text-luvera-text leading-snug">
            {product.name}
          </h3>
          <p className="text-[0.72rem] text-luvera-muted mt-0.5">{product.size}</p>
        </div>
        <p className="text-[0.82rem] font-medium text-luvera-text whitespace-nowrap">
          Rp {product.price.toLocaleString('id-ID')}.00
        </p>
      </div>
    </Link>
  )
}

export default ProductCard