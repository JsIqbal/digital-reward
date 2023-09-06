import { DashHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GridIcon } from "lucide-react";
import { CampaignForm } from "./components/form";

const ImagePage = () => {
    const tool = {
        label: "Create & manage campaigns",
        icon: GridIcon,
        href: "/campaign",
        color: "text-green-900",
        bgColor: "bg-green-300",
    };

    return (
        <div className="h-full p-8 ">
            <DashHeader />
            <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full mb-12">
                <Card
                    key={tool.href}
                    className="p-4 border-black/5 shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer"
                >
                    <div className="flex items-center justify-between">
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
                    </div>
                </Card>
            </div>
            <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full mb-12 ">
                <CampaignForm />
            </div>
        </div>
    );
};

export default ImagePage;
