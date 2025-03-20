import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <nav className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
                    <SidebarTrigger className="-ml-1 md:invisible" />
                    <UserButton />
                </nav>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
