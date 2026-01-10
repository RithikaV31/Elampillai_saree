import {
  Search,
  ShoppingCart,
  Bell,
  LayoutDashboard,
  Package,
  MapPin,
  Heart,
  User,
  LogOut,
  Truck,
  Home,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MyAccount() {
  return (
    <div className="account-page">
      <style>{`
        .account-page {
          background-color: var(--background);
          min-height: 100vh;
          font-family: var(--font-primary);
          color: var(--foreground);
        }

        /* HEADER */
        .acc-header {
          background: white;
          border-bottom: 1px solid var(--border);
          padding: 1rem 2rem;
        }
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .acc-brand {
          font-family: var(--font-secondary);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .acc-nav {
          display: flex;
          gap: 24px;
          font-size: 0.95rem;
          color: var(--muted-foreground);
        }
        .acc-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          color: var(--foreground);
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--muted);
          object-fit: cover;
        }

        /* MAIN LAYOUT */
        .acc-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          padding: 3rem 2rem;
        }

        /* SIDEBAR */
        .sidebar {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          height: fit-content;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .profile-pic {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--muted);
        }
        .user-info h4 { font-weight: 600; font-size: 1rem; }
        .user-info p { font-size: 0.85rem; color: var(--muted-foreground); }

        .sidebar-menu { display: flex; flex-direction: column; gap: 8px; }
        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          color: var(--foreground);
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .menu-item:hover { background: var(--muted); }
        .menu-item.active { background: var(--primary); color: white; }
        .menu-item.logout { color: #ef4444; margin-top: 1rem; }
        .menu-item.logout:hover { background: #fef2f2; }

        /* CONTENT */
        .dashboard-content { display: flex; flex-direction: column; gap: 2rem; }
        
        .welcome-section h2 {
          font-family: var(--font-secondary);
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .welcome-section p { color: var(--muted-foreground); }

        /* STATS GRID */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .stat-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--muted-foreground);
        }
        .stat-value { font-size: 2rem; font-weight: 700; color: var(--foreground); }
        .stat-desc { font-size: 0.85rem; color: var(--muted-foreground); }

        /* RECENT ORDERS */
        .orders-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid var(--border);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .section-title { font-weight: 600; font-size: 1.1rem; }
        .view-all { color: var(--primary); font-size: 0.9rem; font-weight: 500; cursor: pointer; }

        .orders-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
        .orders-table th { text-align: left; color: var(--muted-foreground); font-size: 0.8rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .orders-table td { padding: 1rem 0; border-bottom: 1px solid var(--muted); }
        .orders-table tr:last-child td { border-bottom: none; }
        
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-shipped { background: #dcfce7; color: #166534; }
        .status-processing { background: #dbeafe; color: #1e40af; }
        .status-delivered { background: #f3f4f6; color: #374151; }

        .action-link { color: var(--primary); font-size: 0.9rem; font-weight: 500; cursor: pointer; }

        /* PROMO */
        .promo-banner {
          background: linear-gradient(135deg, var(--primary) 0%, #be123c 100%);
          border-radius: 16px;
          padding: 2rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .promo-text h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
        .promo-text p { opacity: 0.9; font-size: 0.95rem; }
        .promo-btn {
          background: white;
          color: var(--primary);
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .acc-container { grid-template-columns: 1fr; }
          .sidebar { display: none; } /* Hide sidebar on mobile for now */
          .stats-grid { grid-template-columns: 1fr; }
          .promo-banner { flex-direction: column; text-align: center; gap: 1rem; }
        }
      `}</style>

      {/* HEADER */}
      <header className="acc-header">
        <div className="header-content">
          <div className="acc-brand">
            Elampillai Sarees
          </div>

          <nav className="acc-nav">
            <Link to="/">Home</Link>
            <Link to="/sarees">Sarees</Link>
            <Link to="/combo">Combo</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="acc-actions">
            <Bell size={20} />
            <div className="profile-pic" style={{ width: 32, height: 32 }}></div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="acc-container">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="user-profile">
            <div className="profile-pic"></div>
            <div className="user-info">
              <h4>Priya Sharma</h4>
              <p>priya.sharma@example.com</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button className="menu-item active">
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="menu-item">
              <Package size={18} /> My Orders
            </button>
            <button className="menu-item">
              <MapPin size={18} /> Addresses
            </button>
            <button className="menu-item">
              <Heart size={18} /> Wishlist
            </button>
            <button className="menu-item">
              <User size={18} /> Account Details
            </button>
            <button className="menu-item logout">
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="dashboard-content">

          <div className="welcome-section">
            <h2>My Account</h2>
            <p>Welcome back, Priya. Here’s what’s happening with your sarees.</p>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                ACTIVE ORDERS <Truck size={16} color="var(--primary)" />
              </div>
              <div className="stat-value">2</div>
              <div className="stat-desc">1 Shipped, 1 Processing</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                WISHLIST ITEMS <Heart size={16} color="var(--primary)" />
              </div>
              <div className="stat-value">12</div>
              <div className="stat-desc">Price drops on 2 items</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                SAVED ADDRESSES <Home size={16} color="var(--primary)" />
              </div>
              <div className="stat-value">3</div>
              <div className="stat-desc">Default: Home, Chennai</div>
            </div>
          </div>

          <div className="orders-section">
            <div className="section-header">
              <h3 className="section-title">Recent Orders</h3>
              <span className="view-all">View All</span>
            </div>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>TOTAL</th>
                  <th style={{ textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ES-8821</td>
                  <td>Oct 24, 2023</td>
                  <td><span className="status-badge status-shipped">Shipped</span></td>
                  <td>₹4,250</td>
                  <td style={{ textAlign: "right" }}><span className="action-link">Track Order</span></td>
                </tr>
                <tr>
                  <td>#ES-8805</td>
                  <td>Oct 18, 2023</td>
                  <td><span className="status-badge status-processing">Processing</span></td>
                  <td>₹2,800</td>
                  <td style={{ textAlign: "right" }}><span className="action-link">View Details</span></td>
                </tr>
                <tr>
                  <td>#ES-8750</td>
                  <td>Sep 30, 2023</td>
                  <td><span className="status-badge status-delivered">Delivered</span></td>
                  <td>₹8,500</td>
                  <td style={{ textAlign: "right" }}><span className="action-link">Invoice</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="promo-banner">
            <div className="promo-text">
              <h3>New Kanjivaram Arrivals</h3>
              <p>Explore our latest handcrafted collection with traditional motifs.</p>
            </div>
            <button className="promo-btn">Explore Collection <ArrowRight size={16} style={{ display: "inline", verticalAlign: "middle" }} /></button>
          </div>

        </main>

      </div>
    </div>
  );
}
