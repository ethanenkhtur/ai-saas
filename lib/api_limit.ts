import { MAX_API_FREE_USAGE } from "@/constants";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function incrementApiUsage() {
	try {
		const { userId } = await auth();

		if (!userId) return;

		await prisma.userApiLimit.upsert({
			where: {
				userId: userId,
			},
			create: {
				userId: userId,
				count: 1,
			},
			update: {
				count: {
					increment: 1,
				},
			},
		});
	} catch (error) {
		console.error("Error incrementing API usage:", error);
	}
}

export async function UsageEligibility() {
	try {
		const { userId } = await auth();

		if (!userId) return false;

		const user = await prisma.userApiLimit.findUnique({
			where: {
				userId: userId,
			},
		});

		return !user || user.count < MAX_API_FREE_USAGE;
	} catch (error) {
		console.error("Error checking API usage eligibility:", error);
		return false;
	}
}

export async function checkUsageCount(): Promise<number> {
	const { userId } = await auth();

	if (!userId) return 0;

	const user = await prisma.userApiLimit.findUnique({
		where: {
			userId: userId,
		},
	});

	if (!user) return 0;

	return user.count;
}
