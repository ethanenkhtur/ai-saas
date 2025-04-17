"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

export default function SubscriptionButton(props: { isPro: boolean }) {
	const [isLoading, setLoading] = useState<boolean>(false);

	async function onClick() {
		try {
			setLoading(true);

			const response = await axios.post("/api/stripe");

			window.location.href = response.data.url;
		} catch (error) {
			if (error instanceof Error) console.error(error.message);

			console.error("Unidentified error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Button
			variant={props.isPro ? "default" : "premium"}
			onClick={onClick}
			disabled={isLoading}
		>
			{props.isPro ? "Manage subscription" : "Upgrade"}
			{!props.isPro && <Zap />}
		</Button>
	);
}
