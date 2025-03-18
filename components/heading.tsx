import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

// icon: Icon below is destructing with renaming, a concept in JS, turning the icon parameter into a local variable (Component) called Icon. it is NOT type assignment from TS!
export default function Heading({ icon: Icon, ...props }: HeadingProps) {
    return (
        <header className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 w-full">
            <div className={cn("p-2 w-fit rounded-md", props.bgColor)}>
                <Icon className={cn("w-10 h-10", props.iconColor)} />
            </div>
            <div>
                <h2 className="text-3xl font-bold">{props.title}</h2>
                <p className="text-sm text-muted-foreground">
                    {props.description}
                </p>
            </div>
        </header>
    );
}
