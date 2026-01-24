"use client";

import { useEffect, useState, useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { FaArrowRight, FaFingerprint, FaDatabase, FaShieldAlt, FaChartLine, FaCloudSun, FaSyncAlt, FaTools, FaGithub, FaCode, FaTerminal } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";

const PROJECTS = [
    {
        id: "SYS-01",
        name: "CHRONIC CARE ECOSYSTEM",
        logo: <FaShieldAlt className="text-blue-600" />,
        short: "Agile medical platform for secure record management. Built with HIPAA-compliant architecture and real-time syncing.",
        images: ["/project1a.png", "/project1b.png", "/project1c.png"],
        tag: "System Arch",
        stack: "Flask / Socket.IO / SQLAlchemy",
        database: "PostgreSQL / SQLite",
        github: "https://github.com/DharunSomalingam/3403GroupProject.git",
        details: "Full-stack health tracking app built with Flask and SocketIO to handle real-time appointment updates and user alerts. Integrated Chart.js to turn patient logs into visual trends.",
        impact: "Cut down the time spent manually organising medical paperwork. Improved data privacy by moving sensitive documents to a secure database.",
        keyFeatures: ["Real-Time Reminders", "Medical Document Manager", "Health Trends Analytics", "Secure Sharing"]
    },
    {
        id: "DAT-02",
        name: "ROAD CRASH DW/ETL",
        logo: <FaChartLine className="text-red-600" />,
        short: "High-volume Star Schema mining for fatality modeling. Automated ETL pipelines processing millions of rows.",
        images: ["/project_1b.png", "/project_2b.png"],
        tag: "Data Eng",
        stack: "Python / Pandas / NumPy / R",
        database: "Star Schema / Snowflake DW",
        github: "https://github.com/DharunSomalingam/AUSTRALIAN-ROAD-CRASH-ANALYSIS-DATAWAREHOUSING-AND-MINING-TECHNIQUES.git",
        details: "Developed a data warehouse using Kimball’s methodology to process over 2 million crash records. Designed a star schema for complex querying of accident factors.",
        impact: "Identified over 15 high-risk accident scenarios. Provided a structured data framework for evidence-based policy suggestions.",
        keyFeatures: ["2M+ Record ETL", "Kimball Star Schema", "Association Mining", "Safety Benchmarking"]
    },
    {
        id: "AI-03",
        name: "OCR CENSUS DIGITIZER",
        logo: <FaTerminal className="text-emerald-600" />,
        short: "Leveraging Mistral AI and OCR pipelines to digitize historical census data with 99.2% accuracy.",
        images: ["/project_1c.png", "/project_2c.png", "/ocr.png"],
        tag: "AI/ML",
        stack: "Mistral AI / Python / OCR",
        database: "Structured CSV / JSON",
        github: "https://github.com/Cooper-Thomas1/ClimateAnalysis.git",
        details: "Self-healing OCR pipeline with error detection. AI post-processing using Mistral LLM to correct headers and standardize labels.",
        impact: "Enables UN SDG 2030 research on climate migration. Data supports policy design for vulnerable communities.",
        keyFeatures: ["99.2% Accuracy", "Self-Healing", "AI Processing", "SDG Aligned"]
    },
    {
        id: "GEO-04",
        name: "GEOSPATIAL WEATHER",
        logo: <FaCloudSun className="text-purple-600" />,
        short: "Complex bounding-box API extraction for climate resilience modeling and geospatial visualisation.",
        images: ["/geo1.png", "/geo2.png", "/geo3.png"],
        tag: "Geospatial",
        stack: "Python / Netatmo API / DPIRD",
        database: "PostgreSQL / PostGIS",
        github: "https://github.com/DharunSomalingam/Geospatial-Weather.git",
        details: "Authenticated workflows extracting climate data across 5 Australian cities. ETL/ELT processes with PostGIS extensions.",
        impact: "Informs sustainable urban planning. Research contributes to climate resilience strategies.",
        keyFeatures: ["5-City Coverage", "Sub-km Precision", "Spatial Indexing", "Heat Analysis"]
    },
    {
        id: "AUTO-05",
        name: "OBSIDIAN → NOTION",
        logo: <FaSyncAlt className="text-amber-600" />,
        short: "Metadata-preserving sync engine. Bridges the gap between local markdown notes and cloud databases.",
        images: ["/obs1.png", "/obs2.png", "/obs3.png"],
        tag: "Automation",
        stack: "Python / Notion API / Shell Script",
        database: "Notion Database",
        github: "https://github.com/DharunSomalingam/Nortion_Script.git",
        details: "Bidirectional sync preserving YAML frontmatter and nested structures. QuickAdd workflow integration.",
        impact: "Automated workflows saving 5+ hours weekly. Eliminated manual operations across platforms.",
        keyFeatures: ["Two-Way Sync", "Metadata Preservation", "AI Enhancement", "Ghost CMS"]
    },
    {
        id: "SRV-06",
        name: "IT SERVICES (CAB-WA)",
        logo: <FaTools className="text-slate-900" />,
        short: "Scalable Flask tools for legal service reliability. Centralised management for multi-tenant IT support.",
        images: ["/cab1.png", "/cab2.png"],
        tag: "Backend",
        stack: "Flask / RESTful API / Python",
        database: "MySQL / PostgreSQL",
        github: "https://github.com/DharunSomalingam/CAB-WA-IT-Services.git",
        details: "Led database optimization for legal services, improving query performance 3x. Developed a centralized Flask support dashboard.",
        impact: "Reduced IT resolution times by 40%. Supported delivery of free legal advice to 100+ community members.",
        keyFeatures: ["Performance Tuning", "Clio Evaluation", "Multi-Tenant Support", "Tech Modernization"]
    }
];

export default function Projects() {
    const [mounted, setMounted] = useState(false);
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    useEffect(() => {
        setMounted(true);
        const handleMove = (e: MouseEvent) => {
            window.requestAnimationFrame(() => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            });
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <section id="projects" className="relative w-full py-32 md:py-64 px-4 md:px-8 bg-[#FFFAF3] overflow-hidden">
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:40px_40px]" />
            </motion.div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                <header className="mb-24 md:mb-64">
                    <h3 className="text-[15vw] md:text-[12vw] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
                        PROJECT <br /><span className="text-orange-500 italic">VAULT.</span>
                    </h3>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 md:gap-y-48">
                    {PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            setActiveProject={setActiveProject}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeProject && <PrecisionTargetCursor mouseX={mouseX} mouseY={mouseY} />}
            </AnimatePresence>
        </section>
    );
}

const ProjectCard = memo(({ project, setActiveProject }: any) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
    const rotateYSpring = useSpring(useTransform(mX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isFlipped || (typeof window !== 'undefined' && window.innerWidth < 1024)) return;
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            mX.set((e.clientX - rect.left) / rect.width - 0.5);
            mY.set((e.clientY - rect.top) / rect.height - 0.5);
        }
    };

    return (
        <div className="relative h-[680px] md:h-[720px] w-full" style={{ perspective: "2000px" }}>
            <motion.div
                ref={cardRef}
                style={{
                    rotateX: isFlipped ? 0 : rotateX,
                    rotateY: isFlipped ? 180 : rotateYSpring,
                    transformStyle: "preserve-3d"
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setActiveProject(project.name)}
                onMouseLeave={() => { mX.set(0); mY.set(0); setActiveProject(null); }}
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-full h-full cursor-pointer"
            >
                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        zIndex: isFlipped ? 0 : 1
                    }}
                >
                    <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-[3rem] md:rounded-[4rem] p-3 md:p-4 shadow-2xl h-full">
                        <div className="bg-[#FFFAF3]/80 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                                <div>
                                    <p className="font-mono text-[10px] font-black text-orange-600 tracking-[0.5em] mb-2">{project.id}</p>
                                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">{project.name}</h4>
                                </div>
                                <div className="text-2xl md:text-3xl p-4 md:p-5 bg-white shadow-lg rounded-2xl md:rounded-3xl">{project.logo}</div>
                            </div>

                            <div className="relative h-56 md:h-64 w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-8 shadow-inner border-2 border-white pointer-events-none">
                                <Swiper
                                    modules={[Autoplay, EffectFade]}
                                    effect="fade"
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    loop={true}
                                    className="h-full w-full"
                                >
                                    {project.images.map((img: string, i: number) => (
                                        <SwiperSlide key={i}><img src={img} loading="lazy" className="object-cover w-full h-full" alt="" /></SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <p className="text-slate-500 text-sm italic font-medium">"{project.short}"</p>

                            <div className="p-5 md:p-6 bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-4 text-white">
                                    <FaFingerprint className="text-xl text-orange-500" />
                                    <span className="font-black text-[9px] uppercase tracking-widest">Open Details</span>
                                </div>
                                <FaArrowRight className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        zIndex: isFlipped ? 1 : 0
                    }}
                >
                    <div className="relative bg-white/95 rounded-[3rem] md:rounded-[4rem] p-4 h-full border-2 border-orange-500/20 shadow-2xl">
                        <div className="relative bg-[#FFFAF3] rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 h-full flex flex-col overflow-y-auto overflow-x-hidden">
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase mb-6">{project.name}</h4>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 md:p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                    <FaCode className="text-orange-500 mb-2" />
                                    <p className="text-[8px] font-black text-orange-400 uppercase">Stack</p>
                                    <p className="text-[10px] md:text-[11px] font-bold text-slate-800">{project.stack}</p>
                                </div>
                                <div className="p-3 md:p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <FaDatabase className="text-blue-500 mb-2" />
                                    <p className="text-[8px] font-black text-blue-400 uppercase">DB</p>
                                    <p className="text-[10px] md:text-[11px] font-bold text-slate-800">{project.database}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <p className="text-slate-700 text-xs md:text-sm leading-relaxed"><strong className="text-orange-600 text-[10px] block uppercase mb-1">Overview:</strong> {project.details}</p>
                                <p className="text-slate-700 text-xs md:text-sm leading-relaxed"><strong className="text-emerald-600 text-[10px] block uppercase mb-1">Impact:</strong> {project.impact}</p>
                            </div>

                            <div className="flex gap-2 mb-8">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()} // STOP BUBBLING
                                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest hover:bg-orange-600 transition-colors"
                                >
                                    <FaGithub /> REPO
                                </a>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // STOP BUBBLING
                                        setIsFlipped(false);
                                    }}
                                    className="flex-1 py-4 border-2 border-slate-900 rounded-2xl text-[10px] font-black tracking-widest uppercase"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

const PrecisionTargetCursor = memo(({ mouseX, mouseY }: any) => {
    const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[99999] will-change-transform"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <svg className="absolute inset-0 w-full h-full opacity-30">
                    <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500" />
            </div>
        </motion.div>
    );
});