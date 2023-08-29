"use client";

import { DashHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Book,
    GridIcon,
    LayoutDashboard,
    ListChecks,
    MessageSquareIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-purple-900",
        bgColor: "bg-purple-300",
    },

    {
        label: "Create & manage campaigns",
        icon: GridIcon,
        href: "/campaign",
        color: "text-green-900",
        bgColor: "bg-green-300",
    },
    {
        label: "Download & Visualize Reports",
        icon: ListChecks,
        href: "/report",
        color: "text-yellow-900",
        bgColor: "bg-yellow-300",
    },
    {
        label: "See Through The Documentation",
        icon: Book,
        href: "/docs",
        color: "text-orange-900",
        bgColor: "bg-orange-300",
    },
    // {
    //     label: "Chat with AI",
    //     icon: MessageSquareIcon,
    //     href: "/chat",
    //     color: "text-blue-900",
    //     bgColor: "bg-blue-300",
    // },
];

const DashboardPage = () => {
    const router = useRouter();
    return (
        <div className="h-full p-4">
            <DashHeader />
            <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={cn(
                                    "p-2 w-fit rounded-md",
                                    tool.bgColor
                                )}
                            >
                                <tool.icon
                                    className={cn("w-8 h-8", tool.color)}
                                />
                            </div>
                            <p className="font-semibold">{tool.label}</p>
                        </div>
                        <ArrowRight />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
