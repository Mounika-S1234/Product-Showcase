// backend/routes/productRoutes.js - UPDATED with detailed error logging 💡
const express = require('express');
const router = express.Router();
const openDb = require('../db/db');

// GET /api/products - Get all products (with optional search/pagination logic)
router.get('/', async (req, res) => {
    try {
        const db = await openDb();
        
        // Basic query: Fetch all products.
        const products = await db.all('SELECT * FROM products ORDER BY name ASC');
        
        // Check if products were found before responding
        if (products.length === 0) {
            console.log('No products found in the database.');
        }

        res.json(products);
    } catch (error) {
        // CRITICAL UPDATE: Log the full error to the console (Render logs)
        console.error('CRITICAL DATABASE ERROR fetching products:', error.message, error);
        
        // Return a 500 status with an explicit message about the failure
        res.status(500).json({ 
            error: 'Failed to retrieve products.', 
            detail: 'Database access failed. Check server logs for connection or file errors.'
        });
    }
});

// GET /api/products/:id - Get a single product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await openDb();
        const product = await db.get('SELECT * FROM products WHERE id = ?', id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        // Added the same detailed logging to the single product fetch as well
        console.error(`CRITICAL DATABASE ERROR fetching product ID ${id}:`, error.message, error);
        res.status(500).json({ 
            error: 'Failed to retrieve product details.',
            detail: 'Database access failed. Check server logs for connection errors.'
        });
    }
});

module.exports = router;
