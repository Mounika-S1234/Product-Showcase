import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Import base styling (if needed)
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root instance using the new React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component
root.render(
  <React.StrictMode>
    {/* App component contains routing, header, footer, and page logic */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
