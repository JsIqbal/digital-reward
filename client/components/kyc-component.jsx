import { FormInput } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import CreateProfile from "./kyc-form";

export const KycComponent = () => {
    return (
        <div className="px-4 md:px-10 lg:px-20 xl:px-6 2xl:40 space-y-4 w-full mt-5">
            <Card className="p-4 border-none shadow-none flex items-center justify-between ">
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

            <CreateProfile />
        </div>
    );
};
