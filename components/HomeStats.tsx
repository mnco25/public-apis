"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Zap, Layers, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsData {
    totalApis: number;
    totalCategories: number;
    avgResponseTime: number;
    avgUptime: number;
}

export default function HomeStats({ stats }: { stats: StatsData }) {
    return (
        <section className="py-12 md:py-20 relative z-10">
            <div className="container-padding">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    <StatItem
                        icon={<Zap />}
                        value={stats.totalApis}
                        label="Total APIs"
                        delay={0}
                    />
                    <StatItem
                        icon={<Layers />}
                        value={stats.totalCategories}
                        label="Categories"
                        delay={0.1}
                    />
                    <StatItem
                        icon={<Clock />}
                        value={stats.avgResponseTime}
                        label="Avg Latency"
                        suffix="ms"
                        delay={0.2}
                    />
                    <StatItem
                        icon={<TrendingUp />}
                        value={stats.avgUptime}
                        label="Uptime"
                        suffix="%"
                        decimals={2}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}

function StatItem({
    icon,
    value,
    label,
    suffix = "",
    decimals = 0,
    delay = 0,
}: {
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix?: string;
    decimals?: number;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6 sm:p-8 rounded-2xl border border-border/50 bg-bg-secondary/30 backdrop-blur-sm group-hover:border-accent/20 group-hover:bg-bg-secondary/50 transition-all duration-300 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-bg-primary text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all duration-300 shadow-sm ring-1 ring-border/50 group-hover:ring-accent/20">
                    {icon && <div className="w-5 h-5 sm:w-6 sm:h-6">{icon}</div>}
                </div>

                <div className="flex items-baseline gap-0.5 mt-2">
                    <Counter value={value} decimals={decimals} />
                    <span className="text-xl sm:text-2xl font-medium text-text-tertiary">{suffix}</span>
                </div>

                <p className="mt-2 text-sm font-medium text-text-secondary uppercase tracking-wider">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals);
            }
        });
    }, [springValue, decimals]);

    return (
        <span
            ref={ref}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary"
        >
            0
        </span>
    );
}
