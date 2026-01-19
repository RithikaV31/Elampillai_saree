import { Lock, User, MapPin, ShieldCheck, Package, ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

export default function Checkout({ cart = [], onRemove, onUpdateQty }) {
  const receiptRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    email: "",
  });

  // Use cart from props or demo data
  const cartItems = cart.length > 0 ? cart : [
    {
      id: 1,
      name: "Kanchipuram Silk Saree",
      price: 8500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      category: "Silk Sarees"
    }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Tax removed as per request
  // Shipping is calculated by location
  const total = subtotal;

  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "pin", "phone"];
    const isMissing = requiredFields.some(field => !form[field] || form[field].trim() === "");

    if (isMissing) {
      alert("⚠️ Please fill in all delivery details.");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      alert("⚠️ Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!/^\d{6}$/.test(form.pin)) {
      alert("⚠️ Please enter a valid 6-digit PIN code.");
      return false;
    }
    if (form.email && form.email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("⚠️ Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const sendToWhatsApp = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);

    // Hardcoded number as per request
    const whatsappNumber = "919384442434";

    try {
      // 1. Generate Image
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Failed to generate image");

        const file = new File([blob], "order_invoice.png", { type: "image/png" });

        // 1. Try Web Share API (Mobile - Best Experience)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Order Invoice',
              text: 'Order Receipt'
            });
            setIsGenerating(false);
            return; // Stop here if share worked
          } catch (err) {
            console.warn("Share failed, trying clipboard...", err);
          }
        }

        // 2. Try Clipboard (Desktop - Better than download)
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            showNotification('Invoice Copied! 📋', 'Simply Paste (Ctrl+V) in WhatsApp chat', 'success');

            // Open WhatsApp after copy
            setTimeout(() => {
              window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}`, '_blank');
              setIsGenerating(false);
            }, 1000);
            return;
          }
        } catch (err) {
          console.warn("Clipboard failed, falling back to download", err);
        }

        // 3. Fallback: Download Image (Universal Support)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Invoice_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showNotification('Receipt Downloaded! 📥', 'Please attach the downloaded image in WhatsApp', 'info');

        // Open WhatsApp after download
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}`, '_blank');
          setIsGenerating(false);
        }, 1000);

      }, 'image/png');
    } catch (err) {
      console.error(err);
      alert("Failed to generate receipt. Please try again.");
      setIsGenerating(false);
    }
  };

  const showNotification = (title, msg, type) => {
    const notif = document.createElement('div');
    const color = type === 'success' ? '#10b981' : '#3b82f6';
    const icon = type === 'success' ? '✅' : '📥';

    notif.innerHTML = `
      <div style="position:fixed;top:20px;right:20px;background:${color};color:white;padding:20px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:10000;max-width:90vw;width:380px;animation:slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)">
        <div style="display:flex;align-items:start;gap:14px">
          <div style="font-size:28px">${icon}</div>
          <div>
            <div style="font-weight:700;margin-bottom:6px;font-size:16px">${title}</div>
            <div style="font-size:14px;opacity:0.95;line-height:1.4">${msg}</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateY(-20px)';
      setTimeout(() => notif.remove(), 500);
    }, 5000);
  };

  return (
    <div className="checkout-page">
      {/* --- HIDDEN INVOICE GENERATOR (Inline styles preserved for canvas accuracy) --- */}
      <div ref={receiptRef} style={receiptStyles.receipt}>
        <div style={receiptStyles.receiptHeader}>
          <h1 style={receiptStyles.receiptTitle}>Elampillai Sarees</h1>
          <p style={receiptStyles.receiptSubtitle}>Order Invoice & Receipt</p>
          <div style={receiptStyles.headerMeta}>
            <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
            <p>Invoice #INV-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
        <div style={receiptStyles.receiptDivider} />

        <div style={receiptStyles.receiptSection}>
          <h3 style={receiptStyles.sectionTitle}>Items Ordered</h3>
          {cartItems.map(item => (
            <div key={item.id} style={receiptStyles.receiptItemRow}>
              <div style={receiptStyles.receiptItemLeft}>
                {/* CrossOrigin required for local canvas generation if using external images */}
                <img src={item.image} alt="product" style={receiptStyles.receiptItemImage} crossOrigin="anonymous" />
                <div style={{ marginLeft: '15px' }}>
                  <div style={receiptStyles.itemName}>{item.name}</div>
                  <div style={receiptStyles.itemCategory}>{item.category || 'Silk Saree'}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={receiptStyles.itemPrice}>₹{item.price.toLocaleString()}</div>
                <div style={receiptStyles.itemQty}>Qty: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={receiptStyles.receiptDivider} />

        <div style={receiptStyles.receiptTotals}>
          <div style={receiptStyles.totalRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div style={receiptStyles.totalRow}>
            <span>Shipping</span>
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>Based on location</span>
          </div>
          <div style={{ ...receiptStyles.totalRow, ...receiptStyles.grandTotal }}>
            <span>Total (Excl. Shipping)</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div style={receiptStyles.receiptDivider} />

        <div style={receiptStyles.receiptSection}>
          <h3 style={receiptStyles.sectionTitle}>Shipping To</h3>
          <div style={receiptStyles.addressBox}>
            <p style={receiptStyles.addressText}>
              <strong>{form.firstName || 'Customer'} {form.lastName}</strong><br />
              {form.address || 'Address Line 1'}<br />
              {form.city}{form.city && ','} {form.state} {form.pin && `- ${form.pin}`}<br />
              Phone: {form.phone}
            </p>
          </div>
        </div>

        <div style={receiptStyles.receiptFooter}>
          <p style={receiptStyles.footerText}>Thank you for shopping with us!</p>
          <p style={receiptStyles.footerContact}>www.instagram.com/elampillai_nesavaalar</p>
        </div>
      </div>
      {/* --- END HIDDEN INVOICE --- */}


      {/* --- MAIN UI --- */}
      <div className="container">

        <div className="page-header">
          <h1 className="main-title">Checkout</h1>
          <p className="main-subtitle">Complete your purchase safely</p>
        </div>

        <div className="checkout-layout">

          {/* Left Column: Form */}
          <div className="checkout-column form-column">
            <div className="card form-card">
              <div className="card-header">
                <div className="icon-wrapper"><User size={20} /></div>
                <h2>Contact Information</h2>
              </div>

              <div className="form-grid">
                <div className="form-group half-width">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="e.g. Priya" />
                </div>
                <div className="form-group half-width">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="e.g. Sharma" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} maxLength={10} placeholder="10-digit mobile number" />
                </div>
                <div className="form-group">
                  <label>Email Address (Optional)</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="For order updates" />
                </div>
              </div>
            </div>

            <div className="card form-card">
              <div className="card-header">
                <div className="icon-wrapper"><MapPin size={20} /></div>
                <h2>Shipping Address</h2>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Door No, Street Name" />
                </div>
                <div className="form-group half-width">
                  <label>City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Salem" />
                </div>
                <div className="form-group half-width">
                  <label>State</label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="e.g. Tamil Nadu" />
                </div>
                <div className="form-group half-width">
                  <label>PIN Code</label>
                  <input type="tel" name="pin" value={form.pin} onChange={handleChange} maxLength={6} placeholder="6-digit PIN" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-column summary-column">
            <div className="card summary-card sticky-sidebar">
              <div className="card-header">
                <div className="icon-wrapper"><Package size={20} /></div>
                <h2>Order Summary</h2>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-img-box">
                      <img src={item.image} alt={item.name} />
                      <span className="item-qtyBadge">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-variant">{item.category}</p>
                      {onUpdateQty && (
                        <div className="qty-controls">
                          <button
                            className="qty-btn"
                            disabled={item.quantity <= 1}
                            onClick={() => onUpdateQty(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQty(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                      <div className="item-price">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      {onRemove && (
                        <button
                          onClick={() => onRemove(item.id)}
                          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "4px" }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="price-row">
                  <span>Shipping</span>
                  <span style={{ fontSize: "0.85rem", color: "#666", fontStyle: "italic" }}>
                    Based on location
                  </span>
                </div>

                <div className="price-row total-row">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                className={`checkout-btn ${isGenerating ? 'loading' : ''}`}
                onClick={sendToWhatsApp}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="spinner"></span>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="whatsapp-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                )}
                {isGenerating ? 'Processing...' : 'Place Order on WhatsApp'}
              </button>

              <div className="secure-badge">
                <ShieldCheck size={16} /> Secure checkout via WhatsApp
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* --- STYLES --- */}
      <style>{`
        /* Use CSS Variables from Globals if available, else fallbacks */
        :root {
            --primary: var(--primary-color, #C17D4C);
            --primary-dark: var(--secondary-color, #8B4513);
            --bg-page: var(--bg-light, #F8F6F3);
            --text-main: var(--text-dark, #2C2C2C);
        }

        .checkout-page {
            min-height: 100vh;
            background-color: var(--bg-page);
            padding: 2rem 0 4rem;
            font-family: 'Inter', sans-serif;
        }

        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .main-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            color: var(--text-main);
            margin-bottom: 0.5rem;
        }

        .main-subtitle {
            color: #666;
            font-size: 1.1rem;
        }

        /* Grid Layout */
        .checkout-layout {
            display: grid;
            grid-template-columns: 1.5fr 1fr; /* Form takes more space */
            gap: 2.5rem;
            align-items: start;
        }

        /* Responsive Breakpoint */
        @media (max-width: 968px) {
            .checkout-layout {
                grid-template-columns: 1fr;
            }
            .checkout-column.form-column {
                order: 2; /* Usually showing summary first is good in e-comm, but form is better for data entry. Let's keep DOM order: Form first. */
                order: 1; 
            }
            .checkout-column.summary-column {
                order: 2;
                margin-bottom: 2rem;
            }
        }

        @media (max-width: 600px) {
            .main-title { font-size: 2rem; }
            .checkout-page { padding: 1rem 0; }
            .form-grid { grid-template-columns: 1fr !important; }
            .half-width { grid-column: span 1 !important; }
        }

        /* Cards */
        .card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
            margin-bottom: 2rem;
            border: 1px solid rgba(0,0,0,0.03);
            transition: transform 0.2s;
        }
        
        .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }

        .card-header h2 {
            font-size: 1.25rem;
            margin: 0;
            color: var(--text-main);
            font-weight: 600;
        }

        .icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: rgba(193, 125, 76, 0.1); /* Based on primary color */
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Forms */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .form-group.half-width {
            grid-column: span 1;
        }
        
        /* Make full width on mobile handled by media query above or helper class */
        @media (max-width: 600px) {
             .form-grid { display: flex; flex-direction: column; }
        }

        .form-group label {
            font-size: 0.9rem;
            font-weight: 500;
            color: #555;
        }

        .form-group input {
            padding: 0.8rem 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.2s;
            outline: none;
            background: #f9fafb;
        }

        .form-group input:focus {
            border-color: var(--primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(193, 125, 76, 0.1);
        }

        /* Summary Area */
        .summary-item {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px dashed #eee;
        }

        .item-img-box {
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 8px;
            overflow: visible;
        }

        .item-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #eee;
        }

        .item-qtyBadge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #555;
            color: white;
            font-size: 0.75rem;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .item-details { flex: 1; }
        .item-details h4 { font-size: 0.95rem; margin: 0 0 0.25rem 0; color: #333; }
        .item-variant { font-size: 0.85rem; color: #777; margin: 0; }
        .item-price { font-weight: 600; color: var(--text-main); }

        .price-breakdown { display: flex; flex-direction: column; gap: 0.8rem; margin: 1.5rem 0; }
        .price-row { display: flex; justify-content: space-between; color: #555; }
        .price-row.total-row {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary-dark);
            border-top: 2px solid #eee;
            padding-top: 1rem;
            margin-top: 0.5rem;
        }

        .checkout-btn {
            width: 100%;
            padding: 1rem;
            background: #25D366; /* WhatsApp Green standard */
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .checkout-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
            filter: brightness(1.05);
        }

        .checkout-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            box-shadow: none;
        }

        .secure-badge {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.85rem;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
        }

        .spinner {
            width: 20px; 
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from{transform:translateY(50px);opacity:0} to{transform:translateY(0);opacity:1} }
        
        .qty-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #f9fafb;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            width: fit-content;
            margin-top: 8px;
        }
        .qty-btn {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: var(--text-main);
            padding: 2px;
        }
        .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .qty-val { font-weight: 600; font-size: 0.9rem; min-width: 16px; text-align: center; }

      `}</style>
    </div>
  );
}

// Inline Styles specifically for HTML2Canvas Image Generation
// Kept separate to ensure the exported image looks consistent regardless of screen size
const receiptStyles = {
  receipt: {
    position: 'absolute',
    left: '-9999px',
    top: 0,
    width: '800px', // Fixed width for image generation
    padding: '40px',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#333'
  },
  receiptHeader: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '4px solid #C17D4C',
    paddingBottom: '20px'
  },
  receiptTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#C17D4C',
    margin: '0 0 10px 0',
    fontFamily: 'serif' // Using serif for the brand feel
  },
  receiptSubtitle: {
    fontSize: '18px',
    color: '#666',
    margin: 0
  },
  headerMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    color: '#888',
    fontSize: '14px'
  },
  receiptDivider: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '20px 0'
  },
  receiptSection: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: '15px',
    borderLeft: '4px solid #C17D4C',
    paddingLeft: '10px'
  },
  receiptItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px dashed #eee'
  },
  receiptItemLeft: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  receiptItemImage: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #eee'
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px'
  },
  itemCategory: {
    fontSize: '13px',
    color: '#777'
  },
  itemPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#C17D4C'
  },
  itemQty: {
    fontSize: '13px',
    color: '#777',
    marginTop: '4px'
  },
  receiptTotals: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '15px',
    color: '#555'
  },
  grandTotal: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#C17D4C',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '2px solid #ddd',
    marginBottom: 0
  },
  addressBox: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  addressText: {
    lineHeight: '1.6',
    margin: 0,
    fontSize: '15px',
    color: '#444'
  },
  receiptFooter: {
    marginTop: '30px',
    textAlign: 'center',
    color: '#888',
    fontSize: '14px'
  },
  footerText: {
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  footerContact: {
    margin: 0,
    color: '#C17D4C'
  }
};