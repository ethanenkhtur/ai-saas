"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ImageIcon, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";

export const tools = [
	{
		title: "Conversation",
		icon: MessageSquare,
		href: "/dashboard/conversation",
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
	},
	{
		title: "Image Generation",
		icon: ImageIcon,
		href: "/dashboard/image",
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
	},
	{
		title: "Settings",
		icon: Settings,
		href: "/dashboard/settings",
		color: "text-gray-700",
		bgColor: "bg-gray-700/10",
	},
];

export default function Dashboard() {
	return (
		<>
			<header className="mb-6">
				<h1 className="mb-2 text-center text-3xl font-extrabold md:text-4xl lg:text-5xl">
					Explore the power of AI
				</h1>
				<p className="md:text-md text-center text-sm font-light lg:text-lg">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</header>
			<main className="space-y-4">
				{tools.map((tool) => (
					<div className="px-10" key={tool.href}>
						<Link
							href={tool.href}
							className="mx-auto flex max-w-lg flex-col md:max-w-xl"
						>
							<Card className="flex flex-row items-center justify-between p-5 transition hover:shadow-md">
								<div className="flex items-center gap-x-4">
									<div
										className={cn(
											"w-fit rounded-md p-2",
											tool.bgColor
										)}
									>
										<tool.icon
											className={cn(
												tool.color,
												"h-6 w-6 md:h-8 md:w-8"
											)}
										/>
									</div>
									<p className="text-md font-semibold md:text-lg">
										{tool.title}
									</p>
								</div>
								<ArrowRight />
							</Card>
						</Link>
					</div>
				))}
			</main>
		</>
	);
}
