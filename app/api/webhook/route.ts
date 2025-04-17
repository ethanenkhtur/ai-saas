import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	const rawBody = await req.text();

	let event: Stripe.Event;

	try {
		const stripeSignature = (await headers()).get(
			"stripe-signature"
		) as string;

		event = stripe.webhooks.constructEvent(
			rawBody,
			stripeSignature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";

		// On error, log and return the error message.
		if (error instanceof Error) console.log(error);
		console.log(`❌ Error message: ${errorMessage}`);

		return NextResponse.json(`Webhook Error: ${errorMessage}`, {
			status: 400,
		});
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);

		if (!session.metadata?.userId)
			return new NextResponse("User id is required", { status: 400 });

		await prisma.userSubscription.create({
			data: {
				userId: session?.metadata?.userId,
				stripeSubscriptionId: subscription.id,
				stripeCustomerId: subscription.customer as string,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.items.data[0].current_period_end * 1000
				),
			},
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);

		await prisma.userSubscription.update({
			where: {
				stripeSubscriptionId: subscription.id,
			},
			data: {
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.items.data[0].current_period_end * 1000
				),
			},
		});
	}

	return new NextResponse(null, { status: 200 });
}
