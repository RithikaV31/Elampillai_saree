import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { products } from "../data/products";

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const lowerQ = query.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(lowerQ) ||
      p.category.toLowerCase().includes(lowerQ) ||
      p.color.toLowerCase().includes(lowerQ)
    ).slice(0, 5); // Limit to 5 results for overlay

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === 'searchOverlay') onClose();
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to a results page could be added here, 
      // but for now we rely on the instant results.
      // We could navigate to /sarees with a filter if we added text search to SareesListing.
    }
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <div className="search-overlay" id="searchOverlay" onClick={handleBackdropClick}>
      <style>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 100px;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .search-container {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: slideDown 0.3s ease;
          position: relative;
          margin: 0 20px;
        }

        .search-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-primary);
          font-size: 1.2rem;
          color: var(--foreground);
          background: transparent;
        }

        .search-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted-foreground);
          padding: 4px;
          border-radius: 50%;
          transition: 0.2s;
        }
        .search-close:hover { background: var(--muted); color: var(--foreground); }

        .search-results {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .search-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-item:hover { background: var(--muted); }
        
        .search-item img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
        }
        
        .search-info h4 {
          font-family: var(--font-primary);
          font-size: 1rem;
          font-weight: 600;
          color: var(--foreground);
        }
        
        .search-info p {
          font-size: 0.85rem;
          color: var(--muted-foreground);
        }
        
        .no-results {
          text-align: center;
          padding: 20px;
          color: var(--muted-foreground);
        }
      `}</style>

      <div className="search-container">
        <div className="search-header">
          <SearchIcon size={24} className="text-gray-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search sarees, colors, categories..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="search-results">
          {query && results.length === 0 && (
            <div className="no-results">No products found for "{query}"</div>
          )}

          {results.map((product) => (
            <div key={product.id} className="search-item" onClick={() => goToProduct(product.id)}>
              <img src={product.image} alt={product.name} />
              <div className="search-info">
                <h4>{product.name}</h4>
                <p>₹{product.price.toLocaleString()} • {product.category}</p>
              </div>
              <ArrowRight size={16} style={{ marginLeft: "auto", opacity: 0.5 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;