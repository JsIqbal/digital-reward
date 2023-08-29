import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/config/site-config";
import { cn } from "@/lib/utils";

export const SidebarLinks = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-3 text-zinc-400 ps-[5%]">
            {routes.map((route) => {
                return (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                            "group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150",
                            pathname === route.href
                                ? "bg-white/10 text-white"
                                : ""
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <route.icon
                                className={cn("h-8 w-8 mr-3", `${route.color}`)}
                            />
                            <p className="text-xl font-semibold">
                                {route.label}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
