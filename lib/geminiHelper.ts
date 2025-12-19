// // lib/geminiHelper.ts

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { ChatHistory, ChatSettings, GerationConfig } from "@/types";    

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//     console.error("❌ GEMINI_API_KEY not found in environment variables!");
//     throw new Error("API Key not configured");
// }

// console.log("✅ API Key loaded:", apiKey.substring(0, 10) + "...");

// const genAI = new GoogleGenerativeAI(apiKey);

// export async function ChatToGemini(
//     userMessage: string, 
//     history: ChatHistory, 
//     settings: ChatSettings
// ): Promise<string> {
//     // ✅ UPDATED: Try these specific model names
//     const modelsToTry = [
//         "gemini-pro",                    // Most stable
//         "gemini-1.5-pro-latest",         // Latest stable
//         "gemini-1.5-flash-latest",       // Flash latest
//         settings.model || "gemini-pro",  // User preference
//     ];

//     let lastError: Error | null = null;

//     for (const modelName of modelsToTry) {
//         try {
//             console.log(`🔄 Trying model: ${modelName}`);

//             const model = genAI.getGenerativeModel({
//                 model: modelName,
//                 systemInstruction: settings.systemInstruction || "You are a Helpful assistant especially in Farm Section"
//             });

//             const generationConfig: GerationConfig = {
//                 temperature: settings.temperature || 0.7, // Lower temperature for more stable responses
//                 topP: 0.9,
//                 responseMimeType: "text/plain"
//             };

//             const chatSession = model.startChat({
//                 generationConfig,
//                 history
//             });

//             // Add retry logic for this specific model
//             let attempts = 0;
//             const maxAttempts = 2;

//             while (attempts < maxAttempts) {
//                 try {
//                     const result = await chatSession.sendMessage(userMessage);
//                     const responseText = result.response.text();
                    
//                     console.log(`✅ Success with model: ${modelName}`);
//                     return responseText;
//                 } catch (error: any) {
//                     attempts++;
//                     if (attempts >= maxAttempts) throw error;
                    
//                     console.log(`⏳ Retry ${attempts}/${maxAttempts} for model ${modelName}`);
//                     await new Promise(resolve => setTimeout(resolve, 2000));
//                 }
//             }

//         } catch (error: any) {
//             console.error(`❌ Model ${modelName} failed:`, error.message);
//             lastError = error;

//             // If rate limited, wait longer
//             if (error.message?.includes('429') || error.message?.includes('quota')) {
//                 console.log('⏰ Rate limited, waiting 10 seconds...');
//                 await new Promise(resolve => setTimeout(resolve, 10000));
//             }

//             continue;
//         }
//     }

//     // All models failed
//     console.error("❌ All models failed!");
    
//     if (lastError?.message?.includes('404') || lastError?.message?.includes('not found')) {
//         throw new Error('🌍 Gemini API not accessible in your region. Please use a VPN (US/Singapore) or try again later.');
//     }

//     if (lastError?.message?.includes('429') || lastError?.message?.includes('quota')) {
//         throw new Error('⏸️ Rate limit exceeded. Please wait a few minutes and try again.');
//     }

//     if (lastError?.message?.includes('403') || lastError?.message?.includes('permission')) {
//         throw new Error('🔑 API Key invalid or expired. Please check your Gemini API key.');
//     }

//     throw new Error(`❌ Failed to connect to Gemini API: ${lastError?.message || 'Unknown error'}`);
// }

// // ✅ UPDATED: Better connection test
// export async function testGeminiConnection(): Promise<boolean> {
//     try {
//         console.log("🧪 Testing Gemini API connection...");
        
//         // Try simplest model first
//         const model = genAI.getGenerativeModel({ 
//             model: "gemini-2.0-flash" // Most stable model
//         });
        
//         console.log("📤 Sending test message...");
        
//         const result = await model.generateContent("Hello");
//         const text = result.response.text();
        
//         console.log("📥 Received response:", text.substring(0, 50));
        
//         return !!text && text.length > 0;
//     } catch (error: any) {
//         console.error('❌ Connection test error:', error.message);
        
//         // Log specific error details
//         if (error.message?.includes('404')) {
//             console.error('💡 Model not found - likely region restriction');
//         } else if (error.message?.includes('403')) {
//             console.error('💡 Permission denied - check API key');
//         } else if (error.message?.includes('429')) {
//             console.error('💡 Rate limited - try again later');
//         }
        
//         return false;
//     }
// }

// // ✅ NEW: List available models
// export async function listAvailableModels(): Promise<string[]> {
//     try {
//         const response = await fetch(
//             `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
//         );
        
//         if (!response.ok) {
//             console.error('Failed to list models:', response.status);
//             return [];
//         }
        
//         const data = await response.json();
//         const models = data.models?.map((m: any) => m.name) || [];
        
//         console.log('Available models:', models);
//         return models;
//     } catch (error) {
//         console.error('Error listing models:', error);
//         return [];
//     }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory, ChatSettings } from "@/types";    

// 1. Initialize the SDK with your API Key (the AIza... string)
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function ChatToGemini(
    userMessage: string, 
    history: ChatHistory, 
    settings: ChatSettings
): Promise<string> {
    try {
        // 2. Stick to ONE model for the prototype (Flash is the fastest/cheapest)
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: settings.systemInstruction || "You are a helpful farm assistant."
        });

        const chatSession = model.startChat({
            history: history,
            generationConfig: {
                temperature: settings.temperature || 0.7,
                maxOutputTokens: 1000,
            },
        });

        // 3. Simple single call
        const result = await chatSession.sendMessage(userMessage);
        return result.response.text();

    } catch (error: any) {
        console.error("Gemini Error:", error.message);
        
        // Custom error messages for common issues
        if (error.message?.includes("429")) {
            throw new Error("Quota exceeded. Wait 60 seconds.");
        }
        if (error.message?.includes("403")) {
            throw new Error("Invalid API Key. Check your .env file.");
        }
        
        throw new Error("AI is currently unavailable.");
    }
}

// 4. Simplified Connection Test
export async function testGeminiConnection(): Promise<boolean> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("ping");
        return !!result.response.text();
    } catch {
        return false;
    }
}