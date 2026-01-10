import { useState, useEffect, useRef } from "react";
import { Heart, Share2, Truck, Star, Check, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import OrderModal from "./OrderModal";

export default function ProductDetail({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = products.find((p) => String(p.id) === id);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  const thumbs =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
        ? [product.image, product.image, product.image]
        : [];

  const [active, setActive] = useState(thumbs[0]);
  const [added, setAdded] = useState(false);

  /* zoom refs */
  const imgBoxRef = useRef(null);
  const imgRef = useRef(null);

  /* reset image + cart state when product changes */
  useEffect(() => {
    if (thumbs.length) setActive(thumbs[0]);
    setAdded(false);
  }, [id, product]);

  const isWishlisted = wishlist.some((p) => p.id === product?.id);

  /* ================= ZOOM ================= */

  const handleMouseMove = (e) => {
    const box = imgBoxRef.current;
    const img = imgRef.current;
    if (!box || !img) return;

    const rect = box.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2.2)";
  };

  const resetZoom = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
      imgRef.current.style.transformOrigin = "center center";
    }
  };

  /* ================= ACTIONS ================= */

  const handleWhatsapp = () => {
    setIsOrderModalOpen(true);
  };

  const handleAddCart = () => {
    if (added) return;
    onAddToCart(product.id, 1);
    setAdded(true);
  };

  const handleWishlist = () => {
    onToggleWishlist(product.id);
  };

  const handleShare = async () => {
    const url = window.location.href;

    // 1. Try Native Share
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out this authentic Elampillai saree: ${product.name}`,
          url,
        });
        return;
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
    }

    // 2. Clipboard / Prompt Fallback
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      prompt("Copy this link to share:", url);
    }
  };
  if (!product) return null;

  return (
    <div className="pd-page">
      <style>{`
        .pd-page { background: var(--background); min-height: 100vh; padding: 40px 20px 80px; color: var(--foreground); }
        .container { max-width: 1200px; margin: 0 auto; }
        
        .pd-top { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media(min-width: 1024px) { .pd-top { grid-template-columns: 1fr 480px; gap: 60px; } }

        .pd-left { display: flex; gap: 24px; flex-direction: column-reverse; }
        @media(min-width: 768px) { .pd-left { flex-direction: row; } }

        .pd-thumbs { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; }
        @media(min-width: 768px) { .pd-thumbs { flex-direction: column; width: 90px; overflow-x: visible; padding-bottom: 0; } }

        .pd-thumbs img {
          width: 90px; height: 110px; object-fit: cover; border-radius: 12px; cursor: pointer;
          border: 2px solid transparent; transition: all 0.2s;
          box-shadow: var(--shadow-sm);
        }
        .pd-thumbs img.active { border-color: var(--primary); transform: scale(0.95); }
        .pd-thumbs img:hover { transform: translateY(-2px); }

        .pd-main-img {
          border-radius: 24px;
          flex: 1;
          background: white;
          overflow: hidden;
          position: relative;
          box-shadow: var(--shadow-lg);
          aspect-ratio: 3/4;
        }
        .pd-main-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .08s ease-out;
        }

        .zoom-hint {
          position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9);
          padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
          backdrop-filter: blur(4px); pointer-events: none; z-index: 5;
        }

        .pd-info { padding-top: 1rem; }
        .pd-info h1 { 
          font-family: var(--font-secondary); 
          font-size: 2.75rem; 
          line-height: 1.1; 
          margin-bottom: 16px; 
          color: var(--foreground);
          letter-spacing: -0.5px;
        }
        .pd-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; font-size: 0.95rem; color: var(--muted-foreground); }
        
        .price-row { display: flex; align-items: baseline; gap: 16px; margin-bottom: 28px; }
        .price { font-size: 2.25rem; color: var(--primary); font-weight: 700; font-family: var(--font-primary); }
        .old-price { text-decoration: line-through; color: var(--muted-foreground); font-size: 1.25rem; }
        
        .desc { font-size: 1.05rem; line-height: 1.7; color: var(--foreground); margin-bottom: 36px; opacity: 0.9; }

        .actions { display: flex; flex-direction: column; gap: 16px; }
        
        .btn {
          display: flex; align-items: center; justify-content: center; gap: 10px; padding: 18px; 
          border-radius: 16px; font-weight: 600; font-size: 1.1rem; transition: all 0.3s; border: none; cursor: pointer;
        }

        .btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(159, 18, 57, 0.25); }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(159, 18, 57, 0.35); }

        .btn-whatsapp { background: #25D366; color: white; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25); }
        .btn-whatsapp:hover { background: #1faf53; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35); }

        .btn-outline { background: transparent; border: 2px solid var(--border); color: var(--foreground); width: auto; padding: 16px; }
        .btn-outline:hover { border-color: var(--primary); color: var(--primary); background: var(--secondary); }

        .feature-row { display: flex; gap: 24px; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--border); flex-wrap: wrap; }
        .feature { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; color: var(--foreground); font-weight: 500; }
        .feature svg { color: var(--primary); }
      `}</style>
      <div className="container">
        <div className="pd-top">

          {/* LEFT: Images */}
          <div className="pd-left">
            <div className="pd-thumbs">
              {thumbs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={active === img ? "active" : ""}
                  onClick={() => setActive(img)}
                  alt=""
                />
              ))}
            </div>

            <div
              className="pd-main-img"
              ref={imgBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetZoom}
            >
              <span className="zoom-hint">Hover to zoom</span>
              <img ref={imgRef} src={active} alt={product.name} />
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="pd-info">
            <div className="pd-meta">
              <span>Code: {product.sku || product.id}</span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={14} fill="#fbbf24" stroke="none" /> {product.rating || "4.8"} ({product.reviews || 12} reviews)
              </span>
            </div>

            <h1>{product.name}</h1>

            <div className="price-row">
              <span className="price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="old-price">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="desc">{product.description || "Authentic elampillai saree woven with traditional patterns and premium threads. Perfect for festivals and special occasions."}</p>

            <div className="actions">
              <button className="btn btn-whatsapp" onClick={handleWhatsapp}>
                <MessageCircle size={20} /> Order on WhatsApp
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className={`btn btn-primary ${added ? "opacity-90" : ""}`}
                  onClick={handleAddCart}
                  style={{ flex: 1 }}
                >
                  {added ? <><Check size={18} /> Added to Cart</> : "Add to Cart"}
                </button>

                <button className="btn btn-outline" onClick={handleWishlist} title="Add to Wishlist">
                  <Heart size={20} fill={isWishlisted ? "var(--primary)" : "none"} stroke={isWishlisted ? "none" : "currentColor"} />
                </button>

                <button className="btn btn-outline" onClick={handleShare} title="Share">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature"><Truck size={18} /> Free Shipping</div>
              <div className="feature"><Check size={18} /> Authentic Handloom</div>
              <div className="feature"><Check size={18} /> Best Price</div>
            </div>
          </div>
        </div>
      </div>
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
      />
    </div>
  );
}
