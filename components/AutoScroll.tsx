"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AutoScroll({ images }: { images: string[] }) {
    return (
        <div className="w-full h-full overflow-hidden whitespace-nowrap">
            <motion.div
                className="flex"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    duration: 20,      // speed of scroll
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {/* Duplicate images to create infinite loop */}
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="w-[350px] h-full mr-4 inline-block">
                        <Image
                            src={src}
                            alt="Project Image"
                            width={350}
                            height={250}
                            className="object-cover w-full h-full rounded-xl"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
