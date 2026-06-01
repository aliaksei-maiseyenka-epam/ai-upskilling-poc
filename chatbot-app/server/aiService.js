require('dotenv').config();
const axios = require('axios');

class AIService {
    constructor(database) {
        this.endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        this.apiKey = process.env.AZURE_OPENAI_KEY;
        this.deploymentName = process.env.AZURE_DEPLOYMENT_NAME;
        this.apiVersion = process.env.AZURE_API_VERSION;
        this.db = database;
    }

    async getDynamicSchema() {
        try {
            const tables = await this.db.query(`
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
                ORDER BY name
            `);
            
            let schema = "Database Tables:\n";
            
            for (const table of tables) {
                const columns = await this.db.query(`PRAGMA table_info(${table.name})`);
                
                const columnInfo = columns.map(col => `${col.name} (${col.type})`).join(', ');
                
                schema += `• ${table.name}: ${columnInfo}\n`;
            }
            
            return schema;
            
        } catch (error) {
            console.error('❌ Error auto-detecting schema:', error.message);
            return `Database Tables:
    • customers: customer_id, first_name, last_name, email, registration_date, region, customer_type
    • products: product_id, product_name, category, brand, cost_price, selling_price, stock_quantity, created_at
    • orders: order_id, customer_id, order_date, total_amount, shipping_cost, tax_amount, status, shipping_method, region, created_at
    • order_items: item_id, order_id, product_id, quantity, unit_price, total_price`;
        }
    }

    async generateSQL(userQuestion) {
        const databaseSchema = await this.getDynamicSchema();
        
        const prompt = `You are a SQL expert. Convert the user's question into a SQL query for an e-commerce database.

        ${databaseSchema}

        User Question: "${userQuestion}"

        Rules:
        1. Only return the SQL query, no explanations, no markdown formatting
        2. Use proper SQL syntax for SQLite
        3. If the question can't be answered with the available tables
        , return "NO_SQL"
        4. Focus on SELECT queries only
        5. Use appropriate JOINs when needed
        6. Limit results to 10 records maximum using LIMIT 10

        SQL Query:`;

        try {
            const url = `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`;
            
            const response = await axios.post(url, {
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 200,
                temperature: 0.1,
            }, {
                headers: {
                    'api-key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            
            if (data.choices && data.choices.length > 0) {
                const choice = data.choices[0];
                
                if (choice?.message?.content) {
                    let sqlQuery = choice.message.content.trim();
                    
                    if (sqlQuery.includes('```sql')) {
                        sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```/g, '').trim();
                    }
                    
                    return sqlQuery === 'NO_SQL' ? null : sqlQuery;
                }
            }
            
            return null;
            
        } catch (error) {
            console.error('❌ Azure AI Error:', error.message);
            return null;
        }
    }

    async formatResponse(sqlResult, userQuestion) {
        if (!sqlResult || sqlResult.length === 0) {
            return 'No data found for your query.';
        }

        if (sqlResult[0].count !== undefined || sqlResult[0].total_orders !== undefined) {
            const count = sqlResult[0].count || sqlResult[0].total_orders;
            return `📊 I found **${count}** orders in total.`;
        }
        
        if (sqlResult[0].total !== undefined || sqlResult[0].total_amount !== undefined) {
            const total = sqlResult[0].total || sqlResult[0].total_amount;
            return `💰 Total revenue: **$${total?.toFixed(2) || '0.00'}**`;
        }
        
        if (sqlResult[0].total_sold !== undefined) {
            let response = '🏆 **Top selling products:**\n\n';
            sqlResult.forEach((product, index) => {
                response += `${index + 1}. **${product.product_name}** - ${product.total_sold} sold\n`;
            });
            return response;
        }
        
        if (sqlResult[0].first_name || sqlResult[0].customer_id) {
            let response = '👥 **Customer Information:**\n\n';
            sqlResult.slice(0, 5).forEach((customer, index) => {
                response += `**${index + 1}. Customer ${customer.customer_id}**\n`;
                if (customer.first_name) response += `   👤 Name: ${customer.first_name} ${customer.last_name || ''}\n`;
                if (customer.region) response += `   🌍 Region: ${customer.region}\n`;
                if (customer.customer_type) response += `   ⭐ Type: ${customer.customer_type}\n`;
                response += '\n';
            });
            if (sqlResult.length > 5) {
                response += `... and ${sqlResult.length - 5} more customers`;
            }
            return response;
        }
        
        if (sqlResult[0].order_id) {
            let response = '📦 **Order Information:**\n\n';
            sqlResult.slice(0, 5).forEach((order, index) => {
                response += `**${index + 1}. Order ${order.order_id}**\n`;
                response += `   💰 Amount: $${order.total_amount}\n`;
                response += `   📅 Date: ${order.order_date}\n`;
                response += `   📊 Status: ${order.status}\n\n`;
            });
            if (sqlResult.length > 5) {
                response += `... and ${sqlResult.length - 5} more orders`;
            }
            return response;
        }
        
        return `📋 Found **${sqlResult.length}** results for your query.`;
    }
}

module.exports = AIService;
