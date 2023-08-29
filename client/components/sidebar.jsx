"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SidebarLinks } from "./sidebar-links";

const montsserrat = Montserrat({
    weight: "700",
    subsets: ["latin"],
});

const Sidebar = () => {
    return (
        <div className="space-y-4 py-2 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-2 flex flex-col justify-start items-start flex-1">
                <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center gap-4 mb-16 mt-6"
                >
                    <div className="relative w-16 h-8 ">
                        <Image fill alt="Logo" src="/logo-new.png" />
                    </div>
                    <h1
                        className={cn(
                            "text-sm font-bold",
                            montsserrat.className
                        )}
                    >
                        DIGITAL REWARD
                    </h1>
                </Link>
                <SidebarLinks />
            </div>
        </div>
    );
};

export default Sidebar;
