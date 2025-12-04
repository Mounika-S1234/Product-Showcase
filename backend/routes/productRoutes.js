// Handles GET /api/products and GET /api/products/:id
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET /api/products - list products with search/filter/pagination (Server-Side Pagination/Filter Bonus)
router.get('/products', (req, res) => {
    const { search = '', category = '', page = 1, limit = 10 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    let whereClauses = [];
    let params = [];

    // Search by name
    if (search) {
        whereClauses.push("name LIKE ?");
        params.push(`%${search}%`);
    }

    // Filter by category
    if (category) {
        whereClauses.push("category = ?");
        params.push(category);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const countSql = `SELECT COUNT(*) AS total FROM products ${whereSql}`;
    const productSql = `SELECT * FROM products ${whereSql} LIMIT ? OFFSET ?`;

    // 1. Get total count
    db.get(countSql, params, (err, countRow) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error fetching count.', error: err.message });

        const total = countRow.total;

        // 2. Get paginated products
        db.all(productSql, [...params, limitNum, offset], (err, rows) => {
            if (err) return res.status(500).json({ success: false, message: 'Database error fetching products.', error: err.message });

            res.json({
                success: true,
                products: rows,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: limitNum,
                    totalPages: Math.ceil(total / limitNum)
                }
            });
        });
    });
});

// GET /api/products/:id - product details
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error.', error: err.message });
        if (!row) return res.status(404).json({ success: false, message: 'Product not found.' });

        res.json({ success: true, product: row });
    });
});

module.exports = router;