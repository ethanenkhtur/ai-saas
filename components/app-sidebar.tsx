"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FreeTierCounter from "./usage-counter";

const items = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		route: "/dashboard",
		color: "text-sky-500",
	},
	{
		title: "Conversation",
		icon: MessageSquare,
		route: "/dashboard/conversation",
		color: "text-violet-500",
	},
	{
		title: "Image Generation",
		icon: ImageIcon,
		route: "/dashboard/image",
		color: "text-pink-700",
	},
	{
		title: "Settings",
		icon: Settings,
		route: "/dashboard/settings",
	},
];

export function AppSidebar({ apiLimitCount = 0, isPro = false }) {
	const pathname = usePathname();

	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link
							href={"/dashboard"}
							className="ml-3 flex items-center px-2 py-4"
						>
							<Image
								src={"/logo.png"}
								alt="Logo"
								height={35}
								width={35}
								className="mr-4"
							/>
							<h1 className="text-2xl font-bold">Alldo</h1>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem
									key={item.title}
									className="ml-2"
								>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.route}
									>
										<Link href={item.route}>
											<item.icon className={item.color} />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<FreeTierCounter isPro={isPro} apiLimitCount={apiLimitCount} />
			</SidebarFooter>
		</Sidebar>
	);
}
