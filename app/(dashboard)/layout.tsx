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
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
                    <div>
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <UserButton />
                </header>
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
