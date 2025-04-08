import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { incrementApiUsage, UsageEligibility } from "@/lib/api_limit";

export async function POST(req: NextRequest) {
	try {
		const openai = new OpenAI();

		const { prompt, amount, resolution } = await req.json();

		if (!(await UsageEligibility()))
			return new NextResponse("Pro model is required.", { status: 403 });

		const response = await openai.images.generate({
			model: "dall-e-2",
			prompt: prompt,
			n: parseInt(amount),
			size: resolution,
		});

		await incrementApiUsage();

		return NextResponse.json(response.data, { status: 200 });
	} catch (error: any) {
		console.error("OpenAI API IMAGE Error:", error); // Use console.error for errors

		if (error.response) {
			console.error("Status:", error.response.status);
			console.error("Data:", error.response.data);
			return NextResponse.json(
				{
					error: "OpenAI API Error",
					status: error.response.status,
					data: error.response.data,
				},
				{ status: error.response.status || 500 } // Use the API's status code or default to 500
			);
		} else {
			console.error("Message:", error.message);
			return NextResponse.json(
				{
					error: "An unexpected error occurred",
					message: error.message,
				},
				{ status: 500 }
			);
		}
	}
}
