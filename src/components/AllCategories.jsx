import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ArrowRight } from "lucide-react";

export default function AllCategories() {
    // Helper to get image for a category
    const getImg = (cat) => {
        const p = products.find((product) => product.category === cat);
        return p ? p.image : null;
    };

    const categories = [
        {
            id: "powerloom",
            name: "Powerloom Sarees",
            description: "Traditional powerloom sarees with elegant designs.",
            link: "/sarees",
            image: getImg("Powerloom"),
        },
        {
            id: "silk-cotton",
            name: "Silk Cotton Sarees",
            description: "Lightweight and comfortable silk cotton blends.",
            link: "/silk-cotton",
            image: getImg("Silk Cotton"),
        },
        {
            id: "wedding",
            name: "Wedding Collection",
            description: "Grand and luxurious sarees for your special day.",
            link: "/wedding",
            image: getImg("Wedding"),
        },
        {
            id: "kids",
            name: "Kids Collection",
            description: "Traditional wear for the little ones.",
            link: "/kids",
            image: getImg("Kids"),
        },
        {
            id: "combo",
            name: "Combo Offers",
            description: "Best value packs for gifting and personal use.",
            link: "/combo",
            image: getImg("Combo Sarees"),
        },
    ];

    return (
        <div className="categories-page">
            <style>{`
        .categories-page {
          padding: 80px 20px;
          background-color: var(--background);
          min-height: 80vh;
        }
        .cat-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .cat-header h1 {
          font-family: var(--font-secondary);
          font-size: 3.5rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .cat-header p {
          color: var(--muted-foreground);
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cat-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid var(--border);
        }

        .cat-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }

        .cat-image-container {
          height: 300px;
          overflow: hidden;
          position: relative;
        }

        .cat-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .cat-card:hover .cat-image {
          transform: scale(1.1);
        }

        .cat-content {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .cat-title {
          font-family: var(--font-secondary);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .cat-desc {
          font-size: 0.95rem;
          color: var(--muted-foreground);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .cat-link {
          margin-top: auto;
          color: var(--primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
        }
      `}</style>

            <div className="cat-header">
                <h1>Explore Our Collections</h1>
                <p>Discover our wide range of traditional categories, from exquisite Silk Cotton to grand Wedding collections.</p>
            </div>

            <div className="cat-grid">
                {categories.map((cat) => (
                    <Link to={cat.link} key={cat.id} className="cat-card">
                        <div className="cat-image-container">
                            <img src={cat.image} alt={cat.name} className="cat-image" />
                        </div>
                        <div className="cat-content">
                            <h3 className="cat-title">{cat.name}</h3>
                            <p className="cat-desc">{cat.description}</p>
                            <div className="cat-link">
                                View Collection <ArrowRight size={18} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
