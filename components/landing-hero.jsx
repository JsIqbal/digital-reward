"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best Platform for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600 py-5">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Digital Data Pack.",
                                "Bulk Reward Data.",
                                "Handling All Operator.",
                                "One Solution.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Handle campaigns using our platform 10x faster.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button
                        varient="outline"
                        className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r from-indigo-700 to-pink-600 hover:scale-[102%] transition-all duration-150 shadow-lg"
                    >
                        Start Joining From Today
                    </Button>
                </Link>
            </div>
        </div>
    );
};
