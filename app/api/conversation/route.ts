import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(req: NextRequest) {
    try {
        // grab the userid of current authenticated user
        const { userId } = await auth();

        // turns the body of request into json format
        const body = await req.json();
        // extracts messages from body in the OpenAI formatted response
        const { messages } = body;

        // if no userid, unauthorized response
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // checks if messages exist in response from OpenAI API
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // generates AI response by sending conversation history to OpenAI
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a conversationalist that is fun to talk to.",
                },
                ...messages,
            ],
        });

        // each API response from OpenAI includes only one response in choices, hence [0]. this is because OpenAI allows multiple outputs to one prompt (not useful in this app).
        return NextResponse.json(completion.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
