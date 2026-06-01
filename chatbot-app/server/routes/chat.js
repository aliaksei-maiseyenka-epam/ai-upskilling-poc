const express = require('express');
const router = express.Router();
const Database = require('../database');
const AIService = require('../aiService');

const db = new Database();
const ai = new AIService(db);

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        const sqlQuery = await ai.generateSQL(message);
        
        if (!sqlQuery) {
            return res.json({
                response: "I can help you analyze your e-commerce data! Try asking about:\n• Order counts and details\n• Customer information\n• Product performance\n• Sales revenue\n• Top selling items",
                timestamp: new Date().toISOString()
            });
        }
        
        const sqlResult = await db.query(sqlQuery);
        
        const formattedResponse = await ai.formatResponse(sqlResult, message);
        
        res.json({
            response: formattedResponse,
            sql: sqlQuery,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            response: 'Sorry, I encountered an error processing your request.',
            error: error.message 
        });
    }
});

module.exports = router;
