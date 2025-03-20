"use client";

import { tools } from "@/app/(dashboard)/(routes)/dashboard/page";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Heading({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    const pathname = usePathname();
    const {
        icon: Icon,
        color,
        bgColor,
    } = tools.find((tool) => tool.href === pathname)!;

    return (
        <header className="p-4 lg:px-8 flex items-center gap-x-4 mx-auto">
            <div className={cn(bgColor, "p-2 rounded-md")}>
                <Icon className={cn(color, "w-8 h-8")} />
            </div>
            <div>
                <h1 className="font-extrabold text-3xl">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </header>
    );
}
