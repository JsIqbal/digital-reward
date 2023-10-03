import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "DIGITAL REWARD",
    description: "Your website description goes here",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo-new.png" />
                <style>{`
          ${inter.style}
        `}</style>

                <meta name="generator" content="Powered by Golang" />
            </head>
            <body className={inter.className}>
                <div className="h-full flex flex-col">{children}</div>
            </body>
        </html>
    );
}
