"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { FaTerminal, FaArrowRight, FaFingerprint, FaDatabase, FaShieldAlt, FaChartLine, FaCloudSun, FaSyncAlt, FaTools, FaGithub, FaCode, FaMicrochip } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-fade";

const PROJECTS = [
    {
        id: "SYS-01", name: "CHRONIC CARE ECOSYSTEM", logo: <FaShieldAlt className="text-blue-600" />,
        short: "Agile medical platform for secure record management. Built with HIPAA-compliant architecture and real-time syncing.",
        images: ["/project1a.png", "/project1b.png", '/project1c.png'], tag: "System Arch",
        stack: "Flask / Socket.IO / SQLAlchemy", database: "PostgreSQL / SQLite",
        github:"https://github.com/DharunSomalingam/3403GroupProject.git",
        details: "Full-stack health tracking app built with Flask and SocketIO to handle real-time appointment updates and user alerts. Integrated Chart.js to turn patient logs into visual trends, helping users see which treatments or practitioners they visit most. Built a secure document manager using SQLAlchemy to organize medical records, referrals, and prescriptions. Used AJAX and jQuery to ensure the dashboard updates instantly without needing to refresh the page.",
        impact: "Cut down the time spent manually organising medical paperwork and appointments. Made it significantly faster to find specific test results or referrals through categorised storage. Improved data privacy for users by moving sensitive medical documents from local folders to a secure, authenticated database.",
        keyFeatures: ["Real-Time Reminders", "Medical Document Manager", "Health Trends Analytics", "Secure Document Sharing"]
    },
    {
        id: "DAT-02", name: "ROAD CRASH DW/ETL", logo: <FaChartLine className="text-red-600" />,
        short: "High-volume Star Schema mining for fatality modeling. Automated ETL pipelines processing millions of rows.",
        images: ["/project_1b.png", "/project_2b.png"], tag: "Data Eng",
        stack: "Python / Pandas / NumPy / R", database: "Star Schema / Snowflake DW",
        github:"https://github.com/DharunSomalingam/AUSTRALIAN-ROAD-CRASH-ANALYSIS-DATAWAREHOUSING-AND-MINING-TECHNIQUES.git",
        details: "Developed a data warehouse using Kimball’s four-step methodology to process over 2 million crash records from the Australian Road Deaths Database (ARDD). Designed a star schema with optimized fact and dimension tables to allow for complex querying of accident factors. Implemented association rule mining to detect patterns in road fatalities and used statistical modeling to compare Australian road safety performance against international benchmarks like Norway and Iceland.",
        impact: "Identified over 15 high-risk accident scenarios that help pinpoint where safety reforms are most needed. Provided a structured data framework that demonstrates how specific factors such speed and demographics contribute to the 10% year-on-year increase in road deaths. Created a foundation for evidence-based policy suggestions aimed at reducing fatality rates toward international standards.",
        keyFeatures: ["2M+ Record ETL Pipeline", "Kimball Star Schema", "Association Rule Mining", "International Safety Benchmarking"]
    },
    {
        id: "AI-03", name: "OCR CENSUS DIGITIZER USING LLMS", logo: <FaTerminal className="text-emerald-600" />,
        short: "Leveraging Mistral AI and OCR pipelines to digitize historical census data with 99.2% accuracy.",
        images: ["/project_1c.png", "/project_2c.png", "/ocr.png"], tag: "AI/ML",
        stack: "Mistral AI / Python / OCR", database: "Structured CSV / JSON",
        github:"https://github.com/Cooper-Thomas1/ClimateAnalysis.git",
        details: "Self-healing OCR pipeline with error detection and retry mechanisms. Dynamic page chunking adapting to varied formats across 200+ documents. AI post-processing using Mistral LLM to correct headers and standardize labels. Schema validation for machine-readable outputs.",
        impact: "Enables UN SDG 2030 research on climate migration. Data supports policy design for vulnerable communities facing displacement. Powers international climate mobility analyses.",
        keyFeatures: ["99.2% Accuracy", "Self-Healing", "AI Processing", "SDG Aligned"]
    },
    {
        id: "GEO-04", name: "GEOSPATIAL WEATHER", logo: <FaCloudSun className="text-purple-600" />,
        short: "Complex bounding-box API extraction for climate resilience modeling and geospatial visualisation.",
        images: ["/geo1.png", "/geo2.png","/geo3.png"], tag: "Geospatial",
        stack: "Python / Netatmo API / DPIRD", database: "PostgreSQL / PostGIS",
        details: "Authenticated workflows extracting climate data across 5 Australian cities. Geospatial bounding box queries with sub-kilometer precision. ETL/ELT processes with PostGIS extensions for spatial operations. Fine-grained urban heat analysis.",
        impact: "Data informs sustainable urban planning policies. Research contributes to climate resilience strategies. Findings support zoning decisions prioritising green space.",
        keyFeatures: ["5-City Coverage", "Sub-km Precision", "Spatial Indexing", "Heat Analysis"]
    },
    {
        id: "AUTO-05", name: "OBSIDIAN → NOTION", logo: <FaSyncAlt className="text-amber-600" />,
        short: "Metadata-preserving sync engine. Bridges the gap between local markdown notes and cloud databases.",
        images: ["/obs1.png", "/obs2.png","/obs3.png"], tag: "Automation",
        stack: "Python / Notion API / Shell Script", database: "Notion Database",
        github:"https://github.com/DharunSomalingam/Nortion_Script.git",
        details: "Bidirectional sync preserving YAML frontmatter and nested structures including files. QuickAdd workflow integration enabling seamless capture. Conflict resolution for concurrent edits.",
        impact: "Automated workflows saving 5+ hours weekly for knowledge workers. Eliminated manual operations across platforms. Enhanced collaboration through synchronized databases.",
        keyFeatures: ["Two-Way Sync", "Metadata Preservation", "AI Enhancement", "Ghost CMS"]
    },
    {
        id: "SRV-06", name: "IT SERVICES (CAB-WA)", logo: <FaTools className="text-slate-900"/>,
        short: "Scalable Flask tools for legal service reliability. Centralised management for multi-tenant IT support.",
        images: ["/cab1.png", "/cab2.png"], tag: "Backend",
        stack: "Flask / RESTful API / Python", database: "MySQL / PostgreSQL",
        details: "Led the database optimization and technical support strategy for a legal services environment, improving query performance 3x across existing PostgreSQL systems. Conducted a comprehensive technical evaluation of specialized legal practice management software, specifically analyzing Clio for data migration feasibility and case management alignment. Developed a centralized Flask-based support dashboard to manage IT requests for 500+ staff across multiple legal centers, ensuring role-based access for sensitive data.",
        impact: "Reduced IT resolution times by 40% through streamlined technical support workflows. Provided the analytical foundation for a major database transition to Clio, ensuring future scalability for legal case management. Supported the delivery of free legal advice to 100+ vulnerable community members by maintaining 99.9% uptime for critical internal systems.",
        keyFeatures: ["Database Performance Tuning", "Clio Software Evaluation", "Multi-Tenant Support Systems", "Legal Tech Modernization"]
    }
    ];

export default function Projects() {
    const [mounted, setMounted] = useState(false);
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    useEffect(() => {
        setMounted(true);
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        <section id="projects" className="relative w-full py-64 px-8 bg-[#FFFAF3] overflow-hidden" style={{ cursor: activeProject ? 'none' : 'auto' }}>
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
                <div className="absolute inset-0 flex flex-col justify-around">
                    {[1, 2, 3].map((i) => (
                        <motion.div key={i} animate={{ x: i % 2 === 0 ? ["-100%", "100%"] : ["100%", "-100%"] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="font-mono text-[14vw] font-black text-orange-600/[0.03] whitespace-nowrap leading-none select-none">
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                <header className="mb-64">
                    <h3 className="text-[12vw] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
                        PROJECT <br /><span className="text-orange-500 italic">VAULT.</span>
                    </h3>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-48">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} setActiveProject={setActiveProject} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeProject && <PrecisionTargetCursor mouseX={mouseX} mouseY={mouseY} />}
            </AnimatePresence>
        </section>
    );
}

function ProjectCard({ project, setActiveProject }: any) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mY, [-0.5, 0.5], [10, -10]), { damping: 20 });
    const rotateY = useSpring(useTransform(mX, [-0.5, 0.5], [-10, 10]), { damping: 20 });

    return (
        <div className="relative h-[750px] w-full" style={{ perspective: "2000px" }}>
            <motion.div ref={cardRef} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 40, damping: 12 }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        onMouseMove={(e) => {
                            if (!isFlipped) {
                                const rect = cardRef.current?.getBoundingClientRect();
                                if (rect) {
                                    mX.set((e.clientX - rect.left) / rect.width - 0.5);
                                    mY.set((e.clientY - rect.top) / rect.height - 0.5);
                                }
                            }
                        }}
                        onMouseEnter={() => !isFlipped && setActiveProject(project.name)}
                        onMouseLeave={() => { mX.set(0); mY.set(0); setActiveProject(null); }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="relative w-full h-full cursor-pointer">

                <div className="absolute inset-0 w-full h-full backface-hidden z-20" style={{ backfaceVisibility: "hidden" }}>
                    <div className="relative bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[4rem] p-4 shadow-2xl h-full">
                        <div className="bg-[#FFFAF3]/80 rounded-[3.5rem] p-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <p className="font-mono text-[10px] font-black text-orange-600 tracking-[0.5em] mb-2">{project.id}</p>
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">{project.name}</h4>
                                </div>
                                <div className="text-3xl p-5 bg-white shadow-xl rounded-3xl">{project.logo}</div>
                            </div>
                            <div className="relative h-72 w-full rounded-[3rem] overflow-hidden mb-10 shadow-xl border-2 border-white">
                                <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} className="h-full w-full">
                                    {project.images.map((img: string, i: number) => (
                                        <SwiperSlide key={i}><img src={img} className="object-cover w-full h-full" alt="" /></SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-[150%] w-full animate-pulse pointer-events-none" />
                            </div>
                            <p className="text-slate-500 text-base leading-relaxed mb-auto italic font-medium">"{project.short}"</p>
                            <div className="p-6 bg-slate-900 rounded-[2rem] flex items-center justify-between mt-8">
                                <div className="flex items-center gap-4 text-white">
                                    <FaFingerprint className="text-2xl animate-pulse text-orange-500" />
                                    <span className="font-black text-[10px] uppercase tracking-widest">Initialize Access</span>
                                </div>
                                <FaArrowRight className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 w-full h-full backface-hidden z-10" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className="relative bg-white/95 backdrop-blur-3xl border-2 border-orange-500/20 rounded-[4rem] p-4 h-full overflow-hidden">
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        </div>
                        <div className="relative bg-[#FFFAF3] rounded-[3.5rem] p-10 h-full flex flex-col border border-orange-100 overflow-y-auto">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    <h5 className="text-orange-600 font-black text-[9px] tracking-[0.4em] uppercase">Technical Architecture</h5>
                                </div>
                                <h4 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight mb-3">{project.name}</h4>
                                <div className="inline-block px-4 py-1.5 bg-orange-50 border-2 border-orange-200 rounded-full">
                                    <span className="text-orange-600 text-[9px] font-black tracking-widest uppercase">{project.tag}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="group p-5 bg-gradient-to-br from-orange-50 to-white rounded-3xl border-2 border-orange-100 hover:border-orange-300 transition-all shadow-sm hover:shadow-md">
                                    <FaCode className="text-orange-500 mb-2 text-xl group-hover:scale-110 transition-transform" />
                                    <p className="text-[8px] font-black uppercase text-orange-400 mb-1.5 tracking-wider">Tech Stack</p>
                                    <p className="text-xs font-bold text-slate-800 leading-tight">{project.stack}</p>
                                </div>
                                <div className="group p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl border-2 border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                                    <FaDatabase className="text-blue-500 mb-2 text-xl group-hover:scale-110 transition-transform" />
                                    <p className="text-[8px] font-black uppercase text-blue-400 mb-1.5 tracking-wider">Database</p>
                                    <p className="text-xs font-bold text-slate-800 leading-tight">{project.database}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.keyFeatures.map((feature: string, i: number) => (
                                    <div key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
                                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wide">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <FaMicrochip className="text-orange-500 text-base" />
                                    <h6 className="text-[9px] font-black uppercase tracking-wider text-orange-600">Technical Overview</h6>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">{project.details}</p>
                            </div>
                            <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-white rounded-3xl border-2 border-emerald-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <h6 className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Real-World Impact</h6>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">{project.impact}</p>
                            </div>
                            <div className="flex gap-4 mt-auto">
                                <button className="flex-[2] group relative py-5 px-6 bg-slate-900 hover:bg-slate-800 rounded-3xl flex items-center justify-center gap-3 text-white font-black text-[10px] tracking-widest shadow-lg hover:shadow-xl transition-all overflow-hidden">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-[2] group relative py-5 px-6 bg-slate-900 hover:bg-slate-800 rounded-3xl flex items-center justify-center gap-3 text-white font-black text-[10px] tracking-widest shadow-lg hover:shadow-xl transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                        <FaGithub className="text-lg z-10" />
                                        <span className="z-10 text-white">VIEW REPOSITORY</span>
                                    </a>
                                </button>
                                <button className="flex-1 py-5 border-2 border-slate-900 hover:bg-slate-900 hover:text-white rounded-3xl flex items-center justify-center font-black text-[10px] tracking-widest uppercase text-slate-900 transition-all">CLOSE</button>
                            </div>
                            <div className="mt-6 text-center pt-4 border-t border-slate-200">
                                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Developed at University of Western Australia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function PrecisionTargetCursor({ mouseX, mouseY }: any) {
    const springX = useSpring(mouseX, { damping: 25, stiffness: 350 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 350 });

    return (
        <motion.div className="fixed top-0 left-0 w-44 h-44 pointer-events-none z-[99999]" style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}>
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div className="absolute w-12 h-12 bg-orange-500/20 rounded-full blur-xl" animate={{ scale: [1, 2, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                <div className="relative w-3 h-3 bg-orange-600 rounded-full shadow-[0_0_20px_#ea580c]">
                    <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75" />
                </div>
                <div className="absolute inset-0">
                    <motion.div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                    <motion.div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-orange-600 to-transparent" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3 }} />
                </div>
                <svg className="absolute inset-0 w-full h-full">
                    <motion.circle cx="50%" cy="50%" r="25%" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 12" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center", opacity: 0.6 }} />
                    <motion.circle cx="50%" cy="50%" r="35%" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 8" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center", opacity: 0.4 }} />
                    <motion.circle cx="50%" cy="50%" r="45%" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="1 6" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center", opacity: 0.3 }} />
                </svg>
                <div className="absolute inset-0">
                    {[
                        { pos: "top-2 left-2" }, { pos: "top-2 right-2" }, { pos: "bottom-2 left-2" }, { pos: "bottom-2 right-2" }
                    ].map((corner, i) => (
                        <motion.div key={i} className={`absolute ${corner.pos} w-10 h-10`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                            <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-full h-[3px] bg-orange-600 rounded-full`} />
                            <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-[3px] h-full bg-orange-600 rounded-full`} />
                        </motion.div>
                    ))}
                </div>
                <motion.div className="absolute inset-0" style={{ background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(234, 88, 12, 0.2) 30deg, transparent 60deg)` }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute -bottom-14 left-1/2 -translate-x-1/2 font-mono text-[10px] text-orange-600 bg-white/95 px-4 py-2 rounded-xl border-2 border-orange-500/30 shadow-lg backdrop-blur-sm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                        <span className="font-black tracking-wider">TARGET: X:{Math.round(mouseX.get())} Y:{Math.round(mouseY.get())}</span>
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l-2 border-t-2 border-orange-500/30 rotate-45" />
                </motion.div>
            </div>
        </motion.div>
    );
}