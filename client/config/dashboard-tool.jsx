import { Book, GridIcon, LayoutDashboard, ListChecks } from "lucide-react";

export const tools = [
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
];
