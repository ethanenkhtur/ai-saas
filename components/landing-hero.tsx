"use client";

import Typewriter from "typewriter-effect";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LandingHero() {
	const { isSignedIn } = useAuth();

	return (
		<section className="space-y-5 py-36 text-center font-bold text-white">
			<header className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
				<h1>The Best AI Tool for</h1>
				<div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
					<Typewriter
						options={{
							strings: ["Chatbot.", "Image Generation."],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</header>
			<p className="text-sm font-light md:text-xl">
				Create content using AI 10x faster
			</p>
			<Button
				variant={"premium"}
				className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
			>
				<Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
					Start Generating For Free
				</Link>
			</Button>
			<p className="md:text-s text-xs font-normal">
				No credit card required.
			</p>
		</section>
	);
}
