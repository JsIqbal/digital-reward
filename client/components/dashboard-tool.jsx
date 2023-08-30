import { Card } from "./ui/card";
import { tools } from "@/config/dashboard-tool";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardTool = () => {
    const router = useRouter();
    return (
        <>
            {tools.map((tool) => (
                <Card
                    onClick={() => router.push(tool.href)}
                    key={tool.href}
                    className="p-4 border-black/5 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={cn("p-2 w-fit rounded-md", tool.bgColor)}
                        >
                            <tool.icon className={cn("w-8 h-8", tool.color)} />
                        </div>
                        <p className="font-semibold">{tool.label}</p>
                    </div>
                    <ArrowRight />
                </Card>
            ))}
        </>
    );
};
