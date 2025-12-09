'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: "Lifestyle", href: '/lifestyle' },
        { name: 'Contact', href: '/contact' },
        { name: 'Socials', href: '/socials' }
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed w-full bg-[#E0E0E0]/90 backdrop-blur-md z-50 px-6 py-6 flex items-center justify-between"
        >
            <div className="flex items-center">
                {/* Place your logo here if needed */}
            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex space-x-6 text-[#1A1A1A] font-semibold">
                {navLinks.map(link => (
                    <li key={link.name} className="hover:text-blue-500 transition-colors">
                        <Link href={link.href}>{link.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Mobile menu button */}
            <div className="md:hidden text-[#1A1A1A] text-2xl" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <FiMenu />}
            </div>

            {/* Mobile menu */}
            {open && (
                <motion.ul
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 w-full bg-[#EFEFEF] flex flex-col items-center shadow-md"
                >
                    {navLinks.map(link => (
                        <li key={link.name} className="hover:text-blue-500 transition-colors py-3">
                            <Link href={link.href} onClick={() => setOpen(false)}>{link.name}</Link>
                        </li>
                    ))}
                </motion.ul>
            )}
        </motion.nav>
    );
}
