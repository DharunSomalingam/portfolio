import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import React from "react";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Dharun Somalingam | Portfolio",
    description: "B.Sc Data Science & Computer Science student...",
    metadataBase: new URL('https://dharunsomalingam.com'),
    icons: {
        icon: '/icon', // This tells Google to look for the icon.tsx output
        apple: '/icon',
    },
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
        <Navbar />
        {children}
        </body>
        </html>
    );
}
