import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products yet.</p>
          <Link to="/product" className="shop-now-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart ({cart.length} items)</h1>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => { e.target.src = "/assets/hero.png"; }}
                />
              </div>

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">KSh {item.price.toLocaleString()}</p>

                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <p className="item-total">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>KSh {cartTotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="delivery-text">Calculated at checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>KSh {cartTotal.toLocaleString()}</span>
          </div>
<Link  to="/checkout" >
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
</Link>
          <button 
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>

          <Link to="/product" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;