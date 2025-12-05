// backend/db/db.js - PostgreSQL Connection Module
require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

// Render automatically provides the DATABASE_URL environment variable
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    // This will only happen locally if you forget to set it up
    console.error('FATAL ERROR: DATABASE_URL is not set.');
    throw new Error('DATABASE_URL environment variable is required.');
}

// Use a connection pool for efficiency
const pool = new Pool({
    connectionString: dbUrl,
    // SSL is required when connecting to Render's PostgreSQL from outside Render
    // If connecting from a Render web service to a Render DB, this might be optional.
    ssl: {
        rejectUnauthorized: false 
    }
});

// Wrapper function to execute a query
async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}

// Export methods that mimic the SQLite functions (all, get, run)
const db = {
    // SELECT that returns multiple rows
    all: async (sql, params = []) => {
        const res = await query(sql, params);
        return res.rows;
    },
    // SELECT that returns a single row
    get: async (sql, params = []) => {
        const res = await query(sql, params);
        return res.rows[0];
    },
    // INSERT/UPDATE/DELETE (returns result object)
    run: async (sql, params = []) => {
        return await query(sql, params); 
    },
    // Helper to run raw SQL (used by seed.js)
    exec: async (sql) => {
        return await query(sql);
    }
};

module.exports = db;
