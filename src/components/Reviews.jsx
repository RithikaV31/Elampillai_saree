import { Star, User, Quote } from "lucide-react";

const reviews = [
  { name: "Priya S.", text: "Absolutely in love with the silk cotton saree! The texture is so soft and the zari work is elegant. Perfect for my office function.", rating: 5 },
  { name: "Lakshmi K.", text: "Received my order today. The packing was excellent and the saree looks exactly like the picture. Authentic Elampillai weave!", rating: 5 },
  { name: "Anitha R.", text: "Great quality for the price. The colors are vibrant and the material breathes well. Will definitely buy again.", rating: 4 },
  { name: "Divya M.", text: "I gifted this to my mom and she loved it. The traditional motif is beautiful. Fast delivery too!", rating: 5 },
  { name: "Sangeetha P.", text: "The best place to buy soft silk sarees. It drapes so perfectly. Highly recommended!", rating: 5 },
  { name: "Meena L.", text: "Very happy with the purchase. The customer support was helpful in choosing the right color combination.", rating: 5 },
  { name: "Kavitha J.", text: "Genuine handloom product. You can feel the quality in the weave. Thank you Elampillai Sarees!", rating: 5 },
  { name: "Revathi B.", text: "Beautiful collection! I bought three sarees for a wedding and all of them are stunning.", rating: 5 },
  { name: "Deepa N.", text: "Was a bit skeptical about buying online, but the quality exceeded my expectations. So elegant.", rating: 4 },
  { name: "Usha T.", text: "Traditional yet trendy. The border design is unique. Love it!", rating: 5 },
  { name: "Swetha V.", text: "Premium look at an affordable price. The gold zari doesn't look flashy, just classy.", rating: 5 },
  { name: "Ranjani K.", text: "Superb material. Does not crush easily and stays neat all day. Very satisfied.", rating: 5 },
  { name: "Indhu G.", text: "The 'Mayil' chakra design is exquisite. A true masterpiece of weaving.", rating: 5 },
  { name: "Bhavani S.", text: "Quick shipping and lovely saree. Ideally suited for our humid weather.", rating: 4 },
  { name: "Chitra D.", text: "My colleagues asked me where I bought this saree. It stands out in the crowd!", rating: 5 },
  { name: "Gayathri M.", text: "Value for money. The finishing is neat and there were no loose threads.", rating: 5 },
  { name: "Nithya R.", text: "Authentic stuff. Reminds me of the sarees my grandmother used to wear.", rating: 5 },
  { name: "Padma L.", text: "Ordered for Varalakshmi pooja. Came on time and the auspicious colors were perfect.", rating: 5 },
  { name: "Suganya K.", text: "Soft against the skin and very lightweight. Can wear it all day without hassle.", rating: 5 },
  { name: "Viji P.", text: "Excellent collection of dual-tone sarees. The photos don't do justice to the real beauty.", rating: 5 },
  { name: "Malathi S.", text: "Trustworthy brand. This is my 4th purchase and the quality is consistent.", rating: 5 },
  { name: "Rekha A.", text: "Simple booking process and great product. The saree looks very rich.", rating: 5 },
  { name: "Jayasree N.", text: "The contrast blouse piece provided is of good length and quality.", rating: 4 },
  { name: "Karthika E.", text: "Amazing craftsmanship. Bringing the tradition of Elampillai to our doorstep.", rating: 5 },
  { name: "Uma M.", text: "Lovely shades. The green and pink combo I bought is striking.", rating: 5 },
  { name: "Saranya D.", text: "Very prompt response on WhatsApp. They helped me pick a bridal gift.", rating: 5 },
  { name: "Bhuvaneswari T.", text: "Classic designs. It's hard to find such authentic weaves these days.", rating: 5 },
  { name: "Mythili R.", text: "Five stars! Everything from browsing to delivery was smooth.", rating: 5 },
  { name: "Abirami K.", text: "So elegant and lightweight. I feel very comfortable wearing it.", rating: 5 },
  { name: "Vanitha S.", text: "Simply superb. Will come back for Diwali shopping!", rating: 5 }
];

export default function Reviews() {
  return (
    <div className="reviews-page">
      <style>{`
        .reviews-page {
          background: var(--background);
          padding: 2rem 1rem;
          min-height: 100vh;
        }
        .reviews-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .reviews-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .reviews-header h1 {
          font-family: var(--font-secondary);
          font-size: 3rem;
          color: var(--primary);
          margin-bottom: 10px;
        }
        .reviews-header p {
          color: var(--muted-foreground);
          font-size: 1.1rem;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        
        .review-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }
        .review-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }
        
        .review-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .reviewer {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: var(--foreground);
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: var(--secondary);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .stars {
          display: flex;
          gap: 2px;
        }
        
        .review-text {
          font-size: 0.95rem;
          color: var(--muted-foreground);
          line-height: 1.6;
          flex: 1;
        }
        
        .quote-icon {
          color: var(--secondary);
          margin-bottom: 8px;
        }
      `}</style>

      <div className="reviews-container">
        <div className="reviews-header">
          <h1>Customer Love</h1>
          <p>What our delighted customers are saying about authentic Elampillai Sarees.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <div className="reviewer">
                  <div className="avatar"><User size={18} /></div>
                  <span>{review.name}</span>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill={idx < review.rating ? "#fbbf24" : "none"}
                      stroke={idx < review.rating ? "none" : "#cbd5e1"}
                    />
                  ))}
                </div>
              </div>
              <Quote size={20} className="quote-icon" fill="currentColor" />
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
