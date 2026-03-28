import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
 import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo - Always on left */}
        <div className="logo">
          <span>NIGHTSHOP</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          <NavLink to="/product">Shop</NavLink>
          {/* <NavLink to="/offers">Offers</NavLink>
          <NavLink to="/about">About</NavLink> */}
        </div>

        {/* Right side: Search + Cart + Hamburger */}
        <div className="nav-actions">
        

          <NavLink to="/Cart" className="cart-icon">
            🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>

          <button 
            className="hamburger" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu - Drops down below */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <NavLink to="/product" onClick={toggleMenu}>Shop</NavLink>
            <NavLink to="/offers" onClick={toggleMenu}>Offers</NavLink>
            <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
            <NavLink to="/cart" onClick={toggleMenu}>Cart</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;