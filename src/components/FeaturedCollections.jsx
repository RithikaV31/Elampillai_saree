import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ✅ IMPORT IMAGES */
import weddingImg from "../assets/Home/wedding.jpg";
import festiveImg from "../assets/Home/Festival.jpg";
import officeImg from "../assets/Home/office.jpg";

const collections = [
  {
    image: weddingImg,
    tag: "Premium",
    title: "Wedding Collection",
    description: "Luxurious sarees for your big day",
    large: true,
    link: "/sarees",
  },
  {
    image: festiveImg,
    tag: "Trending",
    title: "Festive Collection",
    description: "Celebrate in style",
    large: false,
    link: "/sarees",
  },
  {
    image: officeImg,
    tag: "New",
    title: "Set Sarees",
    description: "Professional elegance",
    large: false,
    link: "/sarees",
  },
];

function FeaturedCollections() {
  const navigate = useNavigate();

  return (
    <section className="featured-section">
      <style>{`
        .featured-section {
          padding: 2rem 1rem;
          background-color: var(--background);
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-title {
          font-family: var(--font-secondary);
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .section-subtitle {
          font-family: var(--font-primary);
          font-size: 1.15rem;
          color: var(--muted-foreground);
          max-width: 600px;
          margin: 0 auto;
        }

        .collections-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 300px);
          }
        }

        .collection-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow);
        }

        .collection-card.large {
          grid-row: span 2;
        }

        .card-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .collection-card:hover .card-bg {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          color: white;
          transition: background 0.3s;
        }
        .collection-card:hover .card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 60%);
        }

        .card-tag {
          background: var(--primary);
          color: white;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1rem;
          align-self: flex-start;
          letter-spacing: 1px;
        }

        .card-title {
          font-family: var(--font-secondary);
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.1;
          color: white;
        }

        .card-desc {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .btn-text {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          color: white;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease 0.1s;
        }
        .collection-card:hover .btn-text {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="section-header">
        <h2 className="section-title">Trending Collections</h2>
        <p className="section-subtitle">
          Discover the latest styles handpicked for you.
        </p>
      </div>

      <div className="collections-grid">
        {collections.map((item, index) => (
          <motion.div
            key={index}
            className={`collection-card ${item.large ? "large" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(item.link)}
          >
            <img src={item.image} alt={item.title} className="card-bg" />
            <div className="card-overlay">
              <span className="card-tag">{item.tag}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>
              <span className="btn-text">
                Explore Now <ArrowRight size={18} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCollections;
