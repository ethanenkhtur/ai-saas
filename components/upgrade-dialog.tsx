"use client";

import { tools } from "@/app/dashboard/page";
import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "./ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpgradeDialog() {
	const [isLoading, setLoading] = useState<boolean>();
	const proModel = useProModel();
	const router = useRouter();

	async function onSubscribe() {
		try {
			setLoading(true);

			const response = await axios.post("/api/stripe");

			router.replace(response.data.url);
		} catch (error: any) {
			console.error("STRIPE_CLIENT_WEBHOOK", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
			<DialogContent className="space-y-3">
				<DialogTitle className="flex items-center justify-center gap-x-2.5">
					Upgrade to Alldo
					<Badge variant={"premium"} className="text-sm uppercase">
						PRO
					</Badge>
				</DialogTitle>
				<DialogDescription>
					You are out of free usage.
				</DialogDescription>
				<div className="flex flex-col gap-y-4">
					{tools.map((tool) => (
						<Card
							key={tool.title}
							className="flex flex-row items-center justify-between p-3 transition"
						>
							<div className="flex items-center gap-x-3">
								<div
									className={cn(
										"w-fit rounded-md p-2",
										tool.bgColor
									)}
								>
									<tool.icon
										className={cn(tool.color, "h-6 w-6")}
									/>
								</div>
								<p className="text-md font-semibold">
									{tool.title}
								</p>
							</div>
							<Check className="text-primary" />
						</Card>
					))}
				</div>
				<DialogFooter>
					<Button
						onClick={onSubscribe}
						className="bg-primary w-full cursor-pointer"
					>
						Upgrade
						<Zap className="fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
