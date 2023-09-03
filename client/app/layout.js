import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "DIGITAL REWARD",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo-new.png" />
                <style>{`
                        ${inter.style}
                    `}</style>
            </head>
            <body className={inter.className}>
                <div className="h-full flex flex-col">
                    {children}
                    <footer className="bg-gray-800  shadow  dark:bg-gray-800 mt-auto">
                        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                            <span className="text-sm text-white sm:text-center dark:text-white">
                                © 2023{" "}
                                <a
                                    target="_blank"
                                    href="https://ada-asia.com/whoweare/offices/bangladesh"
                                    className="hover:underline"
                                >
                                    ADA-BD
                                </a>
                                . All Rights Reserved.
                            </span>
                            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
                                <li className="flex gap-3 mr-4">
                                    Powered by CES |
                                </li>
                                <li className="flex gap-3">
                                    Contact us:
                                    <p className="hover:underline">
                                        ada-bd@ada-asia.com
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
