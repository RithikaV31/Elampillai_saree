import { useNavigate } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isInCart,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <style>{`
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.4s ease;
          border: 1px solid transparent;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          border-color: var(--border);
        }
        .img-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--muted);
        }
        .img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .product-card:hover .img-wrapper img {
          transform: scale(1.1);
        }
        /* ACTIONS OVERLAY */
        .actions-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: translateX(20px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .product-card:hover .actions-overlay {
          transform: translateX(0);
          opacity: 1;
        }
        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          color: var(--foreground);
          transition: all 0.2s;
        }
        .action-btn:hover {
          background: var(--primary);
          color: white;
          transform: scale(1.1);
        }
        .action-btn.active {
          color: var(--primary);
        }
        .action-btn.active:hover {
          color: white;
        }
        /* INFO */
        .info {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .category-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--muted-foreground);
          margin-bottom: 4px;
          font-weight: 500;
        }
        .title {
          font-family: var(--font-secondary);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }        
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }
        .rating-val {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--foreground);
          margin-left: 4px;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-top: auto;
          margin-bottom: 16px;
        }
        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
        }
        .old-price {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: var(--muted-foreground);
        }
        .discount {
          font-size: 0.75rem;
          background: #fee2e2;
          color: #991b1b;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .add-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: var(--foreground);
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .add-btn:hover {
          background: var(--primary);
        }
        .add-btn.in-cart {
          background: var(--muted);
          color: var(--muted-foreground);
          cursor: default;
        }
        .buy-now-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #ca8a04; /* Gold accent color */
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.2s;
        }
        .buy-now-btn:hover {
          background: #b47b03;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .product-card { 
            border-radius: 8px; /* Tighter radius */
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
          }
          .img-wrapper {
             aspect-ratio: 1/1; /* Square image to save height */
          }
          .info { padding: 0.5rem; /* Very compact padding */ }
          .category-tag { display: none; /* Hide category on mobile for density */ }
          .title { 
            font-size: 0.85rem; 
            margin-bottom: 4px; 
            line-height: 1.2;
            -webkit-line-clamp: 1; /* One line title if possible */
          }
          .rating { margin-bottom: 6px; }
          .price-row { margin-bottom: 8px; gap: 6px; }
          .price { font-size: 1rem; }
          .old-price { font-size: 0.75rem; }
          .discount { font-size: 0.65rem; padding: 1px 4px; }
          
          .add-btn { 
            padding: 8px; 
            font-size: 0.8rem; 
            border-radius: 6px;
            height: 32px;
          }
        }
      `}</style>
      <div className="img-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="actions-overlay">
          <button
            className={`action-btn ${isWishlisted ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          <button
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <Eye size={20} />
          </button>
        </div>
      </div>
      <div className="info">
        <span className="category-tag">{product.category}</span>
        <h3 className="title">{product.name}</h3>
        <div className="rating">
          <Star size={14} fill="#fbbf24" stroke="none" />
          <span className="rating-val">{product.rating || "4.5"}</span>
          <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>({product.reviews || 12})</span>
        </div>
        <div className="price-row">
          <span className="price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="old-price">₹{product.originalPrice}</span>
              <span className="discount">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <button
            className={`add-btn ${isInCart ? "in-cart" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) onAddToCart(product.id, 1);
            }}
          >
            <ShoppingCart size={18} />
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
          <button
            className="buy-now-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) onAddToCart(product.id, 1); // Ensure it's in cart first
              navigate('/checkout'); // Redirect to checkout
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}