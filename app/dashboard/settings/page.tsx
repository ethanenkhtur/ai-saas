import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import checkSubscription from "@/lib/checkSubscription";

export default async function SettingsPage() {
	const isPro = await checkSubscription();

	return (
		<>
			<Heading title="Settings" description="Manage account settings" />
			<section className="space-y-4 px-4 lg:px-8">
				<p className="text-muted-foreground text-sm">
					{isPro
						? "You are currently on the pro plan."
						: "You are currently on the free plan."}
				</p>
				<SubscriptionButton isPro={isPro} />
			</section>
		</>
	);
}
