require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON requests

// Define Routes
app.use('/api', productRoutes);
app.use('/api', enquiryRoutes);

// Simple root endpoint for testing
app.get('/', (req, res) => {
    res.send('Product Showcase API is running.');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something broke!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});