"use client";

import { motion } from "framer-motion";
import SearchBarWrapper from "@/components/SearchBarWrapper";

// Minimalist animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
};

export default function HeroSection() {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
            {/* Animated Gradient Orbs - Subtle floating effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-500/8 via-accent/5 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Grid Pattern - Subtle tech aesthetic */}
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container-padding relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    {/* Badge */}
                    <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-accent/5 text-accent text-sm font-medium mb-8 border border-accent/10 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                            </span>
                            60+ Verified APIs
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="text-text-primary">Find the perfect API</span>
                        <br />
                        <span className="bg-gradient-to-r from-accent via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                            for your next project
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        A curated, open-source registry of public APIs.
                        <span className="hidden sm:inline"> Search, test, and integrate with confidence.</span>
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        variants={scaleIn}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative group">
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative p-1 rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-2xl shadow-accent/5">
                                <SearchBarWrapper size="lg" placeholder="Search APIs... (e.g., weather, crypto, jokes)" showHotkey />
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                    >
                        <span className="text-sm text-text-tertiary">Popular:</span>
                        {['Weather', 'Crypto', 'Movies', 'Random'].map((tag, index) => (
                            <motion.a
                                key={tag}
                                href={`/search?search=${tag.toLowerCase()}`}
                                className="px-3 py-1.5 text-sm text-text-secondary hover:text-accent bg-bg-secondary/50 hover:bg-accent/5 border border-transparent hover:border-accent/20 rounded-full transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                {tag}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-text-tertiary"
                    >
                        <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Daily Health Checks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100% Free & Open Source</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No Auth Required</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
