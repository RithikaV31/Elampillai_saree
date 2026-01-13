import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, Home, Layers, Grid, Info, Phone, ChevronDown, Baby } from "lucide-react";

function Header({ cartCount, wishlistCount, onSearchClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Just a visual demo since real search is complex inline without dropdown
      // For now, we can redirect or just let the user type
      console.log("Searching for:", searchQuery);
    }
  };

  const categories = [
    "Silk Cotton", "Cotton", "Daily Wear", "Festival", "Wedding", "New Arrivals", "Handloom", "Powerloom"
  ];

  return (
    <header className="header">

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="announcement-bar">
        <div className="announcement-track">
          {[...Array(3)].map((_, i) => (
            <p key={i}>📜 "அருமை உடைத்தென்று அசாவாமை வேண்டும் பெருமை முயற்சி தரும்" — குறள் 611 (Effort Yields Greatness) 🥻 Authentic Elampillai Weaves</p>
          ))}
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">

            {/* LOGO */}
            <div className="logo" onClick={() => go("/")}>
              <h1>Elampillai Sarees</h1>
              <span className="logo-tamil">இளம்பிள்ளை நெசவு</span>
            </div>

            {/* SEARCH BAR (CENTERED) */}
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search our collection..."
                className="header-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onClick={onSearchClick}
              />
              <Search className="search-icon-inside" size={18} />
            </div>

            {/* MENU & ICONS */}
            <div className="nav-actions">
              <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                <li onClick={() => go("/")}><Home size={16} /> Home</li>
                <li onClick={() => go("/sarees")} className="dropdown-trigger"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}>
                  <span className="dropdown-label"><Grid size={16} /> Collections <ChevronDown size={12} /></span>
                  <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                    {categories.map((cat) => (
                      <div key={cat} className="dropdown-item" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sarees?category=${cat}`);
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false); // Close mobile menu!
                      }}>{cat}</div>
                    ))}
                  </div>
                </li>
                <li onClick={() => go("/combo")}><Layers size={16} /> Combo</li>
                <li onClick={() => go("/kids")}><Baby size={18} /> Kids</li>
                <li onClick={() => go("/about")}><Info size={16} /> About</li>
                <li onClick={() => go("/contact")}><Phone size={16} /> Contact</li>
              </ul>

              <div className="nav-icons">
                <button className="icon-btn" onClick={() => go("/wishlist")} aria-label="Wishlist">
                  <Heart size={22} />
                  {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
                </button>
                <button className="icon-btn" onClick={() => go("/cart")} aria-label="Cart">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
                </button>
                <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ===== CSS ===== */}
      <style>{`

        *{box-sizing:border-box}
        .header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.98);backdrop-filter:blur(12px);box-shadow:0 4px 20px -5px rgba(0,0,0,0.05); border-bottom: 1px solid var(--border);}
        
        .announcement-bar{
          background: var(--primary-dark);
          color: white;
          padding: 8px 0;
          font-size: 13px;
          letter-spacing: 0.5px;
          font-weight: 600;
          font-family: var(--font-primary);
          overflow: hidden;
          white-space: nowrap;
        }
        .announcement-track{
          display: flex;
          width: fit-content;
          animation: headerScroll 20s linear infinite;
        }
        .announcement-track p {
          white-space: nowrap; 
          margin: 0;
          padding-right: 6rem; /* Space between repeats inside the item for perfect loop */
        }
        
        .container{max-width:1400px;margin:auto;padding:0 24px}
        .nav-content{display:flex;align-items:center;justify-content:space-between;height:90px; gap: 30px;}
        
        /* LOGO */
        .logo {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center for mobile appeal */
          justify-content: center;
          line-height: 1;
        }
        .logo h1{
          font-family: var(--font-accent);
          font-weight: 700; /* Bold */
          font-size: 38px;
          color: var(--primary);
          letter-spacing: -0.5px;
          margin-bottom: 2px;
        }
        .logo-tamil {
          font-size: 12px;
          color: var(--muted-foreground);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        /* SEARCH BAR */
        .search-wrapper {
          flex: 1;
          max-width: 500px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .header-search {
          width: 100%;
          padding: 12px 45px 12px 20px;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: #fdfdfd;
          font-family: var(--font-primary);
          font-size: 14px;
          font-weight: 500;
          outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .header-search:focus {
          background: white;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(136, 19, 55, 0.1);
          transform: scale(1.02);
        }
        .search-icon-inside {
          position: absolute;
          right: 18px;
          color: var(--muted-foreground);
          pointer-events: none;
        }

        /* ACTIONS */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        /* MENU */
        .nav-menu {
          display: flex;
          gap: 25px;
          list-style: none;
          align-items: center;
        }
        .nav-menu li {
          cursor: pointer;
          font-family: var(--font-secondary);
          font-size: 18px;
          font-weight: 700; /* Bold header text */
          color: var(--foreground);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-menu li:hover { color: var(--primary); }
        .nav-menu li:not(.dropdown-trigger)::after{
          content:"";
          position:absolute;
          left:0;bottom:-4px;
          width:0;height:2px;
          background:var(--primary);
          transition:.25s;
        }
        .nav-menu li:not(.dropdown-trigger):hover::after{width:100%}

        /* DROPDOWN */
        .dropdown-trigger { position: relative; }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px) scale(0.95);
          background: white;
          min-width: 220px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          border-radius: 12px;
          padding: 8px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border);
          z-index: 100;
        }
        .dropdown-trigger:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0) scale(1); }
        .dropdown-label { display: flex; align-items: center; gap: 4px; }
        .dropdown-item {
          padding: 10px 16px;
          border-radius: 8px;
          color: var(--foreground);
          font-size: 16px;
          font-weight: 500;
          font-family: var(--font-secondary);
          cursor: pointer;
        }
        .dropdown-item:hover { background: var(--secondary); color: var(--primary); }

        /* ICONS */
        .nav-icons { display: flex; gap: 16px; align-items: center; }
        .icon-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--foreground);
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center; 
          padding: 8px;
          border-radius: 50%;
        }
        .icon-btn:hover { background: var(--muted); color: var(--primary); }
        
        .count-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--primary);
          color: white;
          font-size: 10px;
          font-weight: 700;
          height: 18px;
          min-width: 18px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        /* KEYFRAMES */
        @keyframes headerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        /* MOBILE */
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; color: var(--foreground); }
        
        @media(max-width: 1024px) {
          .nav-content { flex-wrap: wrap; height: auto; padding: 8px 0; gap: 8px; }
          .logo { 
            align-items: flex-start; 
            margin-right: auto;
          }
          .logo h1 { font-size: 24px; }
          .logo-tamil { font-size: 9px; letter-spacing: 1px; }

          .search-wrapper { order: 3; width: 100%; max-width: 100%; margin-top: 6px; }
          .header-search { padding-top: 6px; padding-bottom: 6px; font-size: 13px; height: 36px; }
          
          .nav-actions { margin-left: auto; gap: 12px; }
          .nav-menu { display: none; } 
          .mobile-menu-btn { 
            display: block; 
            position: relative; 
            z-index: 201; 
            transform: translateY(2px); /* Align visually with icons */
          }
          
          .nav-menu.active {
            display: flex;
            position: absolute; /* Changed from fixed to absolute to sit below header */
            top: 100%; /* Push below the header */
            left: 0;
            right: 0;
            width: 100%;
            height: auto; /* Fit content height */
            z-index: 200;
            max-width: 100%; /* Full width */
            background: white;
            flex-direction: column;
            padding: 24px 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            align-items: flex-start;
            border-bottom: 1px solid var(--border);
            max-height: calc(100vh - 120px); /* Ensure it doesn't go off-screen */
            overflow-y: auto; /* Scroll if content is too tall */
          }
          .dropdown-menu {
            position: static;
            box-shadow: none;
            border: none;
            opacity: 1;
            visibility: visible;
            transform: none;
            padding-left: 20px;
            display: none;
          }
          .dropdown-trigger:hover .dropdown-menu, .dropdown-menu.show { display: block; }
        }
      `}</style>
    </header>
  );
}

export default Header;
