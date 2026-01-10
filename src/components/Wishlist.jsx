import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Wishlist({ wishlist, onToggleWishlist, onAddToCart, cart = [] }) {
  const hasItems = wishlist.length > 0;
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <style>{`
        .wishlist-page {
          background-color: var(--background);
          min-height: 80vh;
          padding-bottom: 2rem;
        }

        .wishlist-header {
          padding: 2rem 1rem;
          text-align: center;
          background: white;
          border-bottom: 1px solid var(--border);
        }
        .wishlist-title {
          font-family: var(--font-secondary);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        .wishlist-subtitle {
          font-size: 1rem;
          color: var(--muted-foreground);
        }

        .wishlist-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }

        /* EMPTY STATE */
        .empty-state {
          text-align: center;
          padding: 6rem 1rem;
        }
        .empty-icon {
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .empty-text {
          font-size: 1.5rem;
          color: var(--foreground);
          margin-bottom: 2rem;
          font-family: var(--font-secondary);
        }
        .btn-browse {
          background: var(--primary);
          color: white;
          padding: 12px 32px;
          border-radius: 50px;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s;
        }
        .btn-browse:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* HEADER */}
      <div className="wishlist-header">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">Your curated collection of favorites. Save them for later or bag them now.</p>
      </div>

      <div className="wishlist-container">
        {hasItems ? (
          <section className="wishlist-grid">
            {wishlist.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={true}
                isInCart={cart.some((c) => c.id === item.id)}
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <Heart size={80} strokeWidth={1} className="empty-icon" />
            <h2 className="empty-text">Your wishlist is currently empty</h2>
            <button className="btn-browse" onClick={() => navigate("/")}>
              Start Browsing <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
