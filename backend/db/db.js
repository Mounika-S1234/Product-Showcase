// This module provides the connected database instance.
require('dotenv').config({ path: '../.env' });
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', process.env.DB_FILE);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    // If file doesn't exist, it will be created by seed.js, so we only open READWRITE here.
    if (err) {
        console.error('Database connection error. Run "npm run seed" first:', err.message);
    } else {
        console.log(`Connected to the SQLite database: ${process.env.DB_FILE}`);
    }
});

module.exports = db;