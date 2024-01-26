import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ModaResa",
    description: "Connecting staff members with clients",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <DataProvider>
                <body className={inter.className}>{children}</body>
            </DataProvider>
        </html>
    );
}
