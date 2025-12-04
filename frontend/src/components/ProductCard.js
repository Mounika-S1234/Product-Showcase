import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="product-image"
          // Note: Images are dummy/placeholders. In a real app, they'd be served from the backend.
        />
        <div className="card-content">
          <h3>{product.name}</h3>
          <p className="category-tag">{product.category}</p>
          <p className="short-desc">{product.short_desc}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="view-details-btn">View Details</button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;