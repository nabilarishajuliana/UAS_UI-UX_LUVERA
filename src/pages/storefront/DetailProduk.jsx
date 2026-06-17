import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { getProducts } from '../../utils/productHelper'
import products from '../../data/products.json'
import ProductCard from "../../components/storefront/ProductCard";
import StarRating from "../../components/storefront/StarRating";
import { addToCart } from "../../utils/cartHelper";

const DetailProduk = () => {
  // const products = getProducts()
  const { id } = useParams();
const product = products.find((p) => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-luvera-muted">Product not found.</p>
      </div>
    );
  }

  // Produk lain untuk "You May Also Like" (exclude current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Gambar gallery — pakai images array kalau ada, kalau cuma 1 duplikat aja
  const gallery =
    product.images && product.images.length > 1
      ? product.images
      : [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.72rem] text-luvera-muted mb-8 uppercase tracking-[0.1em] flex-wrap">
          <Link to="/" className="hover:text-luvera-brown transition-colors">
            Homepage
          </Link>
          <span>→</span>
          <Link
            to="/shop"
            className="hover:text-luvera-brown transition-colors"
          >
            Shop
          </Link>
          <span>→</span>
          <span className="text-luvera-text font-medium">{product.name}</span>
        </div>

        {/* ══════════════════════════════════════
            PRODUCT INFO — image + details
            ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-20">
          {/* Left — Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative bg-luvera-cream-dark rounded-sm overflow-hidden aspect-square mb-4">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Prev/Next */}
              <button
                onClick={() => setActiveImage(Math.max(0, activeImage - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setActiveImage(Math.min(gallery.length - 1, activeImage + 1))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-luvera-dark"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Details */}
          <div>
            <h1 className="font-serif text-[clamp(1.6rem,4vw,2.2rem)] font-normal text-luvera-text mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-[0.78rem] text-luvera-muted">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-semibold text-luvera-text mb-5">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            {/* Description */}
            <p className="text-[0.85rem] text-luvera-muted leading-[1.7] mb-5">
              {product.description}
            </p>

            {/* Size */}
            <p className="text-[0.82rem] text-luvera-text mb-6">
              Size: <span className="font-medium">{product.size}</span>
            </p>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex items-center gap-3 mb-4">
              {/* Quantity */}
              <div className="flex items-center border border-luvera-cream-dark">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-11 flex items-center justify-center text-luvera-muted hover:text-luvera-text transition-colors"
                >
                  −
                </button>
                <span className="w-10 h-11 flex items-center justify-center text-[0.85rem] font-medium border-x border-luvera-cream-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-11 flex items-center justify-center text-luvera-muted hover:text-luvera-text transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 text-[0.82rem] font-semibold tracking-[0.06em] uppercase transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-luvera-dark text-white hover:bg-luvera-brown"
                }`}
              >
                {addedToCart ? "✓ Added!" : "Add To Cart"}
              </button>

              {/* Wishlist */}
              {/* Wishlist */}
              <button
                onClick={() => setLiked(!liked)}
                className="w-11 h-11 flex items-center justify-center border border-luvera-cream-dark hover:border-red-400 transition-all duration-300"
              >
                {liked ? (
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-luvera-muted hover:text-red-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            REVIEWS SECTION
            ══════════════════════════════════════ */}
        <div className="mb-20 reveal">
          <div className="text-center mb-8">
            <h2 className="text-[0.88rem] font-bold uppercase tracking-[0.12em] text-luvera-text">
              READ THE REVIEWS
            </h2>
            <p className="text-[0.78rem] text-luvera-muted mt-1">See All</p>
          </div>

          {/* Stars summary + Write Review */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-[0.82rem] text-luvera-muted">
                {product.reviewCount} reviews
              </span>
            </div>
            <button className="border border-luvera-text px-6 py-2 text-[0.78rem] font-medium tracking-[0.06em] hover:bg-luvera-dark hover:text-white hover:border-luvera-dark transition-all duration-300">
              Write a Review
            </button>
          </div>

          {/* Review Cards */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="max-w-3xl mx-auto divide-y divide-luvera-cream-dark">
              {product.reviews.map((review) => (
                <div key={review.id} className="py-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-luvera-cream-dark overflow-hidden">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[0.82rem] font-medium text-luvera-text">
                          {review.user}
                        </span>
                        {review.verified && (
                          <span className="text-[0.72rem] text-luvera-brown ml-2">
                            Verified Reviewer
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[0.75rem] text-luvera-muted">
                      {review.date}
                    </span>
                  </div>

                  {/* Rating */}
                  <StarRating rating={review.rating} size="xs" />

                  {/* Content */}
                  <h4 className="font-semibold text-[0.82rem] text-luvera-text mt-2 uppercase">
                    {review.title}
                  </h4>
                  <p className="text-[0.85rem] text-luvera-muted mt-2 leading-[1.7]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-luvera-muted text-[0.85rem]">
              No reviews yet for this product.
            </p>
          )}
        </div>

        {/* ══════════════════════════════════════
            YOU MAY ALSO LIKE
            ══════════════════════════════════════ */}
        <div className="reveal">
          <div className="text-center mb-10">
            <h2 className="text-[0.88rem] font-bold uppercase tracking-[0.12em] text-luvera-text">
              ✦ YOU MAY ALSO LIKE ✦
            </h2>
            <Link
              to="/shop"
              className="text-[0.78rem] text-luvera-brown mt-1 inline-block hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p, i) => (
              <div
                key={p.id}
                className="reveal"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;
