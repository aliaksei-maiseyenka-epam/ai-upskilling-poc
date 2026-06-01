# How the E-commerce AI Chatbot Works

This diagram shows what happens when a user asks a question like "How many orders do we have?"

```mermaid
graph TD
    A[User asks: How many orders?] --> B[Chat Interface]
    B --> C[Send to Backend]
    C --> D[AI Service: Convert to SQL]
    D --> E[Azure AI: SELECT COUNT FROM orders]
    E --> F[Database: Execute SQL]
    F --> G[Result: 3 orders]
    G --> H[Format: I found 3 orders]
    H --> I[Show to User]
    
    style A fill:#e1f5fe
    style E fill:#fff3e0
    style F fill:#fce4ec
    style I fill:#e8f5e8