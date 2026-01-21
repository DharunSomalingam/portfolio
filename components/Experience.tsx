"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { FaLaptopCode, FaRobot, FaDatabase, FaGavel } from "react-icons/fa";

const experiences = [
    {
        title: "Web Development & AI Intern",
        company: "Ignition Studios",
        period: "2025 // PRESENT",
        description: "Architecting modern web solutions using Next.js and integrating AI-driven automation workflows.",
        skills: ["Next.js", "Ghost CMS", "Automation"],
        icon: <FaLaptopCode size={20} />,
        image: "/companies/ignition.png",
        status: "ACTIVE_NODE"
    },
    {
        title: "Data Processing & OCR Developer",
        company: "UWA Business School",
        period: "2025 // Q2",
        description: "Developed custom OCR pipelines and utilized Mistral AI to transform unstructured financial documents.",
        skills: ["Python", "Mistral AI", "OCR"],
        icon: <FaRobot size={20} />,
        image: "/companies/uwabusiness.png",
        status: "STABLE_BUILD"
    },
    {
        title: "IT And Database Assistant",
        company: "Citizens Advice Bureau",
        period: "2025 // Q1",
        description: "Optimized internal database queries and contributed to development of accessible web interfaces.",
        skills: ["React", "TypeScript", "SQL","Python"],
        icon: <FaGavel size={20} />,
        image: "/companies/cabwa.png",
        status: "ARCHIVED"
    },
    {
        title: "Research Analyst",
        company: "UWA Agri-School",
        period: "2024 // Q4",
        description: "Leveraged GIS and PostgreSQL to perform deep-sea data mining and spatial analysis.",
        skills: ["PostgreSQL", "GIS", "Data Mining"],
        icon: <FaDatabase size={20} />,
        image: "/companies/uwaagri.png",
        status: "LEGACY_DATA"
    }
];

const SectionBackground = ({ parentElement }: { parentElement: HTMLDivElement | null }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!parentElement || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let dataBlocks: DataBlock[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = parentElement.offsetWidth;
            canvas.height = parentElement.offsetHeight;
        };

        class DataBlock {
            x: number; y: number; value: string; opacity: number; size: number; speed: number;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.value = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                this.size = Math.random() * 60 + 30;
                this.opacity = Math.random() * 0.22 + 0.08; // High visibility
                this.speed = Math.random() * 0.9 + 0.4;
            }
            draw() {
                this.y += this.speed;
                if (this.y > canvas.height + 100) {
                    this.y = -100;
                    this.x = Math.random() * canvas.width;
                }
                ctx!.font = `900 ${this.size}px Inter, sans-serif`;
                ctx!.fillStyle = `rgba(249, 115, 22, ${this.opacity})`;
                ctx!.fillText(this.value, this.x, this.y);
            }
        }

        class Particle {
            x: number; y: number; vx: number; vy: number; radius: number;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw(isNearMouse: boolean, dist: number) {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, isNearMouse ? 4 : this.radius, 0, Math.PI * 2);
                ctx!.fillStyle = isNearMouse
                    ? `rgba(249, 115, 22, ${0.9 * (1 - dist / 350)})`
                    : `rgba(249, 115, 22, 0.25)`;
                ctx!.fill();
            }
        }

        const init = () => {
            particles = Array.from({ length: 140 }, () => new Particle());
            dataBlocks = Array.from({ length: 30 }, () => new DataBlock());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dataBlocks.forEach(b => b.draw());
            particles.forEach(p => {
                p.update();
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNear = dist < 300;
                p.draw(isNear, dist);
                if (isNear) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.current.x, mouse.current.y);
                    ctx.strokeStyle = `rgba(249, 115, 22, ${0.8 * (1 - dist / 300)})`;
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        window.addEventListener("resize", resize);
        parentElement.addEventListener("mousemove", handleMove);
        resize(); init(); animate();
        return () => {
            window.removeEventListener("resize", resize);
            parentElement.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [parentElement]);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export default function Experience() {
    const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const onRefChange = useCallback((node: HTMLDivElement | null) => { if (node) setTargetElement(node); }, []);

    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll({
        target: targetElement ? { current: targetElement } : undefined,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        <section id="experience"  ref={onRefChange} className="relative w-full py-48 px-6 bg-[#FFFAF3] overflow-hidden" style={{ cursor: 'none' }}>
            <SectionBackground parentElement={targetElement} />
            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="mb-64 relative">
                    <div className="font-mono text-orange-500 font-bold mb-4 tracking-[0.5em] text-[10px]">// ARCHIVE_01 // DATA_STREAM_ACTIVE</div>
                    <h2 className="text-[10vw] lg:text-[8rem] font-black text-gray-900 leading-[0.75] uppercase tracking-tighter">
                        Archive<span className="text-orange-500">.</span>01
                    </h2>
                </header>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-orange-200/40 -translate-x-1/2 hidden lg:block" />
                    <motion.div className="absolute left-1/2 top-0 w-[3px] bg-orange-500 -translate-x-1/2 hidden lg:block origin-top shadow-[0_0_20px_rgba(249,115,22,0.4)]" style={{ scaleY }} />
                    <div className="flex flex-col gap-[45vh]">
                        {experiences.map((exp, idx) => (
                            <ExperienceBlock key={idx} exp={exp} index={idx} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
            <NeuralCursor parentElement={targetElement} />
        </section>
    );
}

function ExperienceBlock({ exp, index, scrollYProgress }: any) {
    const isEven = index % 2 === 0;
    const blockRef = useRef(null);
    const isInView = useInView(blockRef, { margin: "-20% 0px -20% 0px" });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, isEven ? -80 : 80]);

    return (
        <div ref={blockRef} className={`relative flex flex-col items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24`}>

            <div className={`w-full lg:w-[45%] ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                <motion.div initial={{ opacity: 0, x: isEven ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.1, x: isEven ? -20 : 20 }} transition={{ duration: 0.8 }}>
                    <div className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                        <div className="flex items-center gap-3 text-orange-600 mb-4 font-mono text-[10px] tracking-widest uppercase">
                            <span className="bg-orange-100/80 px-2 py-0.5 rounded-sm border border-orange-200 font-bold">{exp.status}</span>
                            <span className="opacity-50">{exp.period}</span>
                        </div>
                        <h3 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-[0.9]">{exp.title}</h3>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-8">{exp.description}</p>
                        <div className={`flex flex-wrap gap-2 ${!isEven && 'justify-end'}`}>
                            {exp.skills.map((s: string) => (
                                <span key={s} className="px-3 py-1 bg-black text-[10px] font-bold text-white uppercase tracking-tighter hover:bg-orange-500 transition-colors shadow-lg">
        {s}
    </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* LOGO CONTAINER: Large size with original colors */}
            <div className="w-full lg:w-[40%] max-w-xl relative">
                <motion.div style={{ y: yParallax }} className="relative aspect-[16/10] overflow-hidden shadow-2xl rounded-sm border border-orange-100 bg-white p-6 group">
                    <div className="relative w-full h-full overflow-hidden">
                        {/* Removed 'grayscale' to show original colors; added 'object-contain' to prevent cropping */}
                        <Image
                            src={exp.image}
                            alt={exp.company}
                            fill
                            className="object-contain transition-transform duration-[3s] group-hover:scale-105"
                            priority={index === 0}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const NeuralCursor = ({ parentElement }: { parentElement: HTMLDivElement | null }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!parentElement) return;
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        parentElement.addEventListener("mousemove", move);
        parentElement.addEventListener("mouseenter", () => setVisible(true));
        parentElement.addEventListener("mouseleave", () => setVisible(false));
        return () => parentElement.removeEventListener("mousemove", move);
    }, [parentElement]);
    if (!visible) return null;
    return (
        <motion.div
            animate={{ x: pos.x - 12, y: pos.y - 12 }}
            transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
            className="fixed top-0 left-0 w-6 h-6 border-[2.5px] border-orange-500 rounded-full pointer-events-none z-[999] shadow-[0_0_20px_rgba(249,115,22,0.8)]"
        />
    );
};