import {
    Book,
    GridIcon,
    Home,
    LayoutDashboard,
    ListChecks,
    MessageSquareIcon,
} from "lucide-react";

export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-purple-500",
    },

    {
        label: "Campaign",
        icon: GridIcon,
        href: "/campaign",
        color: "text-green-500",
    },
    {
        label: "Report",
        icon: ListChecks,
        href: "/report",
        color: "text-yellow-500",
    },
    {
        label: "Documentation",
        icon: Book,
        href: "/docs",
        color: "text-orange-500",
    },
    {
        label: "Home",
        icon: Home,
        href: "/",
        color: "text-blue-500",
    },
];
