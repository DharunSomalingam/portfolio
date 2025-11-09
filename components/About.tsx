'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
    return (
        <motion.section
            id="about"
            className="mt-44 w-full flex flex-col items-end"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }} // fix opacity here
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
        >

            {/* ABOUT heading */}
            <h3 className="text-6xl sm:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mr-16 sm:mr-24">
                About
            </h3>

            {/* Floating Animated Box */}
            <motion.div
                className="mt-24 w-[50%] max-w-5xl h-[65vh] bg-black rounded-t-xl flex items-center justify-center overflow-hidden shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                animate={{
                    y: [0, -15, 0, 10, 0],
                    scale: [1, 1.03, 1, 1.02, 1],
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: 0, // play once
                }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="flex gap-4 px-8">
                    <Image
                        src="/uwa.jpg"
                        alt="Description"
                        width={900}
                        height={650}
                        className="object-contain"
                        />
                </div>
            </motion.div>
        </motion.section>
    );
}
