import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { checkUsageCount } from "@/lib/api_limit";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar apiLimitCount={await checkUsageCount()} />
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
