// This file executes the schema and seeds data into the SQLite database.
require('dotenv').config({ path: '../.env' });
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', process.env.DB_FILE || 'product_showcase.db');

// Connect (or create) the database file
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log(`Connected to the SQLite database at ${dbPath}`);
        runSeed();
    }
});

const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

const sampleDataSql = `
-- Sample product data
INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES
('Zen Wireless Headphones', 'Electronics', 'Noise-cancelling wireless headphones with 30-hour battery life.', 'Experience crystal clear audio with active noise cancellation. Lightweight and comfortable for all-day wear. Comes with a sleek carrying case.', 199.99, '/images/headphones.jpg'),
('Organic Coffee Beans', 'Grocery', 'Medium roast, ethically sourced Arabica beans.', 'Hand-picked 100% Arabica beans from high-altitude farms in Ethiopia. Notes of chocolate and caramel.', 15.50, '/images/coffee.jpg'),
('Ergonomic Mouse', 'Electronics', 'Vertical design reduces wrist strain.', 'DPI adjustable optical sensor, five programmable buttons, and a comfortable vertical grip.', 45.00, '/images/mouse.jpg'),
('Hardcover Notebook', 'Stationery', 'A5 dotted notebook with 160gsm paper.', 'Ideal for bullet journaling, sketching, and fountain pens. Lay-flat design for easy writing.', 24.99, '/images/notebook.jpg'),
('Hiking Backpack 40L', 'Outdoor', 'Durable and lightweight for weekend trips.', '40-liter capacity, integrated rain cover, padded straps, and multiple compartments for organization.', 79.99, '/images/backpack.jpg'),
('Smart Watch Pro', 'Electronics', 'Fitness tracking, heart rate monitor, and notifications.', 'Always-on AMOLED display, GPS tracking, and up to 10 days of battery life. Water resistant.', 249.00, '/images/watch.jpg');
`;

function runSeed() {
    db.serialize(() => {
        // Run schema setup
        db.exec(schemaSql, (err) => {
            if (err) {
                console.error("Schema creation failed:", err.message);
            } else {
                console.log("Schema created successfully.");

                // Run seed data
                db.exec(sampleDataSql, (err) => {
                    if (err) {
                        console.error("Data seeding failed:", err.message);
                    } else {
                        console.log("Database successfully seeded with sample products.");
                    }
                    db.close((closeErr) => {
                        if (closeErr) console.error("Error closing DB:", closeErr.message);
                        else console.log("Database connection closed.");
                    });
                });
            }
        });
    });
}