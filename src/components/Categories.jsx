import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import c1 from "../assets/Handloom/CHandloom.jpg";
import c2 from "../assets/Powerloom/CPowerloom.jpg";
import c3 from "../assets/SilkCotton/CCottonSilk.jpg";
import c4 from "../assets/Cotton/CCotton.jpg";
import c5 from "../assets/DailyWear/CDailyWear.jpg";
import c6 from "../assets/Festival/CFestival.jpg";
import c7 from "../assets/Wedding/CWedding.jpg";
import c8 from "../assets/NewArrivals/CNewArrivals.jpg";

const categories = [
  { name: "Handloom", image: c1 },
  { name: "Powerloom", image: c2 },
  { name: "Silk Cotton", image: c3 },
  { name: "Cotton", image: c4 },
  { name: "Daily Wear", image: c5 },
  { name: "Festival", image: c6 },
  { name: "Wedding", image: c7 },
  { name: "New Arrivals", image: c8 }
];

// Duplicate for infinite loop
const marqueeItems = [...categories, ...categories, ...categories];

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-marquee">
      <style>{`
        .categories-marquee {
          padding: 1rem 0;
          background: white;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        
        .marquee-track {
          display: flex;
          gap: 3rem;
          width: fit-content;
          animation: scroll 40s linear infinite;
        }
        
        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          min-width: 120px;
          transition: transform 0.3s;
        }
        .marquee-item:hover {
          transform: scale(1.05);
        }
        
        .circle-img-wrapper {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary);
          background: white;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .circle-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top; /* Critical fix: Focus on the top (face) */
        }
        
        .cat-name {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--foreground);
          white-space: nowrap;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move by 1/3 since we tripled the list */
        }
        
        /* Mobile adjustment */
        @media (max-width: 768px) {
          .marquee-track { gap: 2rem; animation-duration: 30s; }
          .circle-img-wrapper { width: 100px; height: 100px; }
          .cat-name { font-size: 0.95rem; }
        }
      `}</style>

      <div className="marquee-track">
        {marqueeItems.map((cat, index) => (
          <div
            key={index}
            className="marquee-item"
            onClick={() => navigate(`/sarees?category=${encodeURIComponent(cat.name)}`)}
          >
            <div className="circle-img-wrapper">
              <img src={cat.image} alt={cat.name} className="circle-img" />
            </div>
            <span className="cat-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
