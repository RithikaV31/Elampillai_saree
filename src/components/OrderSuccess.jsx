import {
  Check,
  Truck,
  CreditCard,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cart = state?.cart || [];
  const totals = state?.totals || {};
  const address = state?.address || {};
  const payment = state?.payment || "WhatsApp Order";

  return (
    <div className="order-success-page">
      <style>{`
        .order-success-page {
          background-color: var(--background);
          min-height: 100vh;
          padding: 4rem 1rem;
        }
        .os-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .success-hero {
          text-align: center;
          margin-bottom: 3rem;
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
        }
        
        .check-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #ecfccb; /* light lime/green */
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #65a30d;
        }
        .success-title {
          font-family: var(--font-secondary);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 1rem;
        }
        .success-message {
          font-size: 1.2rem;
          color: var(--muted-foreground);
          max-width: 600px;
          margin: 0 auto;
        }

        .os-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 2rem;
        }

        .info-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
          height: fit-content;
        }
        .card-title {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .order-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .order-item img {
          width: 70px;
          height: 90px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          color: var(--muted-foreground);
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--foreground);
        }

        .action-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: white;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          margin-bottom: 1rem;
        }
        .action-btn.primary {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .action-btn.primary:hover {
          background: var(--primary-dark);
        }

        @media (max-width: 900px) {
          .os-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="os-container">

        <div className="success-hero">
          <div className="check-circle">
            <Check size={40} strokeWidth={3} />
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-message">Thank you for your order. We will process it shortly and update you via WhatsApp.</p>
        </div>

        <div className="os-grid">

          {/* LEFT: Order Details */}
          <div className="info-card">
            <h3 className="card-title">Order Details</h3>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: 4 }}>{item.name}</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)" }}>Qty: {item.quantity}</p>
                  </div>
                  <b>₹{(item.price * item.quantity).toLocaleString()}</b>
                </div>
              ))
            ) : (
              <p>No items found (Demo Mode)</p>
            )}

            <div className="summary-row" style={{ marginTop: "1.5rem" }}>
              <span>Subtotal</span>
              <span>₹{totals.subtotal?.toLocaleString() || "0"}</span>
            </div>
            <div className="summary-row">
              <span>Tax & Handling</span>
              <span>₹{totals.tax?.toLocaleString() || "0"}</span>
            </div>
            <div className="total-row">
              <span>Total Paid</span>
              <span style={{ color: "var(--primary)" }}>₹{totals.total?.toLocaleString() || "0"}</span>
            </div>
          </div>

          {/* RIGHT: Status & Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            <div className="info-card">
              <h3 className="card-title">Delivery Info</h3>
              <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: "1rem" }}>
                <Truck size={20} className="text-muted-foreground" />
                <div>
                  <p style={{ fontWeight: 600 }}>{address.name || "Customer Name"}</p>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                    {address.city ? `${address.city}, ${address.state}` : "Delivery Address"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CreditCard size={20} className="text-muted-foreground" />
                <p style={{ fontSize: "0.9rem" }}>{payment}</p>
              </div>
            </div>

            <div className="info-card">
              <h3 className="card-title">What's Next?</h3>
              <button className="action-btn primary">
                <MessageSquare size={18} /> Chat on WhatsApp
              </button>
              <button className="action-btn" onClick={() => navigate("/")}>
                Continue Shopping <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
