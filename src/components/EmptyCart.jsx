import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function EmptyCart({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const navigate = useNavigate();

  // Get first 4 products as suggestions
  const suggestions = products.slice(0, 4);

  return (
    <div className="empty-cart-page">

      {/* ========== CSS ========== */}
      <style>{`
        .empty-cart-page {
          background: #faf7f5;
          min-height: 100vh;
          color: #1f2937;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px 40px;
        }
        @media (max-width: 768px) {
          .empty-state { padding: 40px 16px 30px; } /* Less whitespace on mobile */
        }

        .empty-circle {
          width: 140px;
          height: 140px;
          margin: auto;
          border-radius: 50%;
          background: #fdecec;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .empty-circle span {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #facc15;
        }

        .browse-btn {
          margin-top: 16px;
          background: #dc2626;
          border: none;
          color: white;
          padding: 12px 28px;
          border-radius: 10px;
          cursor: pointer;
        }

        .browse-btn:hover {
          background: #b91c1c;
        }

        .suggestion-section {
          max-width: 1200px;
          margin: auto;
          padding: 40px 24px 80px;
        }

        .suggestion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
          gap: 10px; /* Tighter gap for mobile */
        }
        @media (min-width: 768px) {
           .suggestion-grid {
             grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
             gap: 22px;
           }
        }

        .view-all-btn {
          color: #dc2626;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .view-all-btn:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* ========== EMPTY STATE ========== */}
      <section className="empty-state">
        <div className="empty-circle">
          <span />
        </div>

        <h2>Your cart is currently empty</h2>
        <p style={{ color: "#6b7280" }}>
          Looks like you haven’t discovered our latest Elampillai weaves yet.
        </p>

        <button className="browse-btn" onClick={() => navigate("/sarees")}>
          Browse Collections
        </button>
      </section>

      {/* ========== SUGGESTIONS ========== */}
      <section className="suggestion-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h3>You might love these…</h3>

          <span className="view-all-btn" onClick={() => navigate("/sarees")}>
            View all <ArrowRight size={14} />
          </span>
        </div>

        <div className="suggestion-grid">
          {suggestions.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === p.id)}
              isInCart={cart.some((item) => item.id === p.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
