"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/loader";
import useDashboardLogic from "@/hooks/dashboard";
import useProfile from "@/hooks/user-profile";
import { KycComponent } from "@/components/kyc-component";
import { ApprovalCard } from "@/components/approval-card";

const DashboardLayout = ({ children }) => {
    const { isLoading, isSignedIn } = useDashboardLogic();
    const { profileStatus, approvalStatus, kyc } = useProfile();
    if (isLoading) {
        return <Loader />;
    }

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="h-full relative p-0">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 flex flex-col h-full">
                <Navbar />
                {profileStatus ? (
                    children
                ) : !profileStatus && !approvalStatus && kyc ? (
                    <ApprovalCard />
                ) : (
                    <KycComponent />
                )}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
            </main>
        </div>
    );
};

export default DashboardLayout;
