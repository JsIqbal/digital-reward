"use client";

import React from "react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
    return (
        <div className="sticky top-0 flex items-center p-4 h-[7%]  bg-white shadow-md border-1  z-10">
            <MobileSidebar />
            <div className="flex w-full h-8 justify-end">
                <ClerkLoading>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton className="h-10 w-10" />
                </ClerkLoaded>
            </div>
        </div>
    );
};

export default Navbar;
