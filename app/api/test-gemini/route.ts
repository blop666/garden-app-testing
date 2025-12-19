import { NextResponse } from "next/server";
import { testGeminiConnection } from "@/lib/geminiHelper";

export async function GET() {
    try {
        // Run the simplest test: does "Hello" return a response?
        const isWorking = await testGeminiConnection();

        if (isWorking) {
            return NextResponse.json({ 
                status: "success", 
                message: "Gemini is online!" 
            });
        }

        return NextResponse.json({ 
            status: "error", 
            message: "Connection failed. Check console or API key." 
        }, { status: 500 });

    } catch (error: any) {
        return NextResponse.json({ 
            status: "error", 
            error: error.message 
        }, { status: 500 });
    }
}