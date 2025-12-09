"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Projects() {
    const sliderImages = [
        ["/project_1a.png", "/project_2a.png", "/project_3a.png", "/project_4a.png"],
        ["/project_1b.png", "/project_2b.png", "/project_3b.png", "/project_4b.png"],
        ["/project_1c.png", "/project_2c.png", "/project_3c.png", "/project_4c.png"],
        ["/project_1d.png", "/project_2d.png", "/project_3d.png", "/project_4d.png"],
        ["/project_1b.png", "/project_2b.png", "/project_3b.png", "/project_4b.png"],
        ["/project_1a.png", "/project_2a.png", "/project_3a.png", "/project_4a.png"],
    ];

    const projectNames = [
        "CHRONIC CARE WEB PROJECT",
        "AUSTRALIAN ROAD CRASH ANALYSIS DATAWAREHOUSING AND MINING TECHNIQUES",
        "CLIMATE-MIGRATION CENSUS DATA EXTRACTION",
        "OBSIDIAN NOTION PLUGINS",
        "WEATHER DATA VISUALIZATION DASHBOARD",
        "GEOSPATIAL ANALYSIS TOOL",
    ];

    SwiperCore.use([Autoplay, Pagination, Navigation]);

    return (
        <motion.section
            id="projects"
            className="mt-44 w-full flex flex-col items-start scroll-mt-[120px] px-16"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <h3 className="text-6xl sm:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-20">
                Projects
            </h3>

            {/* Grid for six sliders */}
            <div className="grid grid-cols-3 gap-x-16 gap-y-24 w-full max-w-[1500px] ml-32">
                {sliderImages.map((images, sliderIdx) => (
                    <div key={sliderIdx} className="flex flex-col items-center">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            speed={1000} // 1 second slide transition
                            pagination={{ clickable: true }}
                            navigation={false}
                            className="w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl mb-4"
                        >
                            {images.map((src, idx) => (
                                <SwiperSlide key={idx}>
                                    <motion.div
                                        className="w-full h-[60vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl p-4"
                                        initial={{ y: 80, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: idx * 0.1,
                                            ease: "easeOut",
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <img
                                            src={src}
                                            alt={`${projectNames[sliderIdx]} image ${idx + 1}`}
                                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                                        />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Project name */}
                        <p className="mt-2 text-lg sm:text-xl font-semibold text-[#1A1A1A] text-center">
                            {projectNames[sliderIdx]}
                        </p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
