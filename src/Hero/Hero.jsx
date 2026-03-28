import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        {/* Top discreet banner */}
        <div className="discreet-banner">
          DISCREET DELIVERY • NIGHTAPP.CO.KE
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Your Private <span className="highlight">Night</span> <br />
            Shopping Store
          </h1>

          <p className="hero-subtitle">
            Quality adult products delivered discreetly to your door in<br />
            Nairobi and across Kenya.
          </p>

          <div className="hero-buttons">
            <Link to="/product" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/offers" className="btn btn-secondary">
              View Offers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;