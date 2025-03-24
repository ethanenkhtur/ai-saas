import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const client = new OpenAI();

    const messages = await req.json();

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: "You are a conversationalist that is fun to talk to.",
        input: [...messages],
    });

    return new NextResponse(response.output_text, { status: 200 });
}
