function CartSidebar({ cart, isOpen, onClose, onUpdateQuantity, onRemoveItem }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button className="cart-close" onClick={onClose}>&times;</button>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                <div className="cart-item-quantity">
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => onRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <button className="btn btn-primary btn-block">Proceed to Checkout</button>
        <button className="btn btn-secondary btn-block" onClick={onClose}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default CartSidebar;
