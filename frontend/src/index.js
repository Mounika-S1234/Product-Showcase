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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();