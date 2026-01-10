import { Search, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ✅ IMAGE IMPORTS */
import heroImg from "../assets/OurStory/weaver.jpg";
import m1Img from "../assets/OurStory/m1.jpg";
import m2Img from "../assets/OurStory/m2.jpg";
import m3Img from "../assets/OurStory/m3.jpg";
import m4Img from "../assets/OurStory/m4.jpg";

export default function OurWeavers() {
  const navigate = useNavigate();

  return (
    <div className="weaver-page">

      {/* ================= CSS ================= */}
      <style>{`
        .weaver-page {
          background-color: var(--background);
          color: var(--foreground);
          padding-bottom: 2rem;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: none; }
        }
        .fade { animation: fadeUp .7s ease both; }

        /* ============ HERO ============ */
        .hero {
          max-width: 1200px;
          margin: 20px auto 40px;
          padding: 1rem;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 40px;
          align-items: center;
        }
        @media(max-width: 900px) { .hero { grid-template-columns: 1fr; gap: 30px; } }

        .hero h1 {
          font-size: 2.5rem;
          line-height: 1.1;
          font-family: var(--font-secondary);
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        .hero p {
          color: var(--muted-foreground);
          font-size: 1rem;
          margin: 10px 0 20px;
          line-height: 1.6;
          max-width: 500px;
        }
        .hero-buttons { display: flex; gap: 16px; }
        
        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          transition: .25s;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3); }
        
        .btn-outline {
          background: white;
          border: 1px solid var(--border);
          padding: 12px 24px;
          border-radius: 8px;
          transition: .25s;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--foreground);
        }
        .btn-outline:hover { border-color: var(--primary); color: var(--primary); }

        .hero-img {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,.15);
        }
        .hero-img img { width: 100%; display: block; transition: .5s; }
        .hero-img:hover img { transform: scale(1.05); }

        /* ============ SECTIONS ============ */
        .section { max-width: 1200px; margin: 40px auto; padding: 1rem; }
        .section h2 { font-family: var(--font-secondary); font-size: 2.2rem; margin-bottom: 1rem; color: var(--foreground); }

        /* ============ PROCESS ============ */
        .masonry {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          height: 500px;
        }
        @media(max-width: 900px) { 
          .masonry { grid-template-columns: 1fr 1fr; height: auto; } 
        }

        .masonry div {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .masonry img { width: 100%; height: 100%; object-fit: cover; transition: .5s; }
        .masonry div:hover img { transform: scale(1.1); }
        .masonry span {
          position: absolute;
          left: 16px;
          bottom: 16px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          z-index: 2;
        }
        .masonry div::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        }

        .m1 { grid-column: span 2; }
        .m3 { grid-row: span 2; }
        .m4 { grid-column: span 3; }

        @media(max-width: 900px) { 
          .m1, .m3, .m4 { 
            grid-column: auto; 
            grid-row: auto; 
            height: 200px; 
          } 
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="hero fade">
        <div>
          <small style={{ color: "var(--primary)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Since 1924
          </small>
          <h1>Hands of Heritage:<br />The Elampillai Weavers</h1>
          <p>
            Behind every fold of silk lies a story of patience, skill, and pride. Each saree is a masterpiece woven with generations of knowledge.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/sarees")}>
              Explore Collection
            </button>
            <button className="btn-outline" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>

        <div className="hero-img">
          <img src={heroImg} alt="Elampillai weaver" />
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section fade">
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>From Thread to Treasure</h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--muted-foreground)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          The meticulous process of creating an Elampillai saree involves multiple intricate steps, each requiring expert precision.
        </p>

        <div className="masonry">
          <div className="m1">
            <img src={m1Img} alt="Dyeing" />
            <span>1. Dyeing & Tuning</span>
          </div>

          <div className="m2">
            <img src={m2Img} alt="Zari" />
            <span>2. Zari Winding</span>
          </div>

          <div className="m3">
            <img src={m3Img} alt="Jacquard" />
            <span>3. Jacquard Weaving</span>
          </div>

          <div className="m4">
            <img src={m4Img} alt="Quality Check" />
            <span>4. Quality Check & Fold</span>
          </div>
        </div>
      </section>

    </div>
  );
}
