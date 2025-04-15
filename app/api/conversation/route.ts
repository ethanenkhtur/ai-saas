import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { UsageEligibility, incrementApiUsage } from "@/lib/api_limit";

export async function POST(req: NextRequest) {
	try {
		const client = new OpenAI();

		const messages: [] = await req.json();

		if (!(await UsageEligibility()))
			return new NextResponse("Pro model is required.", { status: 403 });

		const response = await client.responses.create({
			model: "gpt-4o-mini",
			instructions: "You are a conversationalist that is fun to talk to.",
			input: [...messages],
		});

		await incrementApiUsage();

		return new NextResponse(response.output_text, { status: 200 });
	} catch {
		console.log("CONVERSATION endpoint failed!");
		return new NextResponse("CONVERSATION endpoint failed!", {
			status: 500,
		});
	}
}
