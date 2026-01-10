import { Lock, User, MapPin, ShieldCheck, Package } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Checkout({ cart = [] }) {
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
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

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
    return true;
  };

  const sendToWhatsApp = async () => {
    if (!validateForm()) return;
    
    setIsGenerating(true);

    let message = `🛍 *New Order Request*\n\n*Order Summary:*\n`;
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*TOTAL: ₹${total.toLocaleString()}*\n----------------------------\n📍 *Delivery Details*\n`;
    message += `Name: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\n`;
    message += `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pin}\n\nPlease confirm my order! ✅`;

    const whatsappNumber = "919384442434";

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Failed to generate image");

        let clipboardCopied = false;

        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            clipboardCopied = true;
          } catch (e) {
            console.warn("Clipboard failed:", e);
          }
        }

        setTimeout(() => {
          window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
          setIsGenerating(false);

          if (clipboardCopied) {
            const notif = document.createElement('div');
            notif.innerHTML = `
              <div style="position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:24px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:10000;max-width:380px;animation:slideIn 0.3s ease">
                <div style="display:flex;align-items:start;gap:14px">
                  <div style="font-size:32px">✅</div>
                  <div>
                    <div style="font-weight:700;margin-bottom:8px;font-size:16px">Invoice Copied to Clipboard!</div>
                    <div style="font-size:14px;opacity:0.95;line-height:1.5">
                      <strong>Next step:</strong> In WhatsApp, click the <strong>📎 attach</strong> icon, paste the invoice (Ctrl+V / Cmd+V), then send your message!
                    </div>
                  </div>
                </div>
              </div>
              <style>@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}</style>
            `;
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 7000);
          } else {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Invoice_${Date.now()}.png`;
            link.click();
            URL.revokeObjectURL(url);
            
            const notif = document.createElement('div');
            notif.innerHTML = `
              <div style="position:fixed;top:20px;right:20px;background:#3b82f6;color:white;padding:24px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:10000;max-width:380px;animation:slideIn 0.3s ease">
                <div style="display:flex;align-items:start;gap:14px">
                  <div style="font-size:32px">📥</div>
                  <div>
                    <div style="font-weight:700;margin-bottom:8px;font-size:16px">Invoice Downloaded!</div>
                    <div style="font-size:14px;opacity:0.95;line-height:1.5">
                      <strong>Next step:</strong> In WhatsApp, click <strong>📎 attach</strong> → <strong>Gallery/Files</strong> → select the downloaded invoice and send!
                    </div>
                  </div>
                </div>
              </div>
              <style>@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}</style>
            `;
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 7000);
          }
        }, 300);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
      setIsGenerating(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* HIDDEN INVOICE */}
      <div ref={receiptRef} style={styles.receipt}>
        <div style={styles.receiptHeader}>
          <h1 style={styles.receiptTitle}>Elampillai Sarees</h1>
          <p style={styles.receiptSubtitle}>Order Invoice</p>
          <p style={styles.receiptDate}>Date: {new Date().toLocaleDateString('en-IN')}</p>
          <p style={styles.invoiceNumber}>Invoice #INV-{Date.now().toString().slice(-6)}</p>
        </div>
        <div style={styles.receiptDivider} />
        <div style={styles.receiptSection}>
          <h3 style={styles.sectionTitle}>Order Items</h3>
          {cartItems.map(item => (
            <div key={item.id} style={styles.receiptItemRow}>
              <div style={styles.receiptItemLeft}>
                <img src={item.image} alt={item.name} style={styles.receiptItemImage} crossOrigin="anonymous" />
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemCategory}>{item.category || 'Saree'}</div>
                  <div style={styles.itemQty}>Quantity: {item.quantity} × ₹{item.price.toLocaleString()}</div>
                </div>
              </div>
              <div style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div style={styles.receiptDivider} />
        <div style={styles.receiptTotals}>
          <div style={styles.totalRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div style={styles.totalRow}><span>Tax (5%)</span><span>₹{tax.toLocaleString()}</span></div>
          <div style={{...styles.totalRow, ...styles.grandTotal}}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
        </div>
        <div style={styles.receiptDivider} />
        <div style={styles.receiptSection}>
          <h3 style={styles.sectionTitle}>Delivery Address</h3>
          <div style={styles.addressBox}>
            <p style={styles.addressText}>
              <strong>{form.firstName} {form.lastName}</strong><br />
              {form.address}<br />
              {form.city}, {form.state} - {form.pin}<br />
              📞 {form.phone}
            </p>
          </div>
        </div>
        <div style={styles.receiptFooter}>
          <p style={styles.footerText}>Thank you for choosing Elampillai Sarees!</p>
          <p style={styles.footerContact}>📞 +91 93844 42434 | 📧 info@elampillaisarees.com</p>
        </div>
      </div>

      {/* MAIN UI */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Complete Your Order</h1>
          <p style={styles.pageSubtitle}>Fill in delivery details to proceed</p>
        </div>
        <div style={styles.checkoutGrid}>
          {/* FORM */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Lock size={24} style={styles.headerIcon} />
              <h2 style={styles.cardTitle}>Delivery Information</h2>
            </div>
            <div style={styles.formContainer}>
              <div style={styles.formSection}>
                <h3 style={styles.formSectionTitle}><User size={18} />Contact Details</h3>
                <div style={styles.inputGrid}>
                  <div><label style={styles.label}>First Name *</label><input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} style={styles.input} /></div>
                  <div><label style={styles.label}>Last Name *</label><input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} style={styles.input} /></div>
                </div>
                <div><label style={styles.label}>Phone *</label><input type="tel" name="phone" placeholder="10-digit number" value={form.phone} onChange={handleChange} style={styles.input} maxLength={10} /></div>
                <div><label style={styles.label}>Email (Optional)</label><input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={styles.input} /></div>
              </div>
              <div style={styles.formSection}>
                <h3 style={styles.formSectionTitle}><MapPin size={18} />Shipping Address</h3>
                <div><label style={styles.label}>Address *</label><input type="text" name="address" placeholder="Street address" value={form.address} onChange={handleChange} style={styles.input} /></div>
                <div style={styles.inputGrid}>
                  <div><label style={styles.label}>City *</label><input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} style={styles.input} /></div>
                  <div><label style={styles.label}>State *</label><input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} style={styles.input} /></div>
                </div>
                <div><label style={styles.label}>PIN Code *</label><input type="text" name="pin" placeholder="6-digit PIN" value={form.pin} onChange={handleChange} style={styles.input} maxLength={6} /></div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div style={styles.card}>
            <h3 style={styles.summaryTitle}><Package size={20} />Order Summary ({cartItems.length})</h3>
            <div style={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                  <div style={styles.cartItemInfo}>
                    <div style={styles.cartItemName}>{item.name}</div>
                    <div style={styles.cartItemMeta}><span>Qty: {item.quantity}</span></div>
                  </div>
                  <div style={styles.cartItemPrice}>₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={styles.summaryDivider} />
            <div style={styles.summaryTotals}>
              <div style={styles.summaryRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div style={styles.summaryRow}><span>Tax</span><span>₹{tax.toLocaleString()}</span></div>
              <div style={{...styles.summaryRow, ...styles.summaryGrandTotal}}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <button onClick={sendToWhatsApp} disabled={isGenerating} style={{...styles.checkoutButton, ...(isGenerating && styles.checkoutButtonDisabled)}}>
              {isGenerating ? <><div style={styles.spinner} />Generating...</> : <><svg style={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Send via WhatsApp</>}
            </button>
            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>💡</div>
              <div style={styles.infoText}>
                <strong>How it works:</strong><br/>
                1️⃣ Click button → WhatsApp opens<br/>
                2️⃣ Click 📎 attach → Paste invoice (Ctrl+V)<br/>
                3️⃣ Send message ✅
              </div>
            </div>
            <div style={styles.securityBadge}><ShieldCheck size={16} /><span>Secure Payment</span></div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@media(max-width:968px){.checkout-grid{grid-template-columns:1fr!important}}input:focus{border-color:#667eea!important;box-shadow:0 0 0 3px rgba(102,126,234,0.1)!important}`}</style>
    </div>
  );
}

const styles = {
  container: {minHeight:'100vh',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',padding:'2rem 1rem',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'},
  receipt: {position:'absolute',left:'-9999px',width:'900px',backgroundColor:'#fff',padding:'50px',fontFamily:'Arial,sans-serif'},
  receiptHeader: {textAlign:'center',marginBottom:'30px',borderBottom:'3px solid #667eea',paddingBottom:'20px'},
  receiptTitle: {fontSize:'36px',fontWeight:'bold',color:'#667eea',margin:'0 0 8px 0'},
  receiptSubtitle: {fontSize:'20px',color:'#4a5568',margin:'0 0 8px 0'},
  receiptDate: {fontSize:'14px',color:'#718096',margin:'4px 0'},
  invoiceNumber: {fontSize:'14px',color:'#718096',fontWeight:'bold',margin:'4px 0 0 0'},
  receiptDivider: {height:'2px',backgroundColor:'#e2e8f0',margin:'25px 0'},
  receiptSection: {marginBottom:'25px'},
  sectionTitle: {fontSize:'20px',fontWeight:'bold',color:'#2d3748',marginBottom:'15px',borderLeft:'4px solid #667eea',paddingLeft:'12px'},
  receiptItemRow: {display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px',marginBottom:'12px',backgroundColor:'#f7fafc',borderRadius:'8px',border:'1px solid #e2e8f0'},
  receiptItemLeft: {display:'flex',alignItems:'center',gap:'15px',flex:1},
  receiptItemImage: {width:'90px',height:'90px',objectFit:'cover',borderRadius:'8px',border:'2px solid #e2e8f0'},
  itemName: {fontSize:'18px',fontWeight:'600',color:'#2d3748',marginBottom:'4px'},
  itemCategory: {fontSize:'14px',color:'#718096',marginBottom:'4px'},
  itemQty: {fontSize:'15px',color:'#718096'},
  itemPrice: {fontSize:'20px',fontWeight:'bold',color:'#667eea',minWidth:'130px',textAlign:'right'},
  receiptTotals: {marginTop:'25px',backgroundColor:'#f7fafc',padding:'20px',borderRadius:'8px'},
  totalRow: {display:'flex',justifyContent:'space-between',padding:'10px 0',fontSize:'17px',color:'#4a5568'},
  grandTotal: {fontSize:'24px',fontWeight:'bold',color:'#1a202c',paddingTop:'15px',borderTop:'3px solid #667eea',marginTop:'10px'},
  addressBox: {backgroundColor:'#f7fafc',border:'2px solid #e2e8f0',borderRadius:'8px',padding:'20px'},
  addressText: {fontSize:'16px',lineHeight:'1.8',color:'#4a5568',margin:0},
  receiptFooter: {textAlign:'center',marginTop:'40px',paddingTop:'25px',borderTop:'3px solid #667eea'},
  footerText: {fontSize:'18px',fontWeight:'bold',color:'#667eea',margin:'0 0 8px 0'},
  footerContact: {fontSize:'14px',color:'#718096',margin:'8px 0'},
  mainContent: {maxWidth:'1400px',margin:'0 auto'},
  header: {textAlign:'center',marginBottom:'3rem'},
  pageTitle: {fontSize:'2.5rem',fontWeight:'bold',color:'white',marginBottom:'0.5rem',textShadow:'0 2px 4px rgba(0,0,0,0.1)'},
  pageSubtitle: {fontSize:'1.1rem',color:'rgba(255,255,255,0.9)'},
  checkoutGrid: {display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'2rem',alignItems:'start',className:'checkout-grid'},
  card: {backgroundColor:'white',borderRadius:'20px',padding:'2rem',boxShadow:'0 20px 25px -5px rgba(0,0,0,0.1)'},
  cardHeader: {display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1.5rem',paddingBottom:'1rem',borderBottom:'2px solid #f7fafc'},
  headerIcon: {color:'#667eea'},
  cardTitle: {fontSize:'1.5rem',fontWeight:'bold',color:'#1a202c',margin:0},
  formContainer: {display:'flex',flexDirection:'column',gap:'2rem'},
  formSection: {display:'flex',flexDirection:'column',gap:'1rem'},
  formSectionTitle: {display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'1.125rem',fontWeight:'600',color:'#2d3748',marginBottom:'0.5rem'},
  label: {display:'block',fontSize:'0.875rem',fontWeight:'600',color:'#4a5568',marginBottom:'0.5rem'},
  inputGrid: {display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'},
  input: {width:'100%',padding:'0.75rem 1rem',fontSize:'1rem',border:'2px solid #e2e8f0',borderRadius:'8px',outline:'none',transition:'all 0.2s',boxSizing:'border-box'},
  summaryTitle: {display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'1.25rem',fontWeight:'bold',color:'#1a202c',marginBottom:'1.5rem'},
  cartItems: {display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'1rem'},
  cartItem: {display:'flex',gap:'1rem',alignItems:'center',padding:'1rem',backgroundColor:'#f7fafc',borderRadius:'8px'},
  cartItemImage: {width:'60px',height:'60px',objectFit:'cover',borderRadius:'8px',border:'2px solid #e2e8f0'},
  cartItemInfo: {flex:1},
  cartItemName: {fontSize:'1rem',fontWeight:'600',color:'#2d3748',marginBottom:'0.25rem'},
  cartItemMeta: {fontSize:'0.875rem',color:'#718096'},
  cartItemPrice: {fontSize:'1rem',fontWeight:'bold',color:'#667eea',whiteSpace:'nowrap'},
  summaryDivider: {height:'1px',backgroundColor:'#e2e8f0',margin:'1.5rem 0'},
  summaryTotals: {display:'flex',flexDirection:'column',gap:'0.75rem'},
  summaryRow: {display:'flex',justifyContent:'space-between',fontSize:'1rem',color:'#4a5568'},
  summaryGrandTotal: {fontSize:'1.25rem',fontWeight:'bold',color:'#1a202c',paddingTop:'0.75rem',borderTop:'2px solid #2d3748',marginTop:'0.5rem'},
  checkoutButton: {width:'100%',padding:'1rem',marginTop:'1.5rem',fontSize:'1.125rem',fontWeight:'bold',color:'white',backgroundColor:'#25D366',border:'none',borderRadius:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',transition:'all 0.2s',boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'},
  checkoutButtonDisabled: {backgroundColor:'#9ca3af',cursor:'not-allowed',opacity:0.7},
  whatsappIcon: {width:'24px',height:'24px'},
  spinner: {width:'20px',height:'20px',border:'3px solid rgba(255,255,255,0.3)',borderTop:'3px solid white',borderRadius:'50%',animation:'spin 1s linear infinite'},
  infoBox: {display:'flex',gap:'12px',marginTop:'1.5rem',padding:'1rem',backgroundColor:'#eff6ff',borderRadius:'8px',border:'1px solid #dbeafe'},
  infoIcon: {fontSize:'1.5rem'},
  infoText: {fontSize:'0.875rem',color:'#1e40af',lineHeight:'1.5'},
  securityBadge: {display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',marginTop:'1rem',padding:'0.75rem',backgroundColor:'#f0fdf4',borderRadius:'8px',fontSize:'0.875rem',color:'#15803d',fontWeight:'600'},
};