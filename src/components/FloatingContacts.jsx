import { Instagram, MessageCircle } from "lucide-react";

export default function FloatingContacts() {
    const whatsappUrl = "https://wa.me/919384442434"; // Check Footer for exact number if needed
    const instagramUrl = "https://www.instagram.com/elampillai_nesavaalar/";

    return (
        <div className="floating-contacts">
            <style>{`
        .floating-contacts {
          position: fixed;
          bottom: 30px;
          right: 25px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 1000;
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .contact-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          text-decoration: none;
          animation: gentleBounce 3s ease-in-out infinite;
        }

        .contact-btn:hover {
          animation: none; /* Stop bouncing on hover */
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        /* Stagger the animations so they don't jump together */
        .btn-instagram { animation-delay: 0s; }
        .btn-whatsapp { animation-delay: 1.5s; }

        .btn-whatsapp {
          background: #25D366;
        }

        .btn-instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }

        /* Tooltip style (optional) */
        .contact-btn::before {
          content: attr(data-tooltip);
          position: absolute;
          right: 70px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          white-space: nowrap;
        }

        .contact-btn:hover::before {
          opacity: 1;
        }
      `}</style>

            {/* Instagram */}
            <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn btn-instagram"
                data-tooltip="Follow on Instagram"
            >
                <Instagram size={28} />
            </a>

            {/* WhatsApp */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn btn-whatsapp"
                data-tooltip="Chat on WhatsApp"
            >
                <MessageCircle size={28} fill="white" stroke="none" />
            </a>
        </div>
    );
}
