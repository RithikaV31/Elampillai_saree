import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  ChevronDown,
  Instagram,
} from "lucide-react";

export default function ContactUs() {

  return (
    <div className="cu-page">
      <style>{`
        .cu-page { background: var(--background); min-height: 100vh; color: var(--foreground); }
        .cu-hero { text-align: center; padding: 70px 20px 50px; }
        .cu-hero h1 { font-family: var(--font-secondary); font-size: 3rem; margin-bottom: 12px; color: var(--foreground); }
        .cu-hero p { max-width: 650px; margin: auto; color: var(--muted-foreground); font-family: var(--font-primary); }

        .cu-main { max-width: 1200px; margin: auto; padding: 20px 24px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        @media(max-width: 900px) { 
            .cu-main { grid-template-columns: 1fr; padding: 20px 16px 60px; } 
            .cu-hero { padding: 40px 16px 20px; }
            .cu-hero h1 { font-size: 2.2rem; }
        }

        .cu-card { background: white; border-radius: 18px; padding: 24px; display: flex; gap: 16px; border: 1px solid var(--border); transition: .3s; }
        .cu-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(0,0,0,.08); }
        
        .cu-icon { background: var(--muted); padding: 12px; border-radius: 14px; color: var(--primary); display: flex; align-items: center; justify-content: center; height: 50px; width: 50px; }
        
        .cu-btn { margin-top: 14px; background: #25D366; color: white; border: none; padding: 10px 18px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .cu-btn:hover { background: #1faf53; transform: scale(1.05); }

        .cu-dashed { border: 2px dashed var(--border); text-align: center; padding: 20px; border-radius: 16px; background: var(--muted); color: var(--muted-foreground); }

        .cu-form { background: white; border-radius: 22px; padding: 30px; border: 1px solid var(--border); box-shadow: 0 12px 30px rgba(0,0,0,.05); }
        .cu-form h3 { margin-bottom: 24px; font-family: var(--font-secondary); font-size: 1.5rem; color: var(--foreground); }
        
        .cu-input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border); outline: none; transition: border-color 0.2s; font-family: var(--font-primary); font-size: 0.95rem; }
        .cu-input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--muted); }
        
        .cu-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width: 600px) { .cu-row { grid-template-columns: 1fr; } }

        .cu-submit { margin-top: 20px; width: 100%; background: var(--primary); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s; font-size: 1rem; }
        .cu-submit:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(220, 38, 38, 0.2); }

        .cu-faq { max-width: 800px; margin: 0 auto 60px; padding: 0 24px; }
        .cu-faq h2 { text-align: center; margin-bottom: 30px; font-family: var(--font-secondary); font-size: 2rem; color: var(--foreground); }
        .cu-q { background: white; border-radius: 14px; padding: 16px 24px; margin-bottom: 14px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: .25s; }
        .cu-q:hover { border-color: var(--primary); }
        .cu-q span { font-weight: 500; color: var(--foreground); }

        .cu-map { height: 400px; background: #e5e7eb; position: relative; margin-top: 0; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); }
        .cu-map iframe { width: 100%; height: 100%; border: none; }
      `}</style>

      {/* HERO */}
      <section className="cu-hero">
        <h1>Get in Touch</h1>
        <p>
          We are here to help you choose the perfect saree. Reach out for orders,
          wholesale inquiries, or product guidance.
        </p>
      </section>

      {/* MAIN */}
      <section className="cu-main">

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div className="cu-card">
            <div className="cu-icon"><MessageCircle size={24} /></div>
            <div>
              <b style={{ display: 'block', marginBottom: 4, fontSize: '1.1rem' }}>WhatsApp Support</b>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                Chat with Thamo for instant assistance
              </p>
              <a href="https://wa.me/919384442434" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="cu-btn"><MessageCircle size={16} /> Chat on WhatsApp</button>
              </a>
            </div>
          </div>

          <div className="cu-card">
            <div className="cu-icon"><Instagram size={24} /></div>
            <div>
              <b style={{ display: 'block', marginBottom: 4, fontSize: '1.1rem' }}>Instagram</b>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                Follow us for latest updates & trends
              </p>
              <a href="https://www.instagram.com/elampillai_nesavaalar/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="cu-btn" style={{ background: '#E1306C' }}><Instagram size={16} /> Follow on Instagram</button>
              </a>
            </div>
          </div>

          <div className="cu-card">
            <div className="cu-icon"><Phone size={24} /></div>
            <div>
              <b style={{ display: 'block', marginBottom: 4, fontSize: '1.1rem' }}>Call Us</b>
              <p style={{ fontSize: 13, marginBottom: 4, color: "var(--muted-foreground)" }}>Mon–Sat, 9AM to 9PM</p>
              <a href="tel:+919384442434" style={{ textDecoration: 'none' }}>
                <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: '1.1rem' }}>+91 93844 42434</span>
              </a>
            </div>
          </div>

          <div className="cu-card">
            <div className="cu-icon"><Mail size={24} /></div>
            <div>
              <b style={{ display: 'block', marginBottom: 4, fontSize: '1.1rem' }}>Email Support</b>
              <p style={{ fontSize: 14, color: "var(--foreground)" }}>thamotenyson001@gmail.com</p>
            </div>
          </div>

          <div className="cu-card">
            <div className="cu-icon"><MapPin size={24} /></div>
            <div>
              <b style={{ display: 'block', marginBottom: 4, fontSize: '1.1rem' }}>Visit Our Store</b>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                Thappakuttai, Elampillai,<br />Salem District, Tamil Nadu
              </p>
            </div>
          </div>

          <div className="cu-dashed">
            <BadgeCheck size={32} style={{ color: "var(--primary)", marginBottom: 8 }} />
            <p style={{ fontWeight: 600, color: "var(--foreground)" }}>Authorized Handloom Society Member</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Authentic Elampillai Weaves</p>
          </div>
        </div>

        {/* FORM */}
        <div className="cu-form">
          <h3>Send us a message</h3>

          <div className="cu-row">
            <input className="cu-input" placeholder="Your name" />
            <input className="cu-input" placeholder="Your email" />
          </div>

          <div className="cu-row" style={{ marginTop: 14 }}>
            <input className="cu-input" placeholder="Phone number" />
            <select className="cu-input">
              <option>General Inquiry</option>
              <option>Bulk Order</option>
              <option>Reseller Query</option>
            </select>
          </div>

          <textarea
            className="cu-input"
            rows="5"
            placeholder="How can we help you?"
            style={{ marginTop: 14 }}
          />

          <button className="cu-submit">Send Message →</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="cu-faq">
        <h2>Frequently Asked Questions</h2>
        {[
          "Do you ship internationally?",
          "How do I place bulk orders?",
          "Is Cash on Delivery available?",
          "Are these authentic handloom sarees?"
        ].map((q, i) => (
          <div key={i} className="cu-q">
            <span>{q}</span>
            <ChevronDown size={18} color="var(--muted-foreground)" />
          </div>
        ))}
      </section>

      {/* MAP */}
      <section className="container-custom" style={{ marginBottom: 60 }}>
        <div className="cu-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15638.647900407153!2d77.99967265541992!3d11.585724200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe0bef1e0f0a5%3A0x1e3518205566085!2sElampillai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin"
            title="Elampillai Location"
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
