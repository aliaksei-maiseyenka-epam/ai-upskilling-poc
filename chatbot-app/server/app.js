require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
const db = new Database();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/chat', require('./routes/chat'));

// Test route
app.get('/api/test', async (req, res) => {
    try {
        const customers = await db.query('SELECT * FROM customers LIMIT 3');
        res.json({ message: 'Database connected!', customers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database initialized with sample data`);
});