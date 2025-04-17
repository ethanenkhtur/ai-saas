import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
	try {
		const headerList = await headers();
		const origin = headerList.get("origin");
		const settingsUrl = `${origin}/settings`;

		const user = await currentUser();

		if (!user) return new NextResponse("Unauthorized", { status: 401 });

		const userSubscription = await prisma.userSubscription.findUnique({
			where: {
				userId: user.id,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			});

			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		const stripeSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Alldo Pro",
							description: "Unlimited AI Generations",
						},
						unit_amount: 499,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId: user.id,
			},
			success_url: settingsUrl,
			cancel_url: settingsUrl,
		});

		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error: any) {
		console.error("[STRIPE_ERROR]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
