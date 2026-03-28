import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        {/* Back Button */}
        <Link to="/product" className="back-button">
          ← Back to Products
        </Link>

        <div className="detail-content">
          {/* Left: Image */}
          <div className="detail-image">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => { e.target.src = "/assets/hero.png"; }}
            />
          </div>

          {/* Right: Details */}
          <div className="detail-info">
            <span className="category-tag">{product.category.toUpperCase()}</span>
            
            <h1 className="detail-title">{product.name}</h1>
            
            {product.badge && (
              <div className={`badge ${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                {product.badge}
              </div>
            )}

            <div className="price-box">
              <span className="current-price">KSh {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="original-price">KSh {product.originalPrice}</span>
              )}
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
              {/* You can add more detailed description here later */}
             
<div className="long-description">
  <h3>Product Details</h3>
  <p>{product.longDescription}</p>
</div>
            </div>

            <div className="actions">
              <button className="add-to-cart-btn-detail">
                Add to Cart
              </button>
              <button className="buy-now-btn">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;