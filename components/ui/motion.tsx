"use client";

import { motion } from "framer-motion";

export const EASING = [0.34, 1.56, 0.64, 1] as const;

export const FADE_IN = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
};

export const SLIDE_UP = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.4, ease: EASING },
};

export const STAGGER_CHILDREN = {
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionHeader = motion.header;
export const MotionNav = motion.nav;
export const MotionSpan = motion.span;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionUL = motion.ul;
export const MotionLI = motion.li;
