// Handles POST /api/enquiries and GET /api/enquiries
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// POST /api/enquiries - create enquiry
router.post('/enquiries', (req, res) => {
    const { product_id, name, email, phone, message } = req.body;

    // Basic validation
    if (!product_id || !name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields: product ID, name, email, and message.' });
    }

    // Email validation (simple regex)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    const sql = 'INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)';
    const params = [product_id, name, email, phone || null, message];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Enquiry insertion error:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to submit enquiry due to a database error.' });
        }
        res.status(201).json({ success: true, message: 'Enquiry submitted successfully!', enquiryId: this.lastID });
    });
});

// GET /api/enquiries - list all enquiries (Admin Basic API)
router.get('/enquiries', (req, res) => {
    // Note: In a real app, this would require authentication (Bonus Task)
    const sql = `
        SELECT e.*, p.name AS product_name
        FROM enquiries e
        JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error fetching enquiries.', error: err.message });
        }
        res.json({ success: true, enquiries: rows });
    });
});

module.exports = router;