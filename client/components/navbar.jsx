"use client";

import React from "react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    return (
        <div className="sticky top-0 flex items-center p-4 h-[7%]  bg-white shadow-md border-1  z-10">
            <MobileSidebar />
            <div className="flex w-full h-8 justify-end">
                User Button
            </div>
        </div>
    );
};

export default Navbar;
