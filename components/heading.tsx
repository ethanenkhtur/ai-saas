"use client";

import { tools } from "@/app/dashboard/page";
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
    <header className="mx-auto flex items-center gap-x-4 p-4 lg:px-8">
      <div className={cn(bgColor, "rounded-md p-2")}>
        <Icon className={cn(color, "h-8 w-8")} />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </header>
  );
}
