-- E-commerce Database Schema
CREATE TABLE customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200),
    registration_date DATETIME,
    region VARCHAR(50),
    customer_type VARCHAR(30)
);

CREATE TABLE products (
    product_id VARCHAR(50) PRIMARY KEY,
    product_name VARCHAR(200),
    category VARCHAR(100),
    brand VARCHAR(100),
    cost_price DECIMAL(10,2),
    selling_price DECIMAL(10,2),
    stock_quantity INT,
    created_at DATETIME
);

CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50),
    order_date DATETIME,
    total_amount DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    tax_amount DECIMAL(10,2),
    status VARCHAR(30),
    shipping_method VARCHAR(50),
    region VARCHAR(50),
    created_at DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    item_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50),
    product_id VARCHAR(50),
    quantity INT,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);