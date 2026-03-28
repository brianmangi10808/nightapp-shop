import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './product.css';

function Product() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const { addToCart } = useCart();

  const categories = [
    'All Products', 'Protection', 'Pleasure', 
    'Supplements', 'Contraception', 'Lubricants', 'Wellness'
  ];

  const filteredProducts = activeCategory === 'All Products' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Featured Products</h1>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            className="product-card-link"
          >
            <div className="product-card">
              {product.badge && (
                <div className={`badge ${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                  {product.badge}
                </div>
              )}

              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/hero.png';
                  }}
                />
              </div>

              <div className="product-info">
                <span className="category-tag">{product.category.toUpperCase()}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="short-desc">{product.description}</p>

                <div className="price-section">
                  <div className="price">
                    KSh {product.price.toLocaleString()}
                    {product.originalPrice && (
                      <span className="original-price">KSh {product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button 
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                    alert(`${product.name} added to cart ✓`);
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;