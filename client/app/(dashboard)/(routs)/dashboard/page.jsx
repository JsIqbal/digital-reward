"use client";

import { DashHeader } from "@/components/dashboard-header";
import useProfile from "@/hooks/user-profile";
import { DashboardTool } from "@/components/dashboard-tool";
import { KycForm } from "@/components/kyc-form";

const DashboardPage = () => {
    const userProfile = useProfile();

    return (
        <div className="h-full p-4">
            {(userProfile && (
                <DashHeader desc="Explore the Digital Reward" />
            )) || (
                <>
                    <DashHeader desc="Fill up the KYC form to continue." />
                    <KycForm />
                </>
            )}
            <div className="px-4 md:px-10 lg:px-20 xl:px-32 2xl:40 space-y-4 w-full">
                {userProfile && <DashboardTool />}
            </div>
        </div>
    );
};

export default DashboardPage;
