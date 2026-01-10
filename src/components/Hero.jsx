import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import hero1 from "../assets/Powerloom/MaronGreenGold.jpeg";
import hero2 from "../assets/Powerloom/PinkDarkBlue.jpeg";
import hero3 from "../assets/Powerloom/VioletSilver.jpeg";
import hero4 from "../assets/Powerloom/BlackGreen.jpeg";
import hero5 from "../assets/Powerloom/OrangePinkGreen.jpeg";
import hero6 from "../assets/Powerloom/PrupleSilver.jpeg";

const slides = [
  {
    image: hero1,
    subtitle: "The Elite Collection",
    title: "Timeless Elegance of Elampillai",
    desc: "Handcrafted with passion, woven with tradition. Experience the luxury of authentic silk.",
    color: "#9f1239", // Deep Rose
  },
  {
    image: hero2,
    subtitle: "New Arrivals",
    title: "Weaving Stories in Silk",
    desc: "Every thread tells a story of heritage and artistry. Perfect for your special moments.",
    color: "#d97706", // Gold
  },
  {
    image: hero3,
    subtitle: "Festival Special",
    title: "Grace in Every Fold",
    desc: "Graceful sarees for poojas, festivals, engagements, and celebrations, designed for comfort with a traditional touch.",
    color: "#1e3a8a", // Royal Blue
  },
  {
    image: hero4,
    subtitle: "Office Wear & Daily Wear Sarees",
    title: "Timeless Elegance of Elampillai",
    desc: "Lightweight handloom & powerloom sarees ideal for office and daily wear, with breathable fabrics and subtle designs.",
    color: "#9f1239", // Deep Rose
  },
  {
    image: hero5,
    subtitle: "Group Wear & Gift Sarees",
    title: "Timeless Elegance of Elampillai",
    desc: "Perfect for family functions, group events, return gifts, and bulk gifting, with matching designs and consistent quality.",
    color: "#9f1239", // Deep Rose
  },
  {
    image: hero6,
    subtitle: "Trendy Sarees for Modern Girls",
    title: "Timeless Elegance of Elampillai",
    desc: "Stylish Elampillai sarees for modern and trendy girls—soft fabrics, fresh colours, minimal borders, and elegant designs that make you look pretty, confident, and graceful in saree.",
    color: "#9f1239", // Deep Rose
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="hero-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;700&display=swap');

        .hero-section {
          position: relative;
          height: 70vh;
          min-height: 500px;
          max-height: 800px;
          width: 100%;
          overflow: hidden;
          background: #000;
          color: white;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .slide-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.95; /* Almost full brightness */
        }

        /* Gradient only where text is to ensure readability without darkening the whole image */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 50%, rgba(0,0,0,0.5) 0%, transparent 60%); 
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .subtitle {
          font-family: 'Great Vibes', cursive;
          color: #fbbf24 !important; /* Force Amber Gold */
          font-size: 3.5rem;
          margin-bottom: 0rem;
          display: inline-block;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Stronger shadow for contrast */
          font-weight: 400;
          letter-spacing: 2px;
        }

        .title {
          font-family: 'Cinzel', serif; /* Cinematic/Story Title */
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          max-width: 900px;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .desc {
          font-family: 'Playfair Display', serif; /* Elegant serif for body */
          font-style: italic;
          font-size: 1.3rem;
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 3rem;
          color: rgba(255,255,255,0.95);
          font-weight: 400;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .title { font-size: 2.8rem; }
          .subtitle { font-size: 2rem; }
          .hero-content { padding: 0 24px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions button { width: 100%; }
        }

        .btn-hero-primary {
          padding: 18px 40px;
          background: white;
          color: black;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          font-family: var(--font-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.3);
        }

        .btn-hero-secondary {
          padding: 18px 40px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          color: white;
          font-weight: 600;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.4);
          cursor: pointer;
          font-size: 0.95rem;
          font-family: var(--font-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
        }
        .btn-hero-secondary:hover {
          background: white;
          color: black;
          border-color: white;
        }

        .indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 12px;
        }
        .dot {
          width: 60px;
          height: 4px;
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .dot-fill {
          position: absolute;
          top: 0; left: 0; height: 100%;
          background: white;
          width: 0%;
        }
        .dot.active .dot-fill {
          width: 100%;
          transition: width 6s linear;
        }
      `}</style>

      <AnimatePresence>
        <motion.div
          key={index}
          className="slide-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Ken Burns Effect */}
          <motion.img
            src={slide.image}
            alt={slide.title}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-overlay" />

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="subtitle"
            >
              {slide.subtitle}
            </motion.span>

            <h1 className="title">
              {slide.title.split(" ").map((word, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}>{word}</span>
              ))}
            </h1>

            <p className="desc">{slide.desc}</p>

            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={() => navigate("/sarees")}>
                Shop Collection <ArrowRight size={20} />
              </button>
              <button
                className="btn-hero-secondary"
                onClick={() => window.open("https://wa.me/919384442434", "_blank")}
              >
                Chat on WhatsApp <MessageCircle size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="indicators">
        {slides.map((_, i) => (
          <div key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}>
            {i === index && <div className="dot-fill" />}
          </div>
        ))}
      </div>
    </section>
  );
}
