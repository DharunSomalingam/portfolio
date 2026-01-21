"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import GlobalCursor from "@/components/GlobalCursor";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "@/components/Experience";
import Contact from "../components/Contact";
import Extracurricular from "@/components/Extracurricullars";

const ROLES = [
    { id: "01", title: "DATA ENGINEER", context: "Python // SQL // ETL", accent: "#fb923c" },
    { id: "02", title: "AI SPECIALIST", context: "Neural OCR // Mistral", accent: "#a855f7" },
    { id: "03", title: "DATA ANALYST", context: "R // Pandas // Stats", accent: "#0ea5e9" },
    { id: "04", title: "WEB DEVELOPER", context: "Flask // React // JS", accent: "#f43f5e" },
    { id: "05", title: "SYSTEM AUTOMATOR", context: "FastAPI // Docker", accent: "#10b981" },
    { id: "06", title: "SOLUTIONS ARCHITECT", context: "UX // Strategy", accent: "#64748b" }
];

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: mounted ? containerRef : undefined,
        offset: ["start start", "end end"]
    });

    const planeX = useTransform(scrollYProgress, [0, 0.25], [0, 1500]);
    const planeY = useTransform(scrollYProgress, [0, 0.25], [0, -1200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROLES.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [mounted]);

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        // Added 'cursor-none' here to hide system mouse globally
        <main ref={containerRef} className="relative bg-[#FFFAF3] min-h-screen w-full cursor-none overflow-x-hidden selection:bg-orange-500">

            {/* FIX 1: Force Cursor to be the absolute top layer */}
            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <GlobalCursor />
            </div>

            {/* --- HERO SECTION --- */}
            <motion.section
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative h-screen w-full flex items-center justify-center overflow-hidden sticky top-0 z-10"
            >
                {/* 1. BACKGROUND */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{
                            backgroundColor: ROLES[index].accent,
                            scale: [1, 1.1, 1],
                            opacity: [0.08, 0.15, 0.08]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{ borderColor: ROLES[index].accent }}
                        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"
                    />

                    {/* UFO */}
                    <motion.div
                        animate={{ x: [-200, 1600], y: [100, 400], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                        className="absolute z-0"
                    >
                        <svg width="120" height="60" viewBox="0 0 24 12" fill="none">
                            <motion.ellipse animate={{ stroke: ROLES[index].accent }} cx="12" cy="6" rx="10" ry="3" strokeWidth="0.5" />
                            <motion.path animate={{ stroke: ROLES[index].accent }} d="M7 6C7 3 9 2 12 2C15 2 17 6 17 6" strokeWidth="0.5" />
                            <motion.circle animate={{ fill: ROLES[index].accent, opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} cx="12" cy="9" r="1" />
                        </svg>
                        <span className="font-mono text-[7px] text-slate-400 tracking-[0.4em] uppercase">Tracking_Node_0{index}</span>
                    </motion.div>

                    {/* AIRPLANE */}
                    <motion.div style={{ x: planeX, y: planeY, left: "15%", top: "25%" }} className="absolute z-20">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="0.4">
                            <path d="M22 2L2 9L11 13L15 22L22 2Z" />
                            <motion.path animate={{ stroke: ROLES[index].accent }} d="M11 13L22 2" strokeDasharray="2 2" />
                        </svg>
                    </motion.div>

                    {/* DATA STREAMS */}
                    <div className="absolute inset-0 opacity-10 font-mono text-[8px] text-slate-400">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -100], opacity: [0, 1, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: i * 1 }}
                                className="absolute"
                                style={{ left: `${20 * i}%`, bottom: "10%" }}
                            >
                                {`0x${index}${i}F_STREAM`}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. TYPOGRAPHY */}
                <div className="relative z-10 w-full max-w-7xl px-8 md:px-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div animate={{ backgroundColor: ROLES[index].accent, width: [0, 60, 40] }} className="h-[2px]" />
                                <span className="font-mono text-slate-900 text-[10px] font-black tracking-[0.4em] uppercase">
                                    {index === 0 && "Inbound // Pipeline_Staged"}
                                    {index === 1 && "Compute // Neural_Nodes"}
                                    {index === 2 && "Query // Analytics_Engine"}
                                    {index === 3 && "Render // Client_Interface"}
                                    {index === 4 && "System // Workflow_Automated"}
                                    {index === 5 && "Design // Blueprint_Validated"}
                                </span>
                            </div>

                            <h1 className="text-[12vw] md:text-[10vw] font-black text-slate-950 leading-[0.78] tracking-tighter uppercase">
                                {ROLES[index].title.split(" ").map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? "text-stroke block" : "block"}>{word}</span>
                                ))}
                            </h1>

                            <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
                                <motion.div animate={{ borderColor: ROLES[index].accent }} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border-l-4 shadow-xl">
                                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Stack Initialize</p>
                                    <p className="text-xl font-black text-slate-900 uppercase italic">{ROLES[index].context}</p>
                                </motion.div>

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 3. HUD */}
                <div className="absolute bottom-10 w-full px-12 flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            {ROLES.map((_, i) => (
                                <motion.div key={i} animate={{ width: i === index ? 48 : 8, backgroundColor: i === index ? ROLES[index].accent : "#cbd5e1" }} className="h-1.5 rounded-full transition-all duration-700" />
                            ))}
                        </div>
                        <div className="font-mono text-[9px] text-slate-400 flex gap-4 uppercase tracking-widest">
                            <span>UWA_SYS: ON</span>
                            <motion.span animate={{ color: ROLES[index].accent }}>COLOR_CODE: {ROLES[index].accent}</motion.span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.div animate={{ height: [30, 90, 30], backgroundColor: [ROLES[index].accent, "#0f172a", ROLES[index].accent] }} transition={{ repeat: Infinity, duration: 3 }} className="w-[2px]" />
                        <span className="font-mono text-[8px] text-slate-900 font-black tracking-[0.5em] uppercase mt-4">Scroll Down</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-4">
                            <motion.div animate={{ backgroundColor: ROLES[index].accent }} className="w-2 h-2 rounded-full animate-ping" />
                        </div>
                        <span className="font-mono text-[10px] text-slate-950 font-black uppercase">Dharun Somalingam</span>
                        <span className="font-mono text-[8px] text-slate-400 uppercase mt-1 tracking-tighter">B.Sc Data Science // Computer Science</span>
                    </div>
                </div>
            </motion.section>

            {/* --- SUB-SURFACE CONTENT --- */}
            {/* FIX 2: Added z-20 to ensure it sits over Hero, but GlobalCursor at z-[9999] sits over this */}
            <motion.div
                animate={{ backgroundColor: ROLES[index].accent }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="relative z-20 shadow-[-20px_0_120px_rgba(0,0,0,0.12)] rounded-t-[5rem] -mt-[8vh] overflow-hidden"
            >
                <div className="bg-[#FFFAF3]/90 backdrop-blur-xl rounded-t-[5rem] cursor-none">
                    <About />
                    <Projects />
                    <Experience />
                    <Extracurricular />
                    <Contact />
                </div>
            </motion.div>

            <style jsx global>{`
                .text-stroke { -webkit-text-stroke: 1.5px #0f172a; color: transparent; }
                .text-stroke:hover { color: #0f172a; -webkit-text-stroke: 1.5px transparent; }
            `}</style>
        </main>
    );
}