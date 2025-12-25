"use client";

import { motion } from "framer-motion";
import SearchBarWrapper from "@/components/SearchBarWrapper";
import { FADE_IN, SLIDE_UP, STAGGER_CHILDREN } from "@/components/ui/motion";

export default function HeroSection() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-accent/5 to-transparent rounded-[100%] blur-3xl pointer-events-none -z-10 opacity-50" />

            <div className="container-padding relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="initial"
                    animate="animate"
                    variants={STAGGER_CHILDREN}
                >
                    <motion.div variants={SLIDE_UP}>
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
                            The Curated API Registry
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-display-xl mb-6 font-display tracking-tight text-text-primary"
                        variants={SLIDE_UP}
                    >
                        Discover APIs.
                        <br />
                        <span className="text-text-secondary opacity-80">No clutter. No chaos.</span>
                    </motion.h1>

                    <motion.p
                        className="text-body-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed"
                        variants={SLIDE_UP}
                    >
                        A curated registry of public APIs for developers. Find, validate,
                        and integrate with confidence.
                    </motion.p>

                    <motion.div variants={SLIDE_UP} className="max-w-xl mx-auto">
                        <div className="p-1 rounded-2xl bg-bg-primary/60 backdrop-blur-xl border border-border shadow-xl ring-1 ring-black/5 dark:ring-white/5">
                            <SearchBarWrapper size="lg" placeholder="Search APIs..." showHotkey />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={FADE_IN}
                        className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Maybe add some social proof logos here later if requested, keeping it clean for now */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
