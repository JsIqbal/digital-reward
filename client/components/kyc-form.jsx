import { FormInput } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export const KycForm = () => {
    return (
        <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full">
            <Card className="p-4 border-black/5 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-white/30  transition duration-150 cursor-pointer">
                <div className="flex items-center gap-4">
                    <div
                        className={cn("p-2 w-fit rounded-md", "bg-yellow-300")}
                    >
                        <FormInput
                            className={cn("w-8 h-8", "text-yellow-900")}
                        />
                    </div>
                    <p className="font-semibold">Know your customer form</p>
                </div>
            </Card>
        </div>
    );
};
