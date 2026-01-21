'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

// --- FULL-PAGE UFO NEURAL ENGINE ---
function UFONeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        const particleCount = 70;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number; y: number; vx: number; vy: number;
            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
            }
            update() {
                this.x += this.vx; this.y += this.vy;

                // Tractor Beam Logic (UFO Attraction)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 250) {
                    this.x += dx * 0.03;
                    this.y += dy * 0.03;
                }

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();

                const mDx = p.x - mouse.x;
                const mDy = p.y - mouse.y;
                const mDist = Math.sqrt(mDx*mDx + mDy*mDy);

                // Draw UFO Beam Lines
                if (mDist < 250) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(249, 115, 22, ${0.25 * (1 - mDist/250)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(249, 115, 22, ${0.12 * (1 - d/150)})`;
                        ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        // Track mouse globally across entire page
        const handleMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', handleMove);
        resize(); animate();
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMove);
        };
    }, []);

    // fixed inset-0 ensures it stays on the screen even when scrolling
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
}

function UFOCursor() {
    const [pos, setPos] = useState({x: -100, y: -100});
    useEffect(() => {
        const handleMove = (e: MouseEvent) => setPos({x: e.clientX, y: e.clientY});
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            animate={{x: pos.x - 20, y: pos.y - 10}}
            transition={{type: 'spring', damping: 35, stiffness: 400, mass: 0.4}}
        >
            <div className="relative flex items-center justify-center">
                <div
                    className="w-12 h-2.5 bg-orange-500 rounded-full blur-[0.5px] relative z-10 shadow-[0_0_15px_#f97316]"/>
                <div className="absolute top-[-5px] w-5 h-4 bg-orange-200 rounded-full blur-[1px] opacity-90"/>
                {/* Visual Tractor Beam */}
                <motion.div
                    animate={{height: [15, 25, 15], opacity: [0.3, 0.6, 0.3]}}
                    transition={{duration: 1.5, repeat: Infinity}}
                    className="absolute top-2 w-10 bg-gradient-to-b from-orange-400 to-transparent rounded-full blur-md"
                />
            </div>
        </motion.div>
    );

}

export default function About() {
    const [mounted, setMounted] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const myPhotos = ["/dharun10.jpeg","/dharun0.jpeg" ,"/dharun3.jpeg", "/dharun2.jpeg", "/dharun4.jpeg"];

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentPhoto((prev) => (prev + 1) % myPhotos.length), 4000);
        return () => clearInterval(timer);
    }, [myPhotos.length]);

    const skills = [
        "Python (Advanced)", "SQL", "FastAPI", "R", "Java", "ETL Pipelines",
        "Mistral OCR", "PostgreSQL", "LLM Integration", "Geospatial Analysis",
        "Data Warehousing", "Flask", "Machine Learning", "Docker", "Git", "AJAX"
    ];

    const skillNodes = useMemo(() => {
        return skills.map((skill, i) => ({
            name: skill,
            id: i,
            top: `${(i * 17) % 80 + 10}%`,
            left: `${(i * 23) % 80 + 10}%`,
            duration: 12 + (i % 10),
            delay: i * -0.5
        }));
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        <section id="about" className="relative w-full min-h-screen bg-[#FFFAF3] py-24 px-6 cursor-none selection:bg-orange-200 overflow-x-hidden">
            {/* Fixed background ensures UFO effect persists through all sections */}
            <UFONeuralBackground />
            <UFOCursor />

            {/* --- FLOATING SKILL ENGINE --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {skillNodes.map((node) => (
                    <motion.div
                        key={node.id}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            x: [0, 40, -40, 0],
                            y: [0, -20, 20, 0],
                        }}
                        transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                        className="absolute flex items-center justify-center"
                        style={{ top: node.top, left: node.left }}
                    >
                        <div className="px-4 py-1.5 bg-white/40 backdrop-blur-[2px] border border-orange-200/50 rounded-full shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-orange-400">
                            {node.name}
                        </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* --- HEADER --- */}
                <div className="mb-24">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h2 className="text-[11vw] leading-[0.8] font-black text-gray-900 tracking-tighter uppercase italic">
                            Dharun <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                            Somalingam
                        </span>
                        </h2>
                        <div className="mt-8 flex gap-4 font-mono text-xs text-gray-400 uppercase tracking-widest">
                            <span>Data Scientist</span>
                            <span className="text-orange-500">//</span>
                            <span>Computer Scientist</span>
                            <span className="text-orange-500">//</span>
                            <span>UWA Graduate</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- BENTO PHILOSOPHY GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[160px] auto-rows-auto">

                    {/* OPERATING PRINCIPLE (Left - Aligned) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 md:row-span-3 col-span-1 bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden group border border-white/10 min-h-[450px] md:min-h-0"
                    >
                        <h4 className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.5em] mb-8">
                            Operating Principle
                        </h4>

                        <p className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tighter z-10 max-w-[95%]">
                            "If the data exists, <span className="text-orange-400 italic">I mine it.</span> <br className="hidden sm:block" />
                            If it’s manual, <span className="text-orange-400 italic">I automate it."</span>
                        </p>

                        {/* Scaled Reactor Ring for better alignment */}
                        <div className="absolute -bottom-12 -right-12 p-12 z-0 scale-90 md:scale-125 opacity-40 md:opacity-100">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-orange-500/30" />
                                <motion.div animate={{ rotate: -360, scale: [1, 1.05, 1] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} className="absolute inset-10 rounded-full border-2 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.2)]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* PHOTO CONTAINER (Right - Perfectly Level) */}
                    <div className="md:col-span-4 md:row-span-3 bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative border border-gray-200 shadow-xl group aspect-[4/5] md:aspect-auto md:h-full">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentPhoto} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
                                <Image src={myPhotos[currentPhoto]} alt="Professional" fill priority className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[9px] text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 z-10">
                        </div>
                    </div>

                    {[
                        { step: "1ST", title: "Extract", color: "bg-orange-500", text: "Developing scalable ELT/ETL workflows with Python and SQL.", icon: "01" },
                        { step: "2ND", title: "Integrate", color: "bg-white", text: "Bridging data to LLMs via AI-driven OCR and Mistral.", icon: "02", dark: true },
                        { step: "3RD", title: "Automate", color: "bg-rose-500", text: "Building self-healing backend tools with FastAPI/Docker.", icon: "03" }
                    ].map((box, i) => (
                        <div key={i} className={`md:col-span-4 md:row-span-2 ${box.color} rounded-[3rem] p-10 flex flex-col justify-between shadow-sm border ${box.dark ? 'border-gray-100 text-gray-900' : 'border-transparent text-white'} hover:-translate-y-2 transition-all duration-500`}>
                            <h5 className={`text-6xl font-black italic ${box.dark ? 'text-gray-100' : 'opacity-30'}`}>{box.step}</h5>
                            <div>
                                <p className="text-2xl font-bold mb-2 uppercase italic tracking-tighter">{box.title}</p>
                                <p className={`text-sm font-medium ${box.dark ? 'text-gray-500' : 'opacity-80'}`}>{box.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- ACADEMIC FOUNDATION --- */}
                <div className="mt-40 p-12 bg-white rounded-[4rem] border border-gray-100 shadow-2xl flex flex-col md:flex-row items-center gap-12 overflow-hidden relative group">
                    <div className="absolute -top-10 -right-10 font-mono text-[180px] text-gray-50 opacity-[0.05] select-none pointer-events-none font-black transition-all group-hover:opacity-[0.08]">
                        UWA
                    </div>
                    <div className="md:w-1/3 z-10">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-orange-50 shadow-inner">
                            <Image src="/uwa.jpg" alt="UWA Campus" fill className="object-cover duration-700" />
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-8 z-10">
                        <div className="space-y-2">
                            <p className="text-orange-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">University <br />Of Western Australia</p>
                            <h4 className="text-5xl font-black text-gray-900 tracking-tighter">Bachelor of Science</h4>
                            <p className="text-xl text-gray-400 font-medium italic">Data Science & Computer Science</p>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                            Forging a foundation where <b>statistical theory</b> meets <b>high-performance computing</b>. I specialise in the intersection of scalable data architecture and the mathematical frameworks that power modern AI.
                        </p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                <span>Core Completion Status</span>
                                <span className="text-orange-600 font-bold">97%</span>
                            </div>
                            <motion.div whileHover="hover" className="relative h-6 w-full bg-gray-100 rounded-full border border-gray-200 p-1 flex items-center cursor-help">
                                <motion.div variants={{ hover: { opacity: 1, y: -45, scale: 1 }, initial: { opacity: 0, y: 0, scale: 0.9 } }} initial="initial" className="absolute left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-4 py-2 rounded-xl font-mono shadow-2xl z-50 border border-orange-500/40">
                                    <span className="text-orange-400">QUERY:</span> [ML: HD, DB_Systems: HD, AI: HD]
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                </motion.div>
                                <motion.div initial={{ width: 0 }} whileInView={{ width: "97%" }} transition={{ duration: 2.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-orange-400 via-rose-500 to-rose-600 rounded-full relative overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-[-20deg]" />
                                </motion.div>
                            </motion.div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[{ l: "Math Rigor", v: "High" }, { l: "Algo. Theory", v: "Expert" }, { l: "Data Arch.", v: "Prod" }, { l: "ETA", v: "DEC '25" }].map((s, i) => (
                                    <div key={i} className="border-l-2 border-orange-100 pl-3">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase">{s.l}</p>
                                        <p className="text-[12px] font-black text-gray-800 uppercase italic">{s.v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TECHNICAL SOVEREIGNTY MATRIX --- */}
                <div className="mt-24 md:mt-44 relative px-4 md:px-0">
                    <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 md:w-12 h-[2px] bg-orange-500" />
                            </div>
                            <h3 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase italic leading-[0.9] md:leading-[0.8]">
                                Technical<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-500 to-orange-400">Ecosystem</span>
                            </h3>
                        </div>

                        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex items-center md:block gap-4 w-full md:w-auto">
                            <div className="flex items-center gap-2 md:mb-2">
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { zone: "Intelligence & AI", skills: ["Mistral OCR", "LLM Integration", "Neural Pipelines", "Predictive Modeling", "R", "Machine Learning"], desc: "Transforming raw unstructured noise into machine-readable intelligence.", grad: "from-purple-500 to-indigo-600" },
                            { zone: "Software Architecture",  skills: ["Python (Adv)", "FastAPI", "Flask", "Java", "C++", "Next.js", "REST APIs", "Multithreading"], desc: "Developing high-concurrency backend systems and responsive real-time interfaces.", grad: "from-orange-500 to-rose-500" },
                            { zone: "Data Engineering", skills: ["ETL/ELT", "PostgreSQL", "Data Warehousing", "Schemas", "PostGIS", "SQLAlchemy", "NoSQL"], desc: "Engineering the flow and storage of massive geospatial and census datasets.", grad: "from-blue-500 to-cyan-500" },
                            { zone: "Operational Systems",  skills: ["Docker", "Git/CI-CD", "Unit Testing", "Belt Splicing", "Industrial Safety", "Agile", "UX Design"], desc: "Where digital meets physical. From cloud deployments to industrial maintenance.", grad: "from-emerald-500 to-teal-500" }
                        ].map((block, i) => (
                            <motion.div key={i} whileHover="hover" className="relative group bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden shadow-lg shadow-gray-200/20">
                                <motion.div variants={{ hover: { top: ["100%", "0%"] } }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-40 bg-gradient-to-t from-orange-500/10 to-transparent z-0 pointer-events-none" />
                                <div className="relative z-10 p-12">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">{block.level}</p>
                                            <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">{block.zone}</h4>
                                        </div>
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${block.grad} flex items-center justify-center text-white font-bold shadow-xl group-hover:rotate-12 transition-transform`}>0{i+1}</div>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10 max-w-sm">{block.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {block.skills.map((s, si) => (
                                            <motion.span key={si} whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-gray-700 uppercase tracking-tighter transition-all">
                                                {s}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-1000 bg-gradient-to-r ${block.grad}`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* --- THE TERMINAL MARQUEE --- */}
                    <div className="mt-16 p-10 bg-gray-950 rounded-[3.5rem] relative overflow-hidden flex items-center group">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent pointer-events-none" />
                        <motion.div animate={{ x: [0, -1500] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-16 items-center whitespace-nowrap">
                            {["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Figma", "Unix Shell", "OAuth", "Ghost CMS", "Netatmo API", "DPIRD API", "QuickAdd", "Obsidian"].map((t, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                    <span className="text-white/30 hover:text-orange-500 transition-colors font-mono text-xs font-black uppercase tracking-[0.4em]">{t}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}