"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    VideoIcon,
} from "lucide-react";
import Link from "next/link";

const tools = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
    },
    {
        title: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        title: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        title: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        title: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        title: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    },
];

export default function Dashboard() {
    return (
        <>
            <header className="mb-6">
                <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                    Explore the power of AI
                </h1>
                <p className="text-center text-sm md:text-md lg:text-lg font-light ">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </header>
            <main className="space-y-4">
                {tools.map((tool) => (
                    <div className="px-10" key={tool.href}>
                        <Link
                            href={tool.href}
                            className="flex flex-col max-w-lg md:max-w-xl mx-auto"
                        >
                            <Card className="p-5 flex flex-row items-center justify-between transition hover:shadow-md">
                                <div className="flex gap-x-4 items-center">
                                    <div
                                        className={cn(
                                            "w-fit p-2 rounded-md",
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
                                    <p className="font-semibold text-md md:text-lg">
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
