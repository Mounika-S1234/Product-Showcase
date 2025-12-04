import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination'; // Import the new component
import '../styles/ProductList.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // Display 6 products per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/products`, {
          params: { search, category, page, limit }
        });
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
      } catch (err) {
        setError("Failed to fetch products. Check the backend server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset to first page on new filter
  };
  
  // New handler passed to the Pagination component
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for better UX
  };

  if (loading && products.length === 0) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  const categories = ['Electronics', 'Grocery', 'Stationery', 'Outdoor', 'All'];

  return (
    <div className="product-list-page">
      <div className="filters-container">
        <input 
          type="search" 
          placeholder="Search by name..." 
          value={search} 
          onChange={handleSearchChange} 
          aria-label="Search products"
        />
        <select 
          value={category} 
          onChange={handleCategoryChange} 
          aria-label="Filter by category"
        >
          {categories.map(cat => (
            <option key={cat} value={cat === 'All' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">No products found matching your criteria.</p>
        )}
      </div>

      {/* Use the dedicated Pagination component here */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductListPage;