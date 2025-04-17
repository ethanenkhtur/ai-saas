import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { DAY_IN_MS } from "@/constants";

export default async function checkSubscription() {
	const user = await currentUser();

	if (!user) return false;

	const userSubscription = await prisma.userSubscription.findUnique({
		where: {
			userId: user.id,
		},
		select: {
			stripeSubscriptionId: true,
			stripeCurrentPeriodEnd: true,
			stripeCustomerId: true,
			stripePriceId: true,
		},
	});

	if (!userSubscription) return false;

	const isValid =
		userSubscription.stripeCustomerId &&
		userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
			Date.now();

	return !!isValid;
}
