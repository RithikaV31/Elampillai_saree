import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, onUpdateQty, onRemove }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <div className="cart-page">
      <style>{`
        .cart-page {
          background-color: var(--background);
          min-height: 80vh;
          padding: 1rem;
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cart-title {
          font-family: var(--font-secondary);
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--primary);
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        /* EMPTY STATE */
        .empty-cart {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
        }
        .empty-icon {
          color: var(--muted-foreground);
          margin-bottom: 1rem;
        }
        .empty-text {
          font-size: 1.25rem;
          color: var(--foreground);
          margin-bottom: 2rem;
        }
        .btn-shop {
          background: var(--primary);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-shop:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        /* CART ITEMS */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cart-item {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          border: 1px solid var(--border);
        }
        .cart-item:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        .item-img {
          width: 100px;
          height: 130px;
          object-fit: cover;
          border-radius: 8px;
          background: var(--muted);
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }
        .item-name {
          font-family: var(--font-secondary);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }
        .item-price {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary);
        }

        .item-meta {
          font-size: 0.9rem;
          color: var(--muted-foreground);
          margin-bottom: 4px;
        }
        .stock-status {
          font-size: 0.85rem;
          color: #16a34a;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--background);
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .qty-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: var(--foreground);
        }
        .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .qty-val { font-weight: 600; font-size: 1rem; min-width: 20px; text-align: center; }

        @media (max-width: 768px) {
          .cart-page { padding: 1rem; }
          .cart-item { flex-direction: row; padding: 1rem; gap: 1rem; align-items: flex-start; }
          .item-img { width: 80px; height: 100px; }
          .item-details { width: 100%; display: grid; gap: 10px; }
          .item-header { flex-direction: column; gap: 4px; align-items: flex-start; }
          .item-name { font-size: 1rem; }
          .item-price { font-size: 1rem; }
          .item-actions { margin-top: 0; justify-content: space-between; }
          .remove-btn { font-size: 0.8rem; }
          .qty-controls { padding: 4px 8px; }
          .qty-val { font-size: 0.9rem; }
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .remove-btn:hover { opacity: 0.8; }

        /* SUMMARY */
        .cart-summary {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          height: fit-content;
          position: sticky;
          top: 100px;
          border: 1px solid var(--border);
        }
        .summary-title {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--foreground);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--muted-foreground);
          font-size: 1rem;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--foreground);
        }

        .checkout-btn {
          width: 100%;
          margin-top: 2rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(159, 18, 57, 0.3);
        }
        .checkout-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(159, 18, 57, 0.4);
        }

        .trust-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 1.5rem;
          color: var(--muted-foreground);
          font-size: 0.9rem;
        }

        .benefits-box {
          margin-top: 1.5rem;
          background: #fff5f5;
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .benefit-item {
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 0.9rem;
          color: var(--foreground);
        }

        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-summary { position: static; margin-top: 2rem; }
        }
      `}</style>

      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Bag ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} strokeWidth={1} className="empty-icon" />
            <h3 className="empty-text">Your cart is currently empty.</h3>
            <button onClick={() => navigate("/")} className="btn-shop">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">

            {/* ITEMS LIST */}
            <div className="cart-items-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="item-img" />

                  <div className="item-details">
                    <div>
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      <p className="item-meta">{item.category}</p>
                      <p className="stock-status">
                        <div style={{ width: 8, height: 8, background: "currentColor", borderRadius: "50%" }}></div>
                        In Stock
                      </p>
                    </div>

                    <div className="item-actions">
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          disabled={item.quantity <= 1}
                          onClick={() => onUpdateQty(item.id, -1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button className="remove-btn" onClick={() => onRemove(item.id)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <aside>
              <div className="cart-summary">
                <h3 className="summary-title">Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                  Proceed to Checkout <ArrowRight size={20} />
                </button>

                <div className="trust-badge">
                  <ShieldCheck size={16} />
                  <span>Secure Checkout</span>
                </div>

                <div className="benefits-box">
                  <div className="benefit-item">
                    <ShieldCheck size={18} color="var(--primary)" />
                    <div>
                      <strong>Authentic Quality</strong>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Sourced directly from weavers</div>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Truck size={18} color="var(--primary)" />
                    <div>
                      <strong>Secure Shipping</strong>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Delivery across India</div>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}
