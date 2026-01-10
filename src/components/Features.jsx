import { Truck, ShieldCheck, Undo2, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={32} />,
    title: "Free Shipping",
    desc: "On orders above ₹2,999"
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Authentic Products",
    desc: "100% genuine handcrafted sarees"
  },
  {
    icon: <Undo2 size={32} />,
    title: "Easy Returns",
    desc: "7-day hassle-free returns"
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    desc: "Dedicated customer service"
  }
];

function Features() {
  return (
    <section className="features-section">
      <style>{`
        .features-section {
          padding: 1rem 0.5rem; /* Minimal padding */
          background-color: var(--secondary);
          border-top: 1px solid var(--border);
        }
        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* 2x2 Grid */
          gap: 0.5rem; /* Tight gap */
        }
        @media (min-width: 1024px) {
          .features-container { grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 2rem; }
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s;
          border: 1px solid transparent;
        }

        .feature-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          margin-bottom: 0.75rem;
          transition: background 0.3s, color 0.3s;
        }
        .feature-card:hover .feature-icon-wrapper {
          background: var(--primary);
          color: white;
        }

        .feature-title {
          font-family: var(--font-secondary);
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 0.25rem;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: var(--muted-foreground);
          line-height: 1.5;
        }
      `}</style>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
