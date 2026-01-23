"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function GlobalCursor() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isIntensive, setIsIntensive] = useState(false);

    // Smooth spring physics for the cursor scale/intensity
    const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
    const cursorScale = useSpring(isIntensive ? 1.5 : 1, springConfig);
    const glowOpacity = useSpring(isIntensive ? 0.15 : 0.05, springConfig);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });

            // Check if the element under the cursor or its parents have the "data-intensive" attribute
            const target = e.target as HTMLElement;
            if (target?.closest('[data-intensive="true"]')) {
                setIsIntensive(true);
            } else {
                setIsIntensive(false);
            }
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <>
            {/* Main Outer Ring */}
            <motion.div
                animate={{
                    x: pos.x - 12,
                    y: pos.y - 12,
                    scale: isIntensive ? 1.8 : 1,
                    borderWidth: isIntensive ? "3px" : "1px",
                    borderColor: isIntensive ? "#f97316" : "#f97316", // Maintain orange
                }}
                transition={{ type: "spring", ...springConfig }}
                className="fixed top-0 left-0 w-6 h-6 border rounded-full pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
            >
                {/* Center Dot */}
                <motion.div
                    animate={{ scale: isIntensive ? 0.5 : 1 }}
                    className="w-1 h-1 bg-orange-500 rounded-full"
                />
            </motion.div>

            {/* Dynamic Background Glow */}
            <motion.div
                animate={{
                    x: pos.x - 150,
                    y: pos.y - 150,
                    scale: isIntensive ? 1.5 : 1,
                    backgroundColor: isIntensive ? "rgba(249, 115, 22, 0.2)" : "rgba(249, 115, 22, 0.05)"
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none z-[9998] hidden lg:block"
            />

            {/* Extra "Neural Spark" effect only when intensive */}
            {isIntensive && (
                <motion.div
                    animate={{ x: pos.x - 2, y: pos.y - 2 }}
                    className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full z-[10000] pointer-events-none shadow-[0_0_15px_#fff]"
                />
            )}
        </>
    );
}