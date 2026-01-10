import { useState, useRef } from 'react';
import { X, MessageCircle, MapPin, User, Phone } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function OrderModal({ isOpen, onClose, product, quantity = 1 }) {
  const receiptRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    notes: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- HYBRID WHATSAPP LOGIC ---------------- */
  const handleSend = async () => {
    const { name, mobile, address, notes } = formData;

    if (!name || !mobile) {
      alert("Please enter your name and mobile number.");
      return;
    }
    setIsGenerating(true);

    const messageBase = `
*New Order Request*
------------------
*Product:* ${product.name} (ID: ${product.id})
*Price:* ₹${product.price}
*Quantity:* ${quantity}
------------------
*Customer Details:*
Name: ${name}
Mobile: ${mobile}
Address: ${address || 'N/A'}
Notes: ${notes || 'N/A'}
------------------
Please confirm availability.`.trim();

    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });

        canvas.toBlob(async (blob) => {
          if (!blob) {
            const whatsappUrl = `https://wa.me/919384442434?text=${encodeURIComponent(messageBase)}`;
            window.location.href = whatsappUrl;
            onClose();
            setIsGenerating(false);
            return;
          }

          const file = new File([blob], "product_inquiry.png", { type: "image/png" });

          // STRATEGY A: Web Share API (Mobile)
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: 'Product Inquiry',
                text: messageBase
              });
              onClose();
              setIsGenerating(false);
              return;
            } catch (shareErr) {
              console.log("Share cancelled/failed", shareErr);
            }
          }

          // STRATEGY B: Clipboard Copy (Desktop)
          try {
            if (navigator.clipboard && navigator.clipboard.write) {
              await navigator.clipboard.write([
                new ClipboardItem({
                  [blob.type]: blob
                })
              ]);

              const confirmMsg = confirm("📸 Image Copied to Clipboard!\n\n1. Click OK to open WhatsApp.\n2. Paste (Ctrl+V) the image in the chat.");
              if (confirmMsg) {
                const whatsappUrl = `https://wa.me/919384442434?text=${encodeURIComponent(messageBase)}`;
                window.location.href = whatsappUrl;
                onClose();
              }
            } else {
              throw new Error("Clipboard API not supported");
            }
          } catch (clipErr) {
            console.error("Clipboard failed", clipErr);
            // STRATEGY C: Text Fallback
            const whatsappUrl = `https://wa.me/919384442434?text=${encodeURIComponent(messageBase)}`;
            window.location.href = whatsappUrl;
            onClose();
          }

          setIsGenerating(false);

        }, 'image/png');

      } catch (err) {
        console.error("Canvas failed", err);
        const whatsappUrl = `https://wa.me/919384442434?text=${encodeURIComponent(messageBase)}`;
        window.location.href = whatsappUrl;
        onClose();
        setIsGenerating(false);
      }
    } else {
      // No ref? Just text
      const whatsappUrl = `https://wa.me/919384442434?text=${encodeURIComponent(messageBase)}`;
      window.location.href = whatsappUrl;
      onClose();
      setIsGenerating(false);
    }
  };

  return (
    <div className="order-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        .order-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 99999;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-card {
          background: white;
          width: 90%;
          max-width: 400px; /* Reduced width */
          border-radius: 20px;
          padding: 24px; /* Reduced padding */
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          border: 1px solid var(--border);
          animation: slideUp 0.3s ease-out;
        }
        .modal-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .modal-title {
          font-family: var(--font-secondary);
          font-size: 24px; /* Smaller title */
          color: var(--primary);
          margin-bottom: 6px;
          font-weight: 700;
        }
        .modal-sub {
          font-size: 13px;
          color: var(--muted-foreground);
        }
        
        .input-group {
          margin-bottom: 12px; /* Tighter spacing */
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted-foreground);
          pointer-events: none;
        }
        .input-field {
          width: 100%;
          padding: 10px 12px 10px 40px; /* Compact padding */
          border-radius: 10px;
          border: 1px solid var(--border);
          outline: none;
          font-size: 14px;
          transition: all 0.2s;
          background: var(--muted);
          font-family: var(--font-primary);
        }
        .input-field:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(159, 18, 57, 0.1);
        }
        
        .btn-order {
          width: 100%;
          background: #25D366;
          color: white;
          padding: 12px; /* Smaller button */
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
        .btn-order:hover {
          background: #1faf53;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
        
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: white;
          border: 1px solid var(--border);
          cursor: pointer;
          color: var(--muted-foreground);
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .close-btn:hover { background: var(--muted); color: var(--foreground); transform: rotate(90deg); }
        
        /* HIDDEN RECEIPT */
        .hidden-receipt {
            position: absolute; top: -9999px; left: -9999px; width: 400px;
            background: white; padding: 20px; border: 1px solid #eee;
        }
        .receipt-card { display: flex; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .receipt-img { width: 80px; height: 100px; object-fit: cover; border-radius: 8px; }
      `}</style>

      {/* Hidden Receipt for Generation */}
      <div ref={receiptRef} className="hidden-receipt">
        <h3 style={{ marginBottom: 10, color: 'var(--primary)' }}>Elampillai Sarees - Product Inquiry</h3>
        <div className="receipt-card">
          <img src={product.image} className="receipt-img" alt="" />
          <div>
            <h4>{product.name}</h4>
            <p style={{ color: '#666' }}>Price: ₹{product.price}</p>
          </div>
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          <p><strong>Customer:</strong> {formData.name}</p>
          <p><strong>Mobile:</strong> {formData.mobile}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Note:</strong> {formData.notes}</p>
        </div>
      </div>

      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={20} /></button>

        <div className="modal-header">
          <h2 className="modal-title">Complete Your Order</h2>
          <p className="modal-sub">Please verify your details to proceed to WhatsApp</p>
        </div>

        <div className="input-group">
          <User size={18} className="input-icon" />
          <input
            className="input-field"
            name="name"
            placeholder="Your Name (Required)"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <Phone size={18} className="input-icon" />
          <input
            className="input-field"
            name="mobile"
            placeholder="Mobile Number (Required)"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <MapPin size={18} className="input-icon" />
          <input
            className="input-field"
            name="address"
            placeholder="Delivery Address (Optional)"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <textarea
            className="input-field"
            name="notes"
            placeholder="Any special requests? (Optional)"
            rows="2"
            style={{ paddingLeft: '14px', height: 'auto' }}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div style={{ background: 'var(--muted)', padding: '12px', borderRadius: '12px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--muted-foreground)' }}>Product:</span>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>{product.name}</span>
        </div>

        <button className="btn-order" onClick={handleSend} disabled={isGenerating}>
          {isGenerating ? "Processing..." : <><MessageCircle size={22} /> Send on WhatsApp</>}
        </button>
      </div>
    </div>
  );
}
