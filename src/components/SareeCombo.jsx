import { useState } from "react";
import { SlidersHorizontal, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products as PRODUCTS } from "../data/products";
import { motion } from "framer-motion";
import comboBanner from "../assets/combo.png";

const ITEMS_PER_PAGE = 12;

export default function SareeCombo() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (arr, val) =>
    arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val];

  const clearAll = () => {
    setCategories([]);
    setColor(null);
    setPage(1);
    setShowFilters(false);
  };

  /* ================= ONLY COMBO PRODUCTS ================= */
  const comboProducts = PRODUCTS.filter((p) => p.type === "combo" || p.category === "Combo");

  /* ================= FILTER ================= */
  const filtered = comboProducts.filter((p) => {
    if (categories.length && !categories.includes(p.category)) return false;
    if (color && !p.color?.toLowerCase().includes(color.toLowerCase())) return false; // Fixed: using includes
    return true;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="combo-page">
      <style>{`
        .combo-page {
          background-color: var(--background);
          min-height: 100vh;
          padding: 1rem;
        }

        /* HERO SECTION */
        /* HERO SECTION */
        .combo-hero {
          position: relative;
          padding: 6rem 1rem;
          background-image: url(${comboBanner});
          background-size: cover;
          background-position: center;
          text-align: center;
          color: white;
          margin-bottom: 3rem;
          border-radius: 0 0 30px 30px;
          overflow: hidden;
        }
        .combo-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }
        .combo-hero-content {
          position: relative;
          z-index: 2;
        }
        .hero-title {
          font-family: var(--font-secondary);
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .sl-layout {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 24px 6rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
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
        }
        .filter-header {
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
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
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: 600;
        }
        .sl-clear:hover { text-decoration: underline; }

        .filter-group {
          margin-bottom: 1.5rem;
        }
        .filter-group-title {
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
          color: var(--foreground);
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          margin-bottom: 10px;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: color 0.2s;
        }
        .checkbox-label:hover { color: var(--primary); }
        .checkbox-custom {
          width: 18px; 
          height: 18px; 
          border: 2px solid var(--border); 
          border-radius: 4px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          transition: all 0.2s;
        }
        input:checked + .checkbox-custom {
          background: var(--primary);
          border-color: var(--primary);
        }
        input:checked ~ .text {
          color: var(--foreground);
          font-weight: 500;
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

        /* GRID */
        .sl-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .result-count {
          color: var(--muted-foreground);
          font-weight: 500;
        }

        .sl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }

        /* CARD */
        .combo-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          border: 1px solid transparent;
          box-shadow: var(--shadow-sm);
        }
        .combo-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border);
        }

        .img-wrap {
          height: 340px;
          overflow: hidden;
          position: relative;
          background-color: var(--muted);
        }
        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .combo-card:hover .img-wrap img {
          transform: scale(1.1);
        }

        .badge-combo {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--accent);
          color: black;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-body {
          padding: 1.5rem;
        }
        .card-title {
          font-family: var(--font-secondary);
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 12px;
        }
        .current-price {
          color: var(--primary);
          font-weight: 700;
          font-size: 1.25rem;
        }
        .old-price {
          font-size: 0.9rem;
          color: var(--muted-foreground);
          text-decoration: line-through;
        }
        .rating {
          display: flex;
          gap: 4px;
          align-items: center;
          font-size: 0.85rem;
          color: var(--muted-foreground);
        }

        /* PAGINATION */
        .pagination {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .page-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
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
          box-shadow: 0 4px 12px rgba(159, 18, 57, 0.3);
        }
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          margin-bottom: 1rem;
        }

        .apply-btn {
          margin-top: 1rem;
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        @media (min-width: 901px) {
          .apply-btn { display: none; }
        }

        @media (max-width: 900px) {
          .sl-layout { grid-template-columns: 1fr; }
          .sl-filter {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            border-radius: 0;
            overflow-y: auto;
            margin-bottom: 0;
          }
          .sl-filter.open { display: block; }
          .toggle-filter-btn { display: flex; }
        }

        @media (max-width: 768px) {
          .sl-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
          }
          .img-wrap {
            height: 200px;
          }
        }
      `}</style>

      {/* HERO */}
      <div className="combo-hero">
        <motion.div
          className="combo-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title"></h1>
          <p className="hero-subtitle">Curated sets of premium sarees at unbeatable prices. Perfect for weddings, gifting, and festive occasions.</p>
        </motion.div>
      </div>

      <div className="sl-layout">
        {/* FILTERS */}
        <aside className={`sl-filter ${showFilters ? "open" : ""}`}>
          <div className="filter-header">
            <h3 className="filter-title"><SlidersHorizontal size={18} /> Filters</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span className="sl-clear" onClick={clearAll}>Clear All</span>
              {showFilters && <span onClick={() => setShowFilters(false)} style={{ cursor: "pointer", fontSize: "1.2rem" }}>✕</span>}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-group-title">Category</p>
            {[...new Set(comboProducts.map(p => p.category))].map((c) => (
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
                <span className="text">{c}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <p className="filter-group-title">Filter by Color</p>
            <div className="color-grid">
              <div
                className={`color-dot ${color === null ? "active" : ""}`}
                style={{ background: "linear-gradient(45deg, transparent 40%, #ff0000 40%, #ff0000 60%, transparent 60%), #fff", border: "1px solid #ddd" }}
                onClick={() => setColor(null)}
                title="None"
              />
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
                { name: "sandal", hex: "#eecfa1" },
                { name: "lavender", hex: "#e6e6fa" }
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

          <button className="apply-btn" onClick={() => setShowFilters(false)}>
            Apply Filters
          </button>
        </aside>

        {/* PRODUCTS */}
        <div>
          <div className="sl-header-bar">
            {/* TOGGLE BTN for mobile */}
            <button className="toggle-filter-btn" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal size={18} /> Filters
            </button>
            <span className="result-count">Showing {filtered.length} exclusive combos</span>
          </div>

          <section className="sl-grid">
            {paginated.map((p) => (
              <motion.div
                key={p.id}
                className="combo-card"
                onClick={() => navigate(`/product/${p.id}`)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="img-wrap">
                  <img src={p.images?.[0] || p.image} alt={p.name} />
                  <span className="badge-combo">{p.badge || "Best Value"}</span>
                </div>

                <div className="card-body">
                  <p className="card-title">{p.name}</p>
                  <div className="price-row">
                    <span className="current-price">₹{p.price.toLocaleString()}</span>
                    {p.originalPrice && <span className="old-price">₹{p.originalPrice.toLocaleString()}</span>}
                  </div>

                  <div className="rating">
                    <Star size={14} fill="#fbbf24" stroke="none" />
                    <span>{p.rating || 4.5}</span>
                    <span>({p.reviews || 20} reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
