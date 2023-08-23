"use client"

import { ToastProvider } from "@/providers/toast-provider";
import { useEffect, useState } from "react";
import "../globals.css"
import DashboardLoading from "./loading";

const AdminLayout = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <html>
            <head>
                <title>Musesoft || Admin Login</title>
            </head>
            <body className="w-screen h-screen">
                <ToastProvider />
                {loaded ? children : <DashboardLoading/>}
            </body>
        </html>
    );
};

export default AdminLayout;
