# 🤖 E-commerce Sales Analytics AI Chatbot

> An intelligent chatbot that transforms natural language questions into SQL queries and provides instant business insights from e-commerce data.

![AI Powered](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=openai) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## 🌟 Features

- **🗣️ Natural Language Processing**: Ask questions in plain English
- **🧠 AI-Powered SQL Generation**: Converts questions to database queries using Azure GPT-4o
- **📊 Dynamic Schema Detection**: Automatically discovers database structure
- **💬 Human-Readable Responses**: No raw JSON, just business insights
- **⚡ Real-Time Analytics**: Instant access to sales data

## 🚀 Quick Start

1. Install dependencies: `npm install`
2. Configure environment variables in `.env` file
3. Start the application: `npm run dev`
4. Open your browser: `http://localhost:3000`

## 💬 Sample Conversations

User: "How many orders do we have?"
Bot: "📊 I found 3 orders in total."

User: "Show me customer details"
Bot: "👥 Customer Information: 1. Customer CUST-001, Name: John Smith, Region: North America"

## 🛠️ Technology Stack

- Frontend: HTML/CSS/JavaScript
- Backend: Node.js + Express
- AI: Azure AI Foundry (GPT-4o)
- Database: SQLite

## 📁 Project Structure

- server/ - Backend code
- public/ - Frontend files
- docs/ - Documentation
- data/ - Database files

## 🏗️ How It Works

```mermaid
graph TD
    A[User asks question] --> B[Chat Interface]
    B --> C[Express Server]
    C --> D[AI Service]
    D --> E[Azure GPT-4o]
    E --> F[Generate SQL]
    F --> G[SQLite Database]
    G --> H[Get Results]
    H --> I[Format Response]
    I --> J[Show Answer to User]
    
    style A fill:#e1f5fe
    style E fill:#fff3e0
    style G fill:#fce4ec
    style J fill:#e8f5e8
