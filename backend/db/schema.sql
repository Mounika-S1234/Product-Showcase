-- products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY, -- CHANGED
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    short_desc TEXT,
    long_desc TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP -- CHANGED
);

-- enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY, -- CHANGED
    product_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- CHANGED
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
