import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

function ProductGrid({
  products,
  cart = [],
  wishlist = [],
  onAddToCart,
  onToggleWishlist,
}) {
  const navigate = useNavigate();
  return (
    <section className="product-section" id="new-arrivals">
      <style>{`
        .product-section {
          padding: 1rem 1rem; /* Minimal padding */
          background-color: var(--secondary);
          color: #1f2937;
        }

        .container-custom {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 0px; /* Absolutely no space */
        }

        .section-title {
          font-family: var(--font-secondary);
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary); /* BRAND COLOR */
          margin-bottom: 0.5rem; /* Tight title spacing */
          background: none;
          -webkit-text-fill-color: initial;
          display: block;
        }

        .section-subtitle {
          font-family: var(--font-primary);
          font-size: 1.15rem;
          color: #4b5563; /* MUTED TEXT */
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.2;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          max-width: 1400px;
          margin: 0 auto;
          color: #1f2937; /* ENSURE CARD TEXT INHERITS */
        }

        @media (max-width: 768px) {
          .product-grid {
             grid-template-columns: repeat(auto-fill, minmax(136px, 1fr)); 
             gap: 8px; /* Tighter gap */
          }
        }
        @media (min-width: 769px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .view-all-container {
          text-align: center;
          margin-top: 4rem;
        }

        .btn-view-all {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 32px;
          border-radius: 50px;
          border: 1px solid #1f2937;
          color: #1f2937;
          background: transparent;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-view-all:hover {
          background: #1f2937;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">
            காலம் மாறினாலும், நூலில் நெசவான பாரம்பரியம் மாறாது.
            இளம்பிள்ளை  சேலை — மரபின் மணம், அழகின் முகவரி.
          </p>
        </div>

        <div className="product-grid">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some((w) => w.id === product.id)}
              isInCart={cart.some((c) => c.id === product.id)}
            />
          ))}
        </div>

        <div className="view-all-container">
          <button className="btn-view-all" onClick={() => navigate("/sarees")}>
            View All Collection <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
