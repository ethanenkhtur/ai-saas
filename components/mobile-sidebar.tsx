"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

export default function MobileSidebar() {
    return (
        <Sheet>
            {/* adding asChild property below fixes the error of HTML Button Hydration error */}
            <SheetTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="md:hidden cursor-pointer"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}
