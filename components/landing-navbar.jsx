"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

const LandingNavabr = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <div className="relative w-16 h-8">
                    <Image fill alt="Logo" src="/logo-new.png" />
                </div>
                <h1
                    className={cn(
                        "text-2xl font-bold text-white",
                        font.className
                    )}
                >
                    DIGITAL REWARD
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button
                        variant="outline"
                        className="rounded-full bg-indigo-600 border-none font-bold text-white hover:bg-indigo-500 hover:text-white hover:scale-[103%] transition-all duration-150 shadow-lg"
                    >
                        {isSignedIn ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

export default LandingNavabr;
