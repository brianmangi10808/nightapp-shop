import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const API_BASE = "http://localhost:5000"; // Change this to your backend URL

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    receiveUpdates: true,
  });

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingRef, setPendingRef] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Normalize phone to E.164 format (254...)
  const normalizeMsisdnToE164 = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.slice(1);
    if (!cleaned.startsWith('254')) cleaned = '254' + cleaned;
    return cleaned;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.location) {
      setError("Please fill in all required fields (*)");
      return;
    }

    const msisdn = normalizeMsisdnToE164(formData.phone);

    setBusy(true);

    try {
      const res = await fetch(`${API_BASE}/api/payments/initiate-stk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: msisdn.replace(/^\+/, ""),
          amount: cartTotal,
          account_reference: `NightApp-${Date.now()}`,
          description: "NightApp Order Payment",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Failed to initiate M-Pesa payment. Please try again.");
        setBusy(false);
        return;
      }

      const ref = data?.data?.checkoutRequestID || data?.data?.merchantRequestID || "";
      setPendingRef(ref);
      setInfo("✅ STK Push sent! Check your phone and enter your M-Pesa PIN to complete payment.");

      // Optional: Clear cart after successful prompt
      // clearCart();
      // navigate('/');

    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  if (cart.length === 0) {
    return <div className="checkout-page"><h2>Your cart is empty</h2></div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Complete Your Order</h1>

        <div className="checkout-grid">
          {/* Left Column - Form */}
          <div className="checkout-form">
            <form onSubmit={handlePay}>
              <h2>Contact Information</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>

              <div className="form-group">
                <label>Phone Number * (e.g. 0712345678)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="700000000" required />
              </div>

             

              <h2>Shipping</h2>
              <div className="shipping-option active">
                <strong>Delivery</strong>
                <p>Doorstep delivery across Kenya</p>
              </div>

              <div className="form-group">
                <label>Delivery Location *</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="Town, estate, or area" 
                  required 
                />
              </div>

              <h2>Payment Method</h2>
              <div className="payment-option active">
                <div className="payment-header">
                  <strong>M-Pesa STK Push</strong>
                  <span className="fastest">Fastest</span>
                </div>
                <p>We will send a payment prompt to your phone.</p>
              </div>

              {error && <p className="error-message">{error}</p>}
              {info && <p className="info-message">{info}</p>}

              <button 
                type="submit" 
                className="pay-now-btn"
                disabled={busy}
              >
                {busy ? "Sending M-Pesa Prompt..." : `Pay Now - KSh ${cartTotal.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary Table */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>KSh {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-amount">KSh {cartTotal.toLocaleString()}</span>
            </div>

            <p className="delivery-note">Delivery fee calculated at final confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;