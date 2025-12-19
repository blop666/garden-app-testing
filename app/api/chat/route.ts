// // app/api/chat/route.ts

// import { NextResponse } from "next/server";
// import { ChatToGemini } from "@/lib/geminiHelper";
// import { ChatHistory, ChatSettings } from "@/types";

// // ✅ Simple rate limiting
// const requestTimes = new Map<string, number>();
// const RATE_LIMIT_MS = 4000; // 4 seconds between requests
// const CLEANUP_INTERVAL = 60000; // Clean up old entries every minute

// // Clean up old entries periodically
// setInterval(() => {
//     const now = Date.now();
//     for (const [ip, time] of requestTimes.entries()) {
//         if (now - time > RATE_LIMIT_MS * 2) {
//             requestTimes.delete(ip);
//         }
//     }
// }, CLEANUP_INTERVAL);

// export async function POST(request: Request) {
//     try {
//         // ✅ Get client IP for rate limiting
//         const ip = request.headers.get('x-forwarded-for') || 
//                    request.headers.get('x-real-ip') || 
//                    'unknown';

//         // ✅ Check rate limit
//         const lastRequestTime = requestTimes.get(ip) || 0;
//         const now = Date.now();

//         if (now - lastRequestTime < RATE_LIMIT_MS) {
//             const waitTime = Math.ceil((RATE_LIMIT_MS - (now - lastRequestTime)) / 1000);
//             return NextResponse.json(
//                 { error: `⏳ Please wait ${waitTime} seconds before sending another message` },
//                 { status: 429 }
//             );
//         }

//         requestTimes.set(ip, now);

//         // ✅ Parse request
//         const { userMessage, history, settings } = (await request.json()) as {
//             userMessage: string,
//             history: ChatHistory,
//             settings: ChatSettings
//         }

//         // ✅ Validate input
//         if (!userMessage || userMessage.trim().length === 0) {
//             return NextResponse.json(
//                 { error: "Message cannot be empty" },
//                 { status: 400 }
//             );
//         }

//         if (userMessage.length > 1000) {
//             return NextResponse.json(
//                 { error: "Message too long (max 1000 characters)" },
//                 { status: 400 }
//             );
//         }

//         console.log('📨 Received message:', userMessage.substring(0, 50) + '...');

//         // ✅ Call Gemini API
//         const aiResponse = await ChatToGemini(userMessage, history, settings);

//         console.log('✅ Response received:', aiResponse.substring(0, 50) + '...');

//         return NextResponse.json({ response: aiResponse })

//     } catch (error: any) {
//         console.error('❌ API Error:', error);

//         // ✅ Return user-friendly error
//         const errorMessage = error.message || "Failed to get response from AI";
//         const statusCode = error.message?.includes('429') || error.message?.includes('wait') ? 429 : 500;

//         return NextResponse.json(
//             { error: errorMessage },
//             { status: statusCode }
//         )
//     }
// }

import { NextResponse } from "next/server";
import { ChatToGemini } from "@/lib/geminiHelper";

export async function POST(request: Request) {
    try {
        const { userMessage, history, settings } = await request.json();

        // 1. Basic Validation
        if (!userMessage) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 2. Call your helper (ensure this uses process.env.GEMINI_API_KEY)
        const aiResponse = await ChatToGemini(userMessage, history, settings);

        return NextResponse.json({ response: aiResponse });

    } catch (error: any) {
        console.error("Gemini Error:", error.message);
        
        // Handle Quota/Rate Limit errors specifically
        if (error.message?.includes("429")) {
            return NextResponse.json(
                { error: "Too many requests. Please check your Google Cloud Billing or wait a minute." }, 
                { status: 429 }
            );
        }

        return NextResponse.json({ error: "AI failed to respond" }, { status: 500 });
    }
}