const AIClient = require('../src/ai-client');

async function testAIClient() {
    console.log('=== Testing AI Client ===');
    
    const ai = new AIClient();
    
    const testPrompts = [
        "What is artificial intelligence?",
        "Explain JavaScript promises in simple terms",
        "How do AI agents work?"
    ];

    for (const prompt of testPrompts) {
        console.log(`\n📤 Prompt: ${prompt}`);
        const response = await ai.sendPrompt(prompt);
        console.log(`📥 Response: ${response.response}`);
        console.log(`🤖 Model: ${response.model}`);
    }
    
    console.log('\n✅ AI Client test completed!');
}

testAIClient().catch(console.error);