"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import "react-toastify/dist/ReactToastify.css";
import useUser from "@/hooks/user-hook";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/loader";

const DashboardLayout = ({ children }) => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    if (!isSignedIn) {
        router.push("auth/sign-in");
        return <Loader />;
    }

    return (
        <div className="h-full relative p-0">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 flex flex-col h-full">
                <Navbar />
                {children}
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
