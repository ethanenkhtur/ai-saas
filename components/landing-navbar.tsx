"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LandingNavbar() {
	const { isSignedIn } = useAuth();

	return (
		<nav className="flex items-center justify-between p-4">
			<Link href={"/"}>
				<div className="relative">
					<Image src={"/logo.png"} fill alt="Logo" />
				</div>
				<h1 className="text-2xl font-bold text-white">Genius</h1>
			</Link>
			<div className="flex items-center">
				<Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
					<Button variant={"outline"} className="rounded-full">
						Get Started
					</Button>
				</Link>
			</div>
		</nav>
	);
}
