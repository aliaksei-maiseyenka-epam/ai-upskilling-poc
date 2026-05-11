require('dotenv').config();
const axios = require('axios');

class AIClient {
    constructor() {
        this.endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        this.apiKey = process.env.AZURE_OPENAI_KEY;
        this.deploymentName = process.env.AZURE_DEPLOYMENT_NAME;
        this.apiVersion = process.env.AZURE_API_VERSION;
    }

    async sendPrompt(prompt, maxTokens = 150) {
        if (!this.apiKey || this.apiKey === 'your_actual_api_key_here') {
            console.log('⚠️  No API key configured yet');
            return this.simulateResponse(prompt);
        }

        try {
            console.log('🤖 Calling Azure AI (GPT-4o)...');
            
            const url = `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`;
            
            const response = await axios.post(url, {
                messages: [{ role: 'user', content: prompt }],
                max_tokens: maxTokens,
                temperature: 0.7
            }, {
                headers: {
                    'api-key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            return {
                response: response.data.choices[0].message.content,
                model: 'gpt-4o',
                timestamp: new Date().toISOString(),
                provider: 'azure-ai',
                tokens_used: response.data.usage?.total_tokens || 'unknown'
            };
        } catch (error) {
            console.error('❌ Azure AI Error:', error.response?.data || error.message);
            return this.simulateResponse(prompt);
        }
    }

    simulateResponse(prompt) {
        return {
            response: `Simulated response for: "${prompt.substring(0, 30)}..." - Configure your Azure API key to get real responses.`,
            model: 'simulation',
            timestamp: new Date().toISOString(),
            provider: 'simulation'
        };
    }
}

module.exports = AIClient;