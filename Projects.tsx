"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects() {
    return (
        <motion.section
            id="projects"
            className="mt-44 w-full px-10 flex flex-col items-start"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* PROJECTS heading */}
            <h3 className="text-6xl sm:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-16">
                Projects
            </h3>

            {/* Grid container for project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                {[1, 2, 3, 4].map((num) => (
                    <motion.div
                        key={num}
                        className="w-full bg-black rounded-xl overflow-hidden shadow-2xl h-[45vh] flex items-center justify-center"
                        initial={{ y: 80, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: num * 0.1,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/uwa.jpg"
                            alt={`Project ${num}`}
                            width={800}
                            height={500}
                            className="object-cover w-full h-full opacity-90 hover:opacity-100 transition"
                        />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
