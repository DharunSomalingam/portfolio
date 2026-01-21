"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Custom SVG Icons
const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const WhatsappIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);

const SatelliteIcon = ({ size = 14 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M13 7 9 3 5 7l4 4"/>
        <path d="m17 11 4 4-4 4-4-4"/>
        <path d="m8 12 4 4 6-6-4-4Z"/>
        <path d="m16 8 3-3"/>
        <path d="M9 21a6 6 0 0 0-6-6"/>
    </svg>
);

const ArrowRightIcon = ({ size = 18 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
    </svg>
);

const CONTACT_NODES = [
    {
        id: "LNK-01",
        name: "LINKEDIN",
        handle: "Dharun Somalingam",
        color: "#0077B5",
        icon: <LinkedinIcon />,
        link: "https://linkedin.com/in/dharunsomalingam",
        detail: "Connect With Linkedin"
    },
    {
        id: "INST-02",
        name: "INSTAGRAM",
        handle: "@Dharunsomalingam",
        color: "#E1306C",
        icon: <InstagramIcon />,
        link: "https://instagram.com/dharunsomalingam/",
        detail: "Connect With Instagram "
    },
    {
        id: "WA-03",
        name: "WHATSAPP",
        handle: "Dharun Somalingam",
        color: "#25D366",
        icon: <WhatsappIcon />,
        link: "https://wa.me/61414044864",
        detail: "Contact With Whatsapp"
    },
    {
        id: "MAIL-04",
        name: "EMAIL",
        handle: "dharun2004.s@gmail.com",
        color: "#EA580C",
        icon: <MailIcon />,
        link: "mailto:...",
        detail: "Contact With Email"
    }
];

export default function Contact() {
    const [mounted, setMounted] = useState(false);
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 350 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 350 });

    useEffect(() => {
        setMounted(true);
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        <section id="contact" ref={containerRef} className="relative w-full min-h-screen py-32 px-8 bg-[#FFFAF3] overflow-hidden flex flex-col items-center justify-center" style={{ cursor: activeNode ? 'none' : 'auto' }}>

            {/* MEGA ENHANCED ANIMATED BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Animated Mesh Gradient */}
                <motion.div
                    animate={{
                        x: [0, 150, 0],
                        y: [0, -120, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-300/40 via-orange-400/30 to-rose-300/20 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -120, 0],
                        y: [0, 150, 0],
                        scale: [1, 1.4, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-200/50 via-amber-200/30 to-yellow-200/20 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 100, -100, 0],
                        y: [0, -100, 100, 0],
                        scale: [1, 1.2, 1.1, 1]
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-400/30 via-orange-300/20 to-transparent blur-3xl"
                />

                {/* Dynamic Grid with Parallax */}
                <motion.div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: 'radial-gradient(#ea580c 2px, transparent 2px)',
                        backgroundSize: '60px 60px',
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02
                    }}
                />

                {/* Animated Lines */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`line-${i}`}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
                        style={{
                            top: `${15 + i * 15}%`,
                            left: 0,
                            right: 0,
                        }}
                        animate={{
                            scaleX: [0, 1, 0],
                            x: ['-100%', '0%', '100%']
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Floating Orbs with Mouse Follow */}
                {[...Array(20)].map((_, i) => {
                    const size = Math.random() * 6 + 2;
                    return (
                        <motion.div
                            key={`orb-${i}`}
                            className="absolute rounded-full"
                            style={{
                                width: size,
                                height: size,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: i % 3 === 0 ? '#ea580c' : i % 3 === 1 ? '#fb923c' : '#fdba74',
                                opacity: 0.3,
                                x: mousePosition.x * (Math.random() * 0.01 - 0.005),
                                y: mousePosition.y * (Math.random() * 0.01 - 0.005)
                            }}
                            animate={{
                                y: [0, -40, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.2, 0.6, 0.2],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3
                            }}
                        />
                    );
                })}

                {/* Geometric Shapes */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`shape-${i}`}
                        className="absolute border-2 border-orange-500/10"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            borderRadius: i % 2 === 0 ? '50%' : '20%',
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                {/* Data Stream Effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`stream-${i}`}
                            className="absolute font-mono text-orange-500/20 text-xs whitespace-nowrap"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: -20
                            }}
                            animate={{
                                y: ['0vh', '110vh']
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear"
                            }}
                        >
                            {`${Math.random().toString(36).substring(2, 15)}`.toUpperCase()}
                        </motion.div>
                    ))}
                </div>

                {/* Active Node Effect */}
                <AnimatePresence>
                    {activeNode && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                            >
                                <motion.span
                                    animate={{
                                        rotate: [0, 3, -3, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="font-mono text-[22vw] font-black text-orange-600/[0.05] whitespace-nowrap uppercase italic tracking-tighter"
                                >
                                    {activeNode}
                                </motion.span>
                            </motion.div>

                            {/* Ripple Effect */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-32 h-32 border-4 border-orange-500 rounded-full" />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <header className="mb-32 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
                    >
                        <motion.span
                            animate={{
                                scaleX: [1, 1.3, 1],
                                boxShadow: ['0 0 0px #ea580c', '0 0 20px #ea580c', '0 0 0px #ea580c']
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="h-[3px] w-16 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                        />
                        <span className="font-mono text-orange-600 text-[11px] font-black tracking-[0.4em] uppercase">Uplink Protocols // Phase 04</span>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <SatelliteIcon size={14} />
                        </motion.div>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[10vw] lg:text-[8vw] font-black text-slate-900 tracking-tighter leading-[0.85] uppercase mb-6"
                    >
                        ESTABLISH <br />
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 italic inline-block"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            CONNECTION.
                        </motion.span>
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-lg max-w-2xl font-medium"
                    >
                        Select your preferred communication channel. All systems are operational and ready for transmission.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CONTACT_NODES.map((node, idx) => (
                        <ContactNode
                            key={node.id}
                            node={node}
                            index={idx}
                            setActiveNode={setActiveNode}
                            isHovered={hoveredIndex === idx}
                            setHoveredIndex={setHoveredIndex}
                            mousePosition={mousePosition}
                        />
                    ))}
                </div>

                {/* Enhanced Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-32 border-t-2 border-slate-200/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 font-mono"
                >
                    <div className="flex items-center gap-6">
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative"
                        >
                            <div className="w-4 h-4 rounded-full bg-green-500" />
                            <motion.div
                                className="absolute inset-0 w-4 h-4 rounded-full bg-green-500"
                                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Signal: <span className="text-green-600">Optimal (99.9%)</span></span>
                    </div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ●
                        </motion.span>
                        Awaiting transmission...
                    </div>
                </motion.div>
            </div>

            {/* Enhanced Cursor */}
            <AnimatePresence>
                {activeNode && <ContactCursor mouseX={smoothX} mouseY={smoothY} color={CONTACT_NODES.find(n => n.name === activeNode)?.color} />}
            </AnimatePresence>
        </section>
    );
}

function ContactNode({ node, index, setActiveNode, isHovered, setHoveredIndex, mousePosition }: any) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (cardRef.current && isHovered) {
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            setCardPosition({ x: centerX, y: centerY });
        }
    }, [isHovered, mousePosition]);

    const offsetX = isHovered ? (mousePosition.x - cardPosition.x) * 0.03 : 0;
    const offsetY = isHovered ? (mousePosition.y - cardPosition.y) * 0.03 : 0;

    return (
        <motion.a
            ref={cardRef}
            href={node.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            onMouseEnter={() => {
                setActiveNode(node.name);
                setHoveredIndex(index);
            }}
            onMouseLeave={() => {
                setActiveNode(null);
                setHoveredIndex(null);
            }}
            className="relative group block h-full"
            style={{
                transform: `perspective(1000px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* Enhanced Glow Effect */}
            <motion.div
                className="absolute -inset-2 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${node.color}30, ${node.color}15, transparent)` }}
                animate={isHovered ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Animated Border */}
            <motion.div
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100"
                style={{
                    background: `conic-gradient(from 0deg, transparent, ${node.color}40, transparent)`,
                }}
                animate={isHovered ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Card */}
            <motion.div
                className="relative h-full bg-white/70 backdrop-blur-xl rounded-[2rem] border-2 border-slate-200/50 overflow-hidden transition-all duration-500 group-hover:border-orange-400/50 group-hover:shadow-2xl"
                style={{ boxShadow: isHovered ? `0 25px 50px ${node.color}15` : '' }}
                whileHover={{ y: -8 }}
            >
                {/* Gradient Overlay on Hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, transparent 0%, ${node.color}08 100%)` }}
                />

                {/* Animated Particles Inside Card */}
                {isHovered && [...Array(8)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: node.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -30]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}

                <div className="relative p-10 flex flex-col h-full">
                    {/* Top Section */}
                    <div className="flex items-start justify-between mb-8">
                        <motion.div
                            whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <motion.div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-xl transition-all duration-500"
                                style={{
                                    backgroundColor: 'white',
                                    color: node.color,
                                    border: `2px solid ${node.color}30`,
                                    boxShadow: isHovered ? `0 10px 40px ${node.color}25` : `0 8px 30px ${node.color}15`
                                }}
                                animate={isHovered ? {
                                    boxShadow: [`0 10px 40px ${node.color}25`, `0 15px 50px ${node.color}35`, `0 10px 40px ${node.color}25`]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {node.icon}
                            </motion.div>
                            {/* Icon Corner Accent */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                                style={{ backgroundColor: node.color }}
                                animate={{
                                    scale: [1, 1.4, 1],
                                    boxShadow: [`0 0 0px ${node.color}`, `0 0 20px ${node.color}`, `0 0 0px ${node.color}`]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* ID Badge */}
                        <motion.div
                            className="px-4 py-2 rounded-full border-2 border-slate-200 bg-white/60 backdrop-blur-sm group-hover:border-orange-500/50 transition-all duration-500"
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ rotate: { duration: 0.3 } }}
                        >
                            <span className="block font-mono text-[10px] font-black text-orange-600 tracking-wider">{node.id}</span>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-6">
                        <motion.div
                            initial={{ opacity: 0.6 }}
                            whileHover={{ opacity: 1 }}
                        >
                            <span className="block font-mono text-[10px] font-black text-slate-400 tracking-widest mb-3 uppercase">{node.name}</span>
                            <motion.h4
                                className="text-3xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-orange-600 transition-colors duration-300"
                                animate={isHovered ? {
                                    x: [0, 3, 0, -3, 0]
                                } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                {node.handle}
                            </motion.h4>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide leading-relaxed">
                                {node.detail}
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                        <motion.span
                            className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest"
                            animate={isHovered ? {
                                color: [node.color + '66', node.color + 'aa', node.color + '66']
                            } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            Initialize Link
                        </motion.span>
                        <motion.div
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                            style={{
                                backgroundColor: 'white',
                                border: `2px solid ${node.color}30`
                            }}
                            whileHover={{
                                backgroundColor: node.color,
                                scale: 1.15,
                                rotate: 90
                            }}
                            animate={isHovered ? {
                                boxShadow: [`0 0 0px ${node.color}`, `0 0 25px ${node.color}60`, `0 0 0px ${node.color}`]
                            } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRightIcon size={18} />
                        </motion.div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <motion.div
                        className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-slate-200/30 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={isHovered ? {
                            borderColor: [`${node.color}30`, `${node.color}60`, `${node.color}30`]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-slate-200/30 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={isHovered ? {
                            borderColor: [`${node.color}30`, `${node.color}60`, `${node.color}30`]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />

                    {/* Large Background Text */}
                    <motion.div
                        className="absolute -right-8 -bottom-8 text-[12vw] md:text-[8vw] font-black text-slate-900/[0.02] pointer-events-none transition-all duration-500 group-hover:text-orange-600/[0.08] select-none"
                        animate={isHovered ? {
                            rotate: [0, 8, -8, 0],
                            scale: [1, 1.05, 1]
                        } : { rotate: 0 }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        {node.name.slice(0, 2)}
                    </motion.div>
                </div>
            </motion.div>
        </motion.a>
    );
}

function ContactCursor({ mouseX, mouseY, color }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9999] flex items-center justify-center"
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        >
            {/* Outer Rotating Rings */}
            <motion.div
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: `${color}70` }}
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2.5, repeat: Infinity } }}
            />
            <motion.div
                className="absolute inset-2 border-2 rounded-full border-dashed"
                style={{ borderColor: `${color}50` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Ping Effect */}
            <motion.div
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: color }}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-full h-[2px]"
                    style={{ backgroundColor: `${color}60` }}
                    animate={{ scaleX: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                    className="h-full w-[2px]"
                    style={{ backgroundColor: `${color}60` }}
                    animate={{ scaleY: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>

            {/* Corner Brackets */}
            {[
                { position: 'top-0 left-0', border: 'border-t-4 border-l-4', radius: 'rounded-tl-lg', delay: 0 },
                { position: 'top-0 right-0', border: 'border-t-4 border-r-4', radius: 'rounded-tr-lg', delay: 0.2 },
                { position: 'bottom-0 left-0', border: 'border-b-4 border-l-4', radius: 'rounded-bl-lg', delay: 0.4 },
                { position: 'bottom-0 right-0', border: 'border-b-4 border-r-4', radius: 'rounded-br-lg', delay: 0.6 }
            ].map((corner, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${corner.position} w-6 h-6 ${corner.border} ${corner.radius}`}
                    style={{ borderColor: color }}
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: corner.delay }}
                />
            ))}

            {/* Center Dot */}
            <motion.div
                className="relative w-6 h-6 rounded-full bg-white shadow-2xl flex items-center justify-center border-3"
                style={{ borderColor: color, borderWidth: '3px' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ scale: [1, 0.7, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                />
            </motion.div>

            {/* Orbital Particles */}
            {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: color,
                        top: '50%',
                        left: '50%',
                    }}
                    animate={{
                        rotate: [angle, angle + 360],
                        x: [0, Math.cos(angle * Math.PI / 180) * 45],
                        y: [0, Math.sin(angle * Math.PI / 180) * 45],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Trailing Particles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`trail-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        backgroundColor: color,
                        opacity: 0.6 - i * 0.2
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, -10 * (i + 1)],
                        y: [0, -10 * (i + 1)]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1
                    }}
                />
            ))}
        </motion.div>
    );
}