import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import React from "react";

// Font setup
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Page metadata
export const metadata: Metadata = {
    title: "Dharun Somalingam | Portfolio",
    description: "B.Sc Data Science & Computer Science student. Specialising in Python, SQL, ETL Pipelines, and AI integration. View my projects and technical expertise.",
};

// ✅ Only ONE default export here!
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
