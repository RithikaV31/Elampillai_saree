import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer-section">
      <style>{`
        .footer-section {
          background-color: var(--foreground);
          color: white;
          padding: 4rem 1rem 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .footer-logo {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        .footer-text {
          color: #9ca3af;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
          color: white;
        }
        .social-icon:hover {
          background-color: var(--primary);
        }
        .footer-heading {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: white;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-link {
          color: #9ca3af;
          transition: color 0.3s;
        }
        .footer-link:hover {
          color: var(--primary);
        }
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-item {
          display: flex;
          gap: 1rem;
          color: #9ca3af;
        }
        .contact-icon {
          flex-shrink: 0;
          color: var(--primary);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          color: #6b7280;
          font-size: 0.875rem;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .payment-methods {
          display: flex;
          gap: 1rem;
        }
      `}</style>
      <div className="container-custom">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col">
            <h3 className="footer-logo">Elampillai Sarees</h3>
            <p className="footer-text">
              Authentic handloom and powerloom sarees directly from the weavers of Elampillai. Tradition woven with trust and delivered to your doorstep.
            </p>
            <div className="social-links">
              <a href="https://wa.me/919384442434" className="social-icon">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/elampillai_nesavaalar/" className="social-icon">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/919384442434" className="social-icon">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/sarees" className="footer-link">All Sarees</Link>
              <Link to="/sarees" className="footer-link">Handloom Collection</Link>
              <Link to="/combo" className="footer-link">Wedding Collection</Link>
              <Link to="/about" className="footer-link">Our Story</Link>
              <Link to="/reviews" className="footer-link">Customer Reviews</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <div className="footer-links">
              <Link to="/orders" className="footer-link">Track Order</Link>
              <Link to="/shipping" className="footer-link">Shipping Policy</Link>
              <Link to="/returns" className="footer-link">Returns & Exchange</Link>
              <Link to="/faq" className="footer-link">FAQs</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-list">
              <div className="contact-item">
                <MapPin className="contact-icon" size={20} />
                <span>Thappakuttai, Elampillai,<br />Salem District, Tamil Nadu</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={20} />
                <span>+91 93844 42434</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={20} />
                <span>elampillainesavaalar@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elampillai Sarees. All rights reserved.</p>
          <div className="payment-methods">
            <span>UPI</span>
            <span>GPay</span>
            <span>PhonePe</span>
            <span>Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;