import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getProducts } from '../../utils/productHelper'
import products from '../../data/products.json'
import ProductCard from "../../components/storefront/ProductCard";

const categories = [
  "All",
  "Face Care",
  "Body Care",
  "Eye & Lip Care",
  "Hair & Scalp Care",
  "Makeup",
];
const ITEMS_PER_PAGE = 8;

// const products = getProducts()

const KatalogProduk = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSort, setShowSort] = useState(false);

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
  }, [activeCategory, currentPage]);

  // Filter by category
  let filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Sort
  if (sortBy === "price-low")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "name")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "rating")
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page saat ganti category/sort
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-luvera-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.72rem] text-luvera-muted mb-6 uppercase tracking-[0.1em]">
          <Link to="/" className="hover:text-luvera-brown transition-colors">
            Homepage
          </Link>
          <span>→</span>
          <span className="text-luvera-text font-medium">Shop</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-normal text-luvera-text leading-tight">
            Pure Beauty and Efficacy
          </h1>
          <p className="text-[0.82rem] text-luvera-muted leading-relaxed md:max-w-xs md:text-right">
            Explore a handpicked edit of essentials for face, body, and hair —
            guided by quality, not fleeting trends
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-0 border-b border-luvera-cream-dark mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-3 text-[0.82rem] font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-luvera-dark text-white"
                  : "text-luvera-text hover:bg-luvera-cream-dark"
              }`}
            >
              {cat === "All" ? "All Products" : cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center gap-2 text-[0.82rem] text-luvera-text hover:text-luvera-brown transition-colors">
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
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Filters
          </button>

          {/* Sort Dropdown */}
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-[0.82rem] text-luvera-text hover:text-luvera-brown transition-colors"
            >
              Sort by
              <svg
                className={`w-4 h-4 transition-transform ${showSort ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {showSort && (
              <>
                {/* Backdrop — klik di luar nutup dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSort(false)}
                />

                <div className="absolute right-0 top-10 bg-white border border-luvera-cream-dark rounded-lg shadow-lg py-2 min-w-[180px] z-20">
                  {[
                    { value: "default", label: "Default" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "name", label: "Name: A to Z" },
                    { value: "rating", label: "Best Rating" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSort(false);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-[0.82rem] hover:bg-luvera-cream transition-colors ${
                        sortBy === option.value
                          ? "text-luvera-dark font-semibold bg-luvera-cream/50"
                          : "text-luvera-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {paginated.map((product, i) => (
            <div
              key={product.id}
              className="reveal"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {paginated.length === 0 && (
          <div className="text-center py-20">
            <p className="text-luvera-muted">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted hover:text-luvera-text disabled:opacity-30 transition-colors"
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-[0.82rem] transition-all ${
                  currentPage === page
                    ? "bg-luvera-dark text-white"
                    : "text-luvera-muted hover:text-luvera-text"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-full text-luvera-muted hover:text-luvera-text disabled:opacity-30 transition-colors"
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
        )}
      </div>
    </div>
  );
};

export default KatalogProduk;
