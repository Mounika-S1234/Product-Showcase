import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import './styles/App.css'; // Global styling

function App() {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/"><h1>📦 Product Showcase</h1></Link>
          <a href="/api/enquiries" target="_blank" rel="noopener noreferrer">Admin Enquiries</a>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </main>
      <footer>
        <p>© 2025 Product Showcase | Full Stack Assignment</p>
      </footer>
    </Router>
  );
}

export default App;