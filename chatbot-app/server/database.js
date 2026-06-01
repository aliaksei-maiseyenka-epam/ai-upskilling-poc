const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, '../data/ecommerce.db'));
        this.init();
    }

    init() {
        // Create tables
        this.db.serialize(() => {
            // Customers table
            this.db.run(`
                CREATE TABLE IF NOT EXISTS customers (
                    customer_id TEXT PRIMARY KEY,
                    first_name TEXT,
                    last_name TEXT,
                    email TEXT,
                    registration_date TEXT,
                    region TEXT,
                    customer_type TEXT
                )
            `);

            // Products table
            this.db.run(`
                CREATE TABLE IF NOT EXISTS products (
                    product_id TEXT PRIMARY KEY,
                    product_name TEXT,
                    category TEXT,
                    brand TEXT,
                    cost_price REAL,
                    selling_price REAL,
                    stock_quantity INTEGER,
                    created_at TEXT
                )
            `);

            // Orders table
            this.db.run(`
                CREATE TABLE IF NOT EXISTS orders (
                    order_id TEXT PRIMARY KEY,
                    customer_id TEXT,
                    order_date TEXT,
                    total_amount REAL,
                    shipping_cost REAL,
                    tax_amount REAL,
                    status TEXT,
                    shipping_method TEXT,
                    region TEXT,
                    created_at TEXT,
                    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
                )
            `);

            // Order items table
            this.db.run(`
                CREATE TABLE IF NOT EXISTS order_items (
                    item_id TEXT PRIMARY KEY,
                    order_id TEXT,
                    product_id TEXT,
                    quantity INTEGER,
                    unit_price REAL,
                    total_price REAL,
                    FOREIGN KEY (order_id) REFERENCES orders(order_id),
                    FOREIGN KEY (product_id) REFERENCES products(product_id)
                )
            `);

            this.insertSampleData();
        });
    }

    insertSampleData() {
        // Insert sample customers
        const customers = [
            ['CUST-001', 'John', 'Smith', 'john.smith@email.com', '2024-01-15', 'North America', 'Premium'],
            ['CUST-002', 'Sarah', 'Johnson', 'sarah.j@email.com', '2024-02-20', 'Europe', 'Standard'],
            ['CUST-003', 'Mike', 'Wilson', 'mike.wilson@email.com', '2024-01-08', 'North America', 'Premium']
        ];

        customers.forEach(customer => {
            this.db.run(`INSERT OR IGNORE INTO customers VALUES (?, ?, ?, ?, ?, ?, ?)`, customer);
        });

        // Insert sample products
        const products = [
            ['PROD-001', 'Wireless Headphones', 'Electronics', 'TechBrand', 50.00, 99.99, 150, '2024-01-01'],
            ['PROD-002', 'Running Shoes', 'Footwear', 'SportBrand', 40.00, 79.99, 75, '2024-01-01'],
            ['PROD-003', 'Coffee Maker', 'Appliances', 'HomeBrand', 80.00, 149.99, 30, '2024-01-01']
        ];

        products.forEach(product => {
            this.db.run(`INSERT OR IGNORE INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, product);
        });

        // Insert sample orders
        const orders = [
            ['ORD-001', 'CUST-001', '2024-07-15', 299.99, 9.99, 24.00, 'Completed', 'Standard', 'North America', '2024-07-15'],
            ['ORD-002', 'CUST-002', '2024-07-16', 149.50, 15.00, 11.96, 'Completed', 'Express', 'Europe', '2024-07-16'],
            ['ORD-003', 'CUST-003', '2024-07-18', 89.99, 5.99, 7.20, 'Completed', 'Standard', 'North America', '2024-07-18']
        ];

        orders.forEach(order => {
            this.db.run(`INSERT OR IGNORE INTO orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, order);
        });

        // Insert sample order items
        const orderItems = [
            ['ITEM-001', 'ORD-001', 'PROD-003', 2, 149.99, 299.98],
            ['ITEM-002', 'ORD-002', 'PROD-001', 1, 99.99, 99.99],
            ['ITEM-003', 'ORD-003', 'PROD-002', 1, 79.99, 79.99]
        ];

        orderItems.forEach(item => {
            this.db.run(`INSERT OR IGNORE INTO order_items VALUES (?, ?, ?, ?, ?, ?)`, item);
        });
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = Database;