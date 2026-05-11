// Simple AI prompt example
// We'll use this to understand prompt engineering

const simplePrompts = {
    basic: "Hello, how are you?",
    
    structured: `You are a helpful AI assistant.
    Task: Answer questions about JavaScript programming.
    Tone: Friendly and educational.
    
    Question: What is a function in JavaScript?`,
    
    withContext: `Context: You are helping a new developer learn JavaScript.
    They have experience with other languages but are new to JS.
    
    Question: Explain JavaScript closures in simple terms.`
};

// TODO: We'll connect this to an AI API later
console.log("Prompt examples created!");
console.log("Next: Connect to AI API");