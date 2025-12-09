'use client';

import Image from "next/image";
import {motion} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {FcAbout} from "react-icons/fc";
import About from "../components/About";
import Projects from "../components/Projects";


export default function Home() {
  return (
      <div className="flex flex-col items-center bg-zinc-50 dark:bg-black font-sans min-h-screen w-full">
        {/* Headline */}
        <div className="mt-48 text-center">
          <h1 className="text-8xl sm:text-9xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            <motion.span
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="-ml-10 sm:-ml-16"
            >
              DHARUN
            </motion.span>
            <br />
            <motion.span
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="ml-10 sm:ml-16"
            >
              SOMALINGAM
            </motion.span>
          </h1>
        </div>

        {/* Black rectangle under the headline */}
        <div className="mt-48 w-[90%] max-w-8xl h-[85vh] bg-black rounded-t-xl flex items-center justify-center overflow-hidden">
          <div className="flex gap-4 px-8">
            {/* images / 3D objects go here */}
          </div>
        </div>

        {/* About section */}
        <About />


          {/* Project section */}
          <Projects />
      </div>

  );
}
