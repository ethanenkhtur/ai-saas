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
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    Settings,
    VideoIcon,
} from "lucide-react";
import Link from "next/link";

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
        route: "/conversation",
        color: "text-violet-500",
    },
    {
        title: "Image Generation",
        icon: ImageIcon,
        route: "/image",
        color: "text-pink-700",
    },
    {
        title: "Video Generation",
        icon: VideoIcon,
        route: "/video",
        color: "text-orange-700",
    },
    {
        title: "Music Generation",
        icon: Music,
        route: "/music",
        color: "text-emerald-500",
    },
    {
        title: "Code Generation",
        icon: Code,
        route: "/code",
        color: "text-green-700",
    },
    {
        title: "Settings",
        icon: Settings,
        route: "/settings",
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
            <SidebarFooter />
        </Sidebar>
    );
}
