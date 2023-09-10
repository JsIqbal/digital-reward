"use client";

import { DashHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ListChecks } from "lucide-react";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import useCampaign from "@/hooks/campaign-data";

const ReportPage = () => {
    const { campaignData } = useCampaign();

    return (
        <div className="h-full p-4">
            <DashHeader />
            <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full">
                <Card className="p-4 border-black/5 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div
                            className={cn(
                                "p-2 w-fit rounded-md",
                                "bg-yellow-300"
                            )}
                        >
                            <ListChecks
                                className={cn("w-8 h-8", "text-yellow-900")}
                            />
                        </div>
                        <p className="font-semibold">
                            Download & Visualize Reports
                        </p>
                    </div>
                </Card>
                <div className="  w-full">
                    <DataTable columns={columns} data={campaignData} />
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
