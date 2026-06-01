# PoC Concept Definition: E-commerce Sales Analytics Chatbot

## Problem Statement
E-commerce store managers and analysts struggle to quickly extract insights from sales data. They need instant answers about sales performance, customer behavior, and product trends without manually querying databases or waiting for reports. Current analytics tools require technical knowledge and time-consuming report generation.

## Target Users
- **Store Managers**: Need quick insights on daily/weekly sales performance
- **Marketing Teams**: Want to understand customer behavior and campaign effectiveness
- **Product Managers**: Need data on product performance and inventory trends
- **Business Analysts**: Require ad-hoc analysis capabilities

## PoC Scope: Chatbot over Structured Data
**Data Source**: SQL Database with e-commerce sales data
**Focus**: Natural language queries over structured sales, customer, and product data

## Data Inputs
- **Primary Data Source**: E-commerce sales database (SQL)
- **Data Volume**: ~10,000 orders, 500 products, 1,000 customers (sample dataset)
- **Data Refresh**: Real-time queries (no data caching needed for PoC)
- **Data Format**: Structured relational data (orders, products, customers, order_items)

## Key Capabilities

### 1. Sales Performance Queries
- "What were our total sales last month?"
- "Which products are our top sellers this week?"
- "Show me sales trends for the last 6 months"
- "What's our average order value?"

### 2. Customer Analytics
- "Who are our top 10 customers by spending?"
- "How many new customers did we acquire this month?"
- "What's our customer retention rate?"
- "Which customers haven't ordered in 3 months?"

### 3. Product Insights
- "Which products have the highest profit margins?"
- "What inventory is running low?"
- "Which categories perform best in different seasons?"
- "Show me products with declining sales"

### 4. Geographic & Time Analysis
- "Which regions generate the most revenue?"
- "What are our peak sales hours?"
- "Compare this month's performance to last year"
- "Which shipping methods are most popular?"

## Tooling Needs
- **Development**: VS Code with GitHub Copilot
- **Backend**: Node.js + Express for API
- **Database**: SQLite for PoC
- **AI Service**: Azure AI Foundry (GPT-4o for natural language to SQL)
- **Frontend**: Simple HTML/CSS/JavaScript chat interface
- **Version Control**: GitHub repository
- **Testing**: Postman for API testing

## Integrations
- **Azure AI Foundry**: Natural language processing and SQL generation
- **SQLite Database**: Local database for sample e-commerce data
- **REST API**: Backend API to handle chat requests
- **Optional Future**: N8N for automated data ingestion workflows
