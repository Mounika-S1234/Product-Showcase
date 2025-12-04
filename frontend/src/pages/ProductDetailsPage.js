import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EnquiryForm from '../components/EnquiryForm';
import '../styles/ProductDetails.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product details. It might not exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Product not found.</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <div className="details-layout">
        <div className="details-image-container">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="details-image" 
          />
        </div>
        <div className="details-info">
          <p className="category-tag">{product.category}</p>
          <p className="price-details">${product.price.toFixed(2)}</p>
          
          <div className="description">
            <h3>Description</h3>
            <p>{product.long_desc}</p>
            <p><strong>SKU:</strong> PROD-{product.id}</p>
          </div>
          
          <button className="enquire-btn" onClick={() => setIsModalOpen(true)}>
            Enquire About This Product
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <EnquiryForm 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default ProductDetailsPage;