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
                {/* Load the Inter font */}
                <style>{`
                        ${inter.style}
                    `}</style>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
