// "use client";

// import { cn } from "@/lib/utils";
// import { Montserrat } from "next/font/google";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";

// const font = Montserrat({
//     weight: "600",
//     subsets: ["latin"],
// });

// const LandingNavabr = () => {
//     return (
//         <nav className="p-4 bg-transparent flex items-center justify-between">
//             <Link href="/" className="flex items-center gap-3">
//                 <div className="relative w-16 h-8">
//                     <Image fill alt="Logo" src="/logo-new.png" />
//                 </div>
//                 <h1
//                     className={cn(
//                         "text-2xl font-bold text-white",
//                         font.className
//                     )}
//                 >
//                     DIGITAL REWARD
//                 </h1>
//             </Link>
//             <div className="flex items-center gap-x-2">
//                 <Link href={true ? "/dashboard" : "/sign-up"}>
//                     <Button
//                         variant="outline"
//                         className="rounded-full bg-indigo-600 border-none font-bold text-white hover:bg-indigo-500 hover:text-white hover:scale-[103%] transition-all duration-150 shadow-lg"
//                     >
//                         {true ? "Dashboard" : "Get Started"}
//                     </Button>
//                 </Link>
//             </div>
//         </nav>
//     );
// };

// export default LandingNavabr;

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

import { Button } from "./ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

const LandingNavabr = () => {
    // Check if the token cookie exists
    const tokenExists = Cookies.get("token");

    // Check if loggedIn and userType are stored in localStorage
    const loggedIn = localStorage.getItem("loggedIn");
    const userType = localStorage.getItem("userType");

    // Determine whether to show Dashboard or Get Started button
    const showDashboardButton = tokenExists && loggedIn && userType;

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
                <Link href={showDashboardButton ? "/dashboard" : "/sign-up"}>
                    <Button
                        variant="outline"
                        className="rounded-full bg-indigo-600 border-none font-bold text-white hover:bg-indigo-500 hover:text-white hover:scale-[103%] transition-all duration-150 shadow-lg"
                    >
                        {showDashboardButton ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

export default LandingNavabr;
