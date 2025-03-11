import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Dashboard page
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-800">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                {/* Navbar is a custom component. currently has UserButton from Clerk */}
                <NavBar />
                {children}
            </main>
        </div>
    );
}
