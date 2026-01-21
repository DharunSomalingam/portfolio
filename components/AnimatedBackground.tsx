'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useMemo, useCallback } from 'react'

export default function About() {
    const [mounted, setMounted] = useState(false)
    const [element, setElement] = useState<HTMLElement | null>(null)
    const [currentPhoto, setCurrentPhoto] = useState(0)

    // REPLACE THESE WITH YOUR ACTUAL PHOTO PATHS
    const myPhotos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"]

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => {
            setCurrentPhoto((prev) => (prev + 1) % myPhotos.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [myPhotos.length])

    const onRefChange = useCallback((node: HTMLElement | null) => {
        if (node) setElement(node)
    }, [])

    const skills = [
        "Python (Advanced)", "SQL", "FastAPI", "R", "Java", "ETL Pipelines",
        "Mistral OCR", "PostgreSQL", "LLM Integration", "Geospatial Analysis",
        "Data Warehousing", "Flask", "Machine Learning", "Docker", "Git", "AJAX"
    ]

    const skillNodes = useMemo(() => {
        return skills.map((skill, i) => ({
            name: skill,
            id: i,
            top: `${(i * 17) % 80 + 10}%`,
            left: `${(i * 23) % 80 + 10}%`,
            duration: 10 + (i % 12),
            delay: i * -0.8
        }))
    }, [])

    if (!mounted) return <div className="min-h-screen bg-[#FFFAF3]" />;

    return (
        <section
            ref={onRefChange}
            className="relative w-full min-h-screen overflow-hidden bg-[#FFFAF3] py-24 px-6 selection:bg-orange-200"
        >
            {/* --- THE FLOATING ENGINE --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {skillNodes.map((node) => (
                    <motion.div
                        key={node.id}
                        animate={{
                            opacity: [0.4, 0.8, 0.4],
                            x: [0, 50, -50, 0],
                            y: [0, -30, 30, 0],
                        }}
                        transition={{
                            duration: node.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: node.delay
                        }}
                        className="absolute flex items-center justify-center"
                        style={{ top: node.top, left: node.left }}
                    >
                        <div className="px-5 py-2 bg-white border-2 border-orange-100 rounded-2xl shadow-xl">
                            <span className="text-[11px] font-black uppercase tracking-tighter text-orange-600">
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
                        {/* ... (keep your existing header subtext) */}
                    </motion.div>
                </div>

                {/* --- THE BENTO PHILOSOPHY --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[160px]">

                    {/* Philosophy: The Core Statement + Glowing Ring */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 md:row-span-2 bg-gray-900 rounded-[3rem] p-12 text-white flex flex-col justify-center relative overflow-hidden group"
                    >
                        <h4 className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.5em] mb-6">Operating Principle</h4>
                        <p className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                            "If the data exists, <span className="text-orange-400">I mine it.</span> <br/>
                            If it’s manual, <span className="text-orange-400">I automate it."</span>
                        </p>

                        {/* THE GLOWING RING */}
                        <div className="absolute bottom-[-20px] right-[-20px] p-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 rounded-full border-[2px] border-dashed border-orange-500/30 flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-32 h-32 rounded-full border-[12px] border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.4)]"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* PHOTO SLIDER (Replaces Direct Lines) */}
                    <div className="md:col-span-4 md:row-span-2 bg-white rounded-[3rem] overflow-hidden relative border-2 border-orange-500/10 shadow-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPhoto}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={myPhotos[currentPhoto]}
                                    alt="Dharun Workspace"
                                    fill
                                    className="object-cover"
                                />
                                {/* Gradient Overlay for text readability if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-6 left-6 z-10">
                            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Visual_Log // 0{currentPhoto + 1}</p>
                        </div>
                    </div>

                    {/* Skill Pillar: Extraction */}
                    <div className="md:col-span-4 md:row-span-2 bg-orange-500 rounded-[3rem] p-10 text-white flex flex-col justify-between hover:rotate-1 transition-transform">
                        <h5 className="text-5xl font-black italic opacity-50">01</h5>
                        <div>
                            <p className="text-2xl font-bold mb-2">Extract</p>
                            <p className="text-orange-100 text-sm font-medium">Developing scalable ELT/ETL workflows using Python, SQL, and PostgreSQL to handle massive geospatial and research datasets.</p>
                        </div>
                    </div>

                    {/* Skill Pillar: AI Integration */}
                    <div className="md:col-span-4 md:row-span-2 bg-white rounded-[3rem] p-10 text-gray-900 border border-gray-100 flex flex-col justify-between shadow-sm hover:-rotate-1 transition-transform">
                        <h5 className="text-5xl font-black italic text-gray-100">02</h5>
                        <div>
                            <p className="text-2xl font-bold mb-2">Integrate</p>
                            <p className="text-gray-500 text-sm font-medium">Bridging the gap between raw data and LLMs. Specialized in AI-driven OCR (Mistral) and automated post-processing.</p>
                        </div>
                    </div>

                    {/* Skill Pillar: Software Logic */}
                    <div className="md:col-span-4 md:row-span-2 bg-rose-500 rounded-[3rem] p-10 text-white flex flex-col justify-between hover:rotate-1 transition-transform">
                        <h5 className="text-5xl font-black italic opacity-50">03</h5>
                        <div>
                            <p className="text-2xl font-bold mb-2">Automate</p>
                            <p className="text-rose-100 text-sm font-medium">Building self-healing systems and Flask/FastAPI tools that ensure high reliability and zero manual friction.</p>
                        </div>
                    </div>

                </div>

                {/* --- ACADEMIC FOUNDATION --- */}
                <div className="mt-32 p-12 bg-white rounded-[4rem] border border-gray-100 shadow-2xl flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden">
                            <Image src="/uwa.jpg" alt="Dharun" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                        <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Education</p>
                        <h4 className="text-4xl font-bold text-gray-900">UWA Bachelor of Science</h4>
                        <p className="text-xl text-gray-500 font-medium italic">Double Major: Data Science & Computer Science</p>
                        <p className="text-gray-500 leading-relaxed">
                            My academic journey at the University of Western Australia is built on the rigor of statistical
                            modelling and computational theory. Expected Completion: December 2025.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}