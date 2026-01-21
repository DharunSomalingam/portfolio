"use client";

import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaFingerprint, FaArrowRight } from "react-icons/fa";

const activities = [
    { title: 'Ezy Math Tutoring', role: 'Academic Tutor', description: 'Mentoring K-12 students to build mathematical confidence and mastery through tailored pedagogical strategies and curriculum design.', icon: '/icons/math.png', category: 'Education', accent: '#FF6B00' },
    { title: 'SBS Services', role: 'Industrial Specialist', description: 'Executing heavy industrial maintenance and technical troubleshooting within high-stakes, high-pressure environments.', icon: '/icons/industry.png', category: 'Industry', accent: '#333333' },
    { title: "Nando's", role: 'Operations Team', description: 'Optimizing high-velocity service and logistics in a front-line hospitality hub, ensuring seamless workflow and engagement.', icon: '/icons/restaurant.png', category: 'Hospitality', accent: '#E51B24' },
    { title: 'Uni-Mentor', role: 'Peer Leader', description: 'Fostering academic inclusivity and providing holistic guidance for the university community to bridge the gap for new students.', icon: '/icons/mentor.png', category: 'Leadership', accent: '#005CB9' },
    { title: 'Swan Estuary', role: 'Stewardship', description: 'Hands-on environmental conservation and community-led sustainability projects focused on habitat restoration and protection.', icon: '/icons/environment.png', category: 'Environment', accent: '#2E7D32' },
];

export default function Extracurricular() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Auto-scroll logic kept exactly as you liked it
    const [baseX, setBaseX] = useState(0);
    useEffect(() => {
        let requestRef: number;
        const animate = () => {
            setBaseX((prev) => prev - 0.05);
            requestRef = requestAnimationFrame(animate);
        };
        requestRef = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef);
    }, []);

    const xRow1 = useTransform(scrollYProgress, [0, 1], [`${baseX}%`, `${baseX - 25}%`]);
    const xRow2 = useTransform(scrollYProgress, [0, 1], [`${-baseX - 30}%`, `${-baseX}%`]);
    const xRow3 = useTransform(scrollYProgress, [0, 1], [`${baseX - 10}%`, `${baseX - 40}%`]);

    return (
        <section id="extracurricular" ref={sectionRef} className="relative w-full py-64 px-6 sm:px-20 bg-[#FFFAF3] overflow-hidden cursor-none">

            {/* BACKGROUND SCROLLING ITEMS - Kept exactly the same */}
            <div className="absolute inset-0 flex flex-col justify-around py-10 pointer-events-none select-none opacity-[0.06] z-0">
                <motion.h2 style={{ x: xRow1 }} className="text-[22vw] font-black uppercase tracking-tighter whitespace-nowrap text-slate-900 leading-none">
                    VERSATILITY • IMPACT • LEADERSHIP • VERSATILITY • IMPACT •
                </motion.h2>
                <motion.h2 style={{ x: xRow2 }} className="text-[22vw] font-black uppercase italic tracking-tighter whitespace-nowrap text-orange-500 leading-none">
                    STEWARDSHIP • ACADEMICS • INDUSTRY • STEWARDSHIP • ACADEMICS •
                </motion.h2>
                <motion.h2 style={{ x: xRow3 }} className="text-[22vw] font-black uppercase tracking-tighter whitespace-nowrap text-slate-900 leading-none">
                    COMMUNITY • EVOLUTION • MASTERY • COMMUNITY • EVOLUTION •
                </motion.h2>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="mb-56">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="h-[1px] w-12 bg-orange-500" />
                        <span className="font-mono text-orange-600 text-[10px] font-bold tracking-[0.5em] uppercase italic">Beyond Technical // Archive</span>
                    </motion.div>

                    <h2 className="text-[12vw] lg:text-[10rem] font-black text-slate-900 leading-[0.8] tracking-tighter uppercase">
                        BEYO<span className="text-orange-500 italic">ND</span><br />
                        THE SCREEN<span className="text-orange-500">.</span>
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                    {activities.map((act, idx) => (
                        <TactileCard key={idx} act={act} index={idx} />
                    ))}
                </div>
            </div>

            <MagneticCursor />
        </section>
    );
}

function TactileCard({ act, index }: { act: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-10%" });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative flex flex-col p-10 bg-white/40 border border-slate-200/50 rounded-[3.5rem] backdrop-blur-xl hover:bg-white transition-all duration-500 shadow-2xl shadow-slate-900/5"
        >
            {/* CONTAINER SIZE KEPT - Only Image size decreased for elegance */}
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative w-full aspect-square bg-[#FBFBFA] rounded-[2.8rem] flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner group-hover:bg-white transition-all duration-700"
            >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                     style={{ background: `radial-gradient(circle at 50% 50%, ${act.accent}10, transparent 70%)` }}
                />

                {/* LOGO - Reduced size to w-32 h-32 for better white space */}
                <motion.div className="relative w-32 h-32" style={{ transform: "translateZ(30px)" }}>
                    <Image
                        src={act.icon}
                        alt={act.title}
                        fill
                        className="object-contain transition-all duration-700 group-hover:scale-110"
                        priority
                    />
                </motion.div>

                <div className="absolute bottom-6 left-6 w-2 h-2 border-b-2 border-l-2 border-slate-200" />
                <div className="absolute top-6 right-6 w-2 h-2 border-t-2 border-r-2 border-slate-200" />
            </div>

            {/* CONTENT AREA */}
            <div className="mt-10 px-2" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center gap-3 mb-4">
                    <FaFingerprint className="text-orange-500 group-hover:animate-pulse" size={16} />
                    <span className="text-orange-600 font-mono text-[11px] font-black uppercase tracking-[0.4em]">{act.role}</span>
                </div>

                <h3 className="text-4xl font-black text-slate-900 mb-5 tracking-tighter leading-[0.9]">
                    {act.title}
                </h3>

                <p className="text-slate-500 text-[16px] leading-relaxed font-medium">
                    {act.description}
                </p>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.category}</span>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase cursor-pointer"
                    >
                        Verify Record <FaArrowRight size={10} />
                    </motion.div>
                </div>
            </div>

            {/* Numeric badge removed as requested */}
        </motion.div>
    );
}

function MagneticCursor() {
    const mouseX = useSpring(useMotionValue(0), { stiffness: 450, damping: 30 });
    const mouseY = useSpring(useMotionValue(0), { stiffness: 450, damping: 30 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
        const enter = () => setIsHovering(true);
        const leave = () => setIsHovering(false);
        window.addEventListener("mousemove", move);
        document.querySelectorAll('.group').forEach(el => {
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', leave);
        });
        return () => window.removeEventListener("mousemove", move);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        >
            <motion.div
                animate={{
                    width: isHovering ? 130 : 12,
                    height: isHovering ? 130 : 12,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "rgba(249, 115, 22, 1)"
                }}
                className="rounded-full border border-orange-500 flex items-center justify-center backdrop-blur-[2px] transition-all duration-500"
            >
                <AnimatePresence>
                    {isHovering && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[11px] font-black text-orange-600 uppercase tracking-tighter"
                        >
                            Impact
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}