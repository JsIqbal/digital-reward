"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import React from "react";
import { ToastContainer } from "react-toastify";

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        router.push("/sign-in");
        return null;
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
                {/* Same as */}
                <ToastContainer />
            </main>
        </div>
    );
};

export default DashboardLayout;
