import { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { products as PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";

const ITEMS_PER_PAGE = 15;

export default function KidsListing({ cart, wishlist, onAddToCart, onToggleWishlist }) {
    const [searchParams] = useSearchParams();

    const [maxPrice, setMaxPrice] = useState(50000);
    const [categories, setCategories] = useState([]);
    const [color, setColor] = useState(null);
    const [occasion, setOccasion] = useState([]);
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    // Initialize filters from URL query params
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            setCategories([categoryParam]);
            setPage(1);
        }
    }, [searchParams]);

    const toggle = (arr, val) =>
        arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val];

    const clearAll = () => {
        setMaxPrice(50000);
        setCategories([]);
        setColor(null);
        setOccasion([]);
        setPage(1);
    };

    /* ================= ONLY KIDS PRODUCTS ================= */
    // Filter for products with specific Kids categories or general 'Kids' category
    const kidsProducts = PRODUCTS.filter((p) => p.category === "Kids" || p.category === "Pattu Pavadai" || p.category === "Kids Silk");

    /* ================= FILTER ================= */
    const filtered = kidsProducts.filter((p) => {
        if (p.price > maxPrice) return false;
        if (categories.length && !categories.includes(p.category)) return false;
        // FIXED: Use includes for partial match
        if (color && !p.color?.toLowerCase().includes(color.toLowerCase())) return false;
        if (occasion.length && !occasion.includes(p.occasion)) return false;
        return true;
    });

    /* ================= PAGINATION ================= */
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <div className="sl-page">
            <style>{`
        .sl-page {
          background-color: var(--background);
          color: var(--foreground);
          padding-bottom: 80px;
        }

        .sl-header {
          background: #fff0f5; /* Lighter pink for kids */
          padding: 4rem 1rem;
          text-align: center;
          margin-bottom: 3rem;
        }
        .sl-header h2 {
          font-family: var(--font-secondary);
          font-size: 3rem;
          font-weight: 700;
          color: #db2777; /* Pink-600 */
          margin-bottom: 1rem;
        }
        .sl-header p {
          font-size: 1.1rem;
          color: var(--muted-foreground);
          max-width: 600px;
          margin: 0 auto;
        }

        .sl-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          position: relative;
          align-items: start;
        }

        /* FILTERS */
        .sl-filter {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          height: fit-content;
          position: sticky;
          top: 100px;
          transition: transform 0.3s ease;
        }
        
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .filter-title {
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sl-clear {
          color: var(--primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .sl-clear:hover { text-decoration: underline; }

        .filter-group {
          margin-bottom: 2rem;
        }
        .group-title {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          color: var(--foreground);
        }

        /* CHECKBOXES */
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          margin-bottom: 8px;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: color 0.2s;
          font-family: var(--font-primary);
        }
        .checkbox-label:hover { color: var(--primary); }
        
        .checkbox-custom {
          width: 18px;
          height: 18px;
          border: 1px solid var(--border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        input:checked + .checkbox-custom {
          background: var(--primary);
          border-color: var(--primary);
        }

        /* COLORS */
        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .color-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          box-shadow: 0 0 0 1px var(--border);
          transition: transform 0.2s;
        }
        .color-dot:hover { transform: scale(1.1); }
        .color-dot.active {
          box-shadow: 0 0 0 2px var(--primary);
          transform: scale(1.1);
        }

        /* PRICE SLIDER */
        .price-range {
          width: 100%;
          accent-color: var(--primary);
        }
        .price-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--muted-foreground);
          margin-top: 5px;
        }

        /* GRID */
        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .toggle-filter-btn {
          display: none;
          gap: 8px;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid var(--border);
          background: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .sl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }

        /* PAGINATION */
        .pagination {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .page-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-weight: 600;
        }
        .page-btn:hover { background-color: var(--muted); }
        .page-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .sl-container { grid-template-columns: 1fr; }
          .sl-filter {
            display: none; /* Hide for mobile initially */
            position: fixed;
            inset: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            border-radius: 0;
            overflow-y: auto;
          }
          .sl-filter.open { display: block; }
          .toggle-filter-btn { display: flex; }
        }

        @media (max-width: 768px) {
          .sl-grid {
            grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
            gap: 8px;
          }
        }
      `}</style>

            {/* HEADER */}
            <div className="sl-header">
                <h2>Little Princess Collection</h2>
                <p>Adorable and traditional Pattu Pavadai and Silk Sarees for kids.</p>
            </div>

            <div className="sl-container">

                {/* FILTERS SIDEBAR */}
                <aside className={`sl-filter ${showFilters ? "open" : ""}`}>
                    <div className="filter-header">
                        <h3 className="filter-title"><SlidersHorizontal size={18} /> Filters</h3>
                        <span className="sl-clear" onClick={() => { clearAll(); setShowFilters(false); }}>Clear All</span>
                        {showFilters && <span onClick={() => setShowFilters(false)} style={{ marginLeft: "auto", padding: 8, cursor: "pointer" }}>✕</span>}
                    </div>

                    <div className="filter-group">
                        <p className="group-title">Price Range</p>
                        <input
                            type="range"
                            className="price-range"
                            min="500"
                            max="50000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(+e.target.value)}
                        />
                        <div className="price-labels">
                            <span>₹500</span>
                            <span>₹{maxPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <p className="group-title">Category</p>
                        {["Kids", "Pattu Pavadai", "Kids Silk"].map((c) => (
                            <label key={c} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    hidden
                                    checked={categories.includes(c)}
                                    onChange={() => setCategories(toggle(categories, c))}
                                />
                                <div className="checkbox-custom">
                                    {categories.includes(c) && <Check size={12} color="white" />}
                                </div>
                                <span>{c}</span>
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <p className="group-title">Filter by Color</p>
                        <div className="color-grid">
                            {[
                                { name: "red", hex: "#ef4444" },
                                { name: "blue", hex: "#3b82f6" },
                                { name: "green", hex: "#22c55e" },
                                { name: "yellow", hex: "#eab308" },
                                { name: "purple", hex: "#a855f7" },
                                { name: "pink", hex: "#ec4899" },
                                { name: "orange", hex: "#f97316" },
                                { name: "gold", hex: "#d4af37" },
                                { name: "silver", hex: "#c0c0c0" },
                                { name: "black", hex: "#000000" },
                                { name: "white", hex: "#ffffff" },
                                { name: "gray", hex: "#6b7280" },
                                { name: "teal", hex: "#14b8a6" },
                                { name: "cream", hex: "#fdfbf7" },
                                { name: "mustard", hex: "#d97706" },
                                { name: "maroon", hex: "#7f1d1d" },
                                { name: "peach", hex: "#fdba74" },
                                { name: "multi", hex: "linear-gradient(45deg, red, yellow, blue)" },
                            ].map((c) => (
                                <div
                                    key={c.name}
                                    className={`color-dot ${color === c.name ? "active" : ""}`}
                                    style={{ background: c.hex }}
                                    onClick={() => setColor(color === c.name ? null : c.name)}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <p className="group-title">Occasion</p>
                        {[...new Set(kidsProducts.map(p => p.occasion))].filter(Boolean).map((o) => (
                            <label key={o} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    hidden
                                    checked={occasion.includes(o)}
                                    onChange={() => setOccasion(toggle(occasion, o))}
                                />
                                <div className="checkbox-custom">
                                    {occasion.includes(o) && <Check size={12} color="white" />}
                                </div>
                                <span>{o}</span>
                            </label>
                        ))}
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <div>
                    {/* MOBILE FILTER TOGGLE */}
                    <div className="results-info">
                        <button className="toggle-filter-btn" onClick={() => setShowFilters(true)}>
                            <SlidersHorizontal size={18} /> Filters
                        </button>
                        <span>Showing {filtered.length} products</span>
                    </div>

                    {/* PRODUCTS GRID */}
                    <section className="sl-grid">
                        {paginated.length > 0 ? (
                            paginated.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart}
                                    onToggleWishlist={onToggleWishlist}
                                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                                    isInCart={cart.some((c) => c.id === product.id)}
                                />
                            ))
                        ) : (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
                                <h3>No products found in Kids collection yet!</h3>
                                <p style={{ color: "var(--muted-foreground)" }}>Please check back later.</p>
                            </div>
                        )}
                    </section>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                                <ChevronLeft size={20} />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`page-btn ${page === i + 1 ? "active" : ""}`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
