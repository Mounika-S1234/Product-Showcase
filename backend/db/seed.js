// backend/db/seed.js - UPDATED for PostgreSQL
require('dotenv').config({ path: '../.env' });
const db = require('./db'); // Now imports the PostgreSQL wrapper
const fs = require('fs');
const path = require('path');

const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// The sample data remains the same, but the DB must be PostgreSQL
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

async function runSeed() {
    try {
        console.log('Starting schema creation...');
        // Executing schema (PostgreSQL handles multiple statements)
        await db.exec(schemaSql);
        console.log("Schema created successfully.");

        // Executing seed data
        await db.exec(sampleDataSql);
        console.log("Database successfully seeded with sample products.");

    } catch (error) {
        console.error('Database seeding failed:', error.message);
        // Throw error to ensure process exits on failure
        throw error; 
    }
}

runSeed();
