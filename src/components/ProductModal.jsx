import { useState } from 'react';

function ProductModal({ product, isOpen, onClose, onAddToCart, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product || !isOpen) return null;

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }

    if (halfStar) {
      stars += '☆';
    }

    while (stars.length < 5) {
      stars += '☆';
    }

    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'productModal') {
      onClose();
    }
  };

  return (
    <div className="modal active" id="productModal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="product-detail-grid">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail-info">
              <div className="product-category">{product.category}</div>
              <h2>{product.name}</h2>
              <div className="product-rating">
                <div className="stars">{generateStars(product.rating)}</div>
                <span className="rating-count">({product.reviews} reviews)</span>
              </div>
              <div className="product-price">
                <span className="price-current">₹{product.price.toLocaleString()}</span>
                <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
                <span className="price-discount">{product.discount}% OFF</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-options">
                <h4>Available Sizes</h4>
                <div className="size-options">
                  {['Free Size', '5.5 Meters', '6.3 Meters'].map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="quantity-selector">
                <h4>Quantity:</h4>
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              <div className="product-actions-group">
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                <button className="btn btn-secondary" onClick={() => onToggleWishlist(product.id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
