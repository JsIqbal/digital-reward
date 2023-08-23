"use client";


import { redirect } from "next/navigation";
import Sidebar from "./components/sidebar";

const DashboardLayout = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    return token ? (
        <div className="h-full relative p-0">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 flex flex-col h-full">
                {children}
            </main>
        </div>
    ) : (
        redirect("/")
    );
};

export default DashboardLayout;
