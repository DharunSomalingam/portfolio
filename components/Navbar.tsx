'use client'

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiLayers, FiTerminal, FiActivity } from "react-icons/fi";
import Extracurricular from "@/components/Extracurricullars";
import Experience from "@/components/Experience";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setIsScrolled(latest > 50);
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    if (!mounted) return null;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href:'#projects' },
        { name: 'Exp.', href: '#experience' },
        { name: 'Extra', href: '#extracurricular' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <motion.nav
            variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-full z-[999] px-4 md:px-10 py-6"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    animate={{
                        padding: isScrolled ? "10px 20px" : "18px 30px",
                        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)"
                    }}
                    className="relative flex items-center justify-between backdrop-blur-3xl border border-white/30 shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500"
                >
                    {/* Logo Section */}
                    <Link href="/">
                        <div className="flex items-center gap-4 cursor-pointer relative z-10">
                            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-orange-500 shadow-xl">
                                <FiLayers size={22} />
                            </div>
                            <div className="hidden sm:flex flex-col text-left">
                                <span className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">Dharun</span>
                                <span className="text-[8px] font-black text-orange-600 uppercase tracking-[0.3em] mt-1 text-left">SOMALINGAM</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center bg-gray-900/5 rounded-2xl p-1 border border-gray-900/5">
                        {navLinks.map((link) => (
                            <MagneticLink key={link.name} href={link.href} name={link.name} />
                        ))}
                    </div>

                    {/* Status & CTA */}
                    <div className="flex items-center gap-4">
                        <div className="hidden xl:flex flex-col items-end mr-2 text-right">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-900 uppercase">
                                Active <FiActivity size={10} className="text-green-500 animate-pulse" />
                            </div>
                        </div>
                        <Link
                            href="/Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg"
                        >
                            Execute <br /> Resume
                        </Link>
                        <button className="lg:hidden p-3 bg-gray-100 rounded-xl" onClick={() => setOpen(!open)}>
                            {open ? <FiX size={20}/> : <FiMenu size={20}/>}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full p-4 lg:hidden"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl flex flex-col gap-4 border border-white">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="text-3xl font-black text-gray-900 uppercase tracking-tighter hover:text-orange-600">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

// React 19 Optimized Magnetic Link
function MagneticLink({ href, name }: { href: string, name: string }) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = linkRef.current?.getBoundingClientRect();
        if (rect) {
            x.set(e.clientX - (rect.left + rect.width / 2));
            y.set(e.clientY - (rect.top + rect.height / 2));
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link
            href={href}
            ref={linkRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative px-6 py-2.5 flex items-center justify-center group"
        >
            <motion.span
                style={{ x: springX, y: springY }}
                className="relative z-10 text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest transition-colors duration-300 pointer-events-none"
            >
                {name}
            </motion.span>
            <motion.div className="absolute inset-0 bg-white shadow-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
}