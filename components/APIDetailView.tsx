"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CopyUrlButton, ValidateButton } from "@/components/APIDetailActions";
import APICard from "@/components/APICard";
import Button from "@/components/Button";
import HealthBadge from "@/components/HealthBadge";
import { getCategoryIcon } from "@/components/CategoryIcons";
import APIPlayground from "@/components/APIPlayground";
import {
    formatRelativeTime,
    formatResponseTime,
    formatUptime,
    getAuthTypeLabel,
    getPricingLabel,
    getPricingColor,
} from "@/lib/utils";
import type { APIEntry } from "@/lib/types";
import { ArrowLeft, ExternalLink, ShieldCheck, Clock, Activity, Copy, Check } from "lucide-react";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function APIDetailView({
    api,
    relatedAPIs,
}: {
    api: APIEntry;
    relatedAPIs: APIEntry[];
}) {
    return (
        <motion.div
            className="min-h-screen py-8 sm:py-12 bg-bg-primary"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container-padding max-w-5xl mx-auto">
                {/* Breadcrumb / Back */}
                <motion.nav variants={itemVariants} className="mb-8">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Browse
                    </Link>
                </motion.nav>

                {/* Header Section */}
                <motion.header variants={itemVariants} className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-bg-secondary rounded-xl text-text-primary border border-border">
                                    {/* Use the same icon logic as CategoryCard */}
                                    {getCategoryIcon(api.category)}
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-1">{api.name}</h1>
                                    <div className="flex items-center gap-2 text-sm text-text-tertiary">
                                        <span>{api.category}</span>
                                        <span>•</span>
                                        <span className={getPricingColor(api.pricing)}>{getPricingLabel(api.pricing)}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                                {api.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 md:min-w-[200px] md:justify-end">
                            <a
                                href={api.documentation}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="primary" size="lg" rightIcon={<ExternalLink className="w-4 h-4" />}>
                                    Documentation
                                </Button>
                            </a>
                            <CopyUrlButton url={api.baseUrl} />
                        </div>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Status & Stats - Horizontal Tape */}
                        <motion.section
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-border bg-bg-secondary/30"
                        >
                            <StatItem
                                icon={<Activity className="w-4 h-4" />}
                                label="Status"
                                value={<HealthBadge status={api.healthStatus} size="sm" />}
                            />
                            <StatItem
                                icon={<Clock className="w-4 h-4" />}
                                label="Latency"
                                value={formatResponseTime(api.responseTime)}
                            />
                            <StatItem
                                icon={<ShieldCheck className="w-4 h-4" />}
                                label="Auth"
                                value={getAuthTypeLabel(api.authType)}
                            />
                            <StatItem
                                icon={<Check className="w-4 h-4" />}
                                label="Uptime"
                                value={formatUptime(api.uptime)}
                            />
                        </motion.section>

                        {/* Specifications */}
                        <motion.section variants={itemVariants}>
                            <h2 className="text-lg font-semibold mb-4 text-text-primary">Details</h2>
                            <div className="rounded-xl border border-border bg-card overflow-hidden">
                                <DetailRow label="Base URL" value={api.baseUrl} mono copyable />
                                <div className="h-px bg-border w-full" />
                                <DetailRow label="CORS Support" value={api.cors ? "Yes" : "No"} />
                                <div className="h-px bg-border w-full" />
                                <DetailRow label="HTTPS Support" value={api.https ? "Yes" : "No"} />
                                <div className="h-px bg-border w-full" />
                                <DetailRow label="Last Updated" value={formatRelativeTime(api.lastChecked)} />
                            </div>

                            {/* API Playground */}
                            <APIPlayground
                                baseUrl={api.baseUrl}
                                apiName={api.name}
                                authType={api.authType}
                            />
                        </motion.section>

                        {/* Tags */}
                        {api.tags.length > 0 && (
                            <motion.section variants={itemVariants}>
                                <h2 className="text-lg font-semibold mb-3 text-text-primary">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {api.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/search?search=${encodeURIComponent(tag)}`}
                                            className="px-3 py-1.5 bg-bg-secondary text-text-secondary text-sm font-medium rounded-lg hover:bg-bg-tertiary transition-colors border border-transparent hover:border-border"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Related APIs */}
                        {relatedAPIs.length > 0 && (
                            <motion.section variants={itemVariants} className="pt-10 border-t border-border">
                                <h2 className="text-xl font-bold mb-6 text-text-primary">Similar APIs</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {relatedAPIs.map((relatedApi) => (
                                        <APICard key={relatedApi.id} api={relatedApi} variant="compact" />
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Contribution Meta */}
                        <motion.section variants={itemVariants} className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                                Contribution Info
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-text-tertiary">Added by</span>
                                    <span className="font-medium text-text-primary bg-bg-secondary px-2 py-0.5 rounded">{api.contributors.added}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-tertiary">Validated</span>
                                    <span className="font-medium text-text-primary">{api.contributors.lastValidated}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border space-y-3">
                                <ValidateButton apiId={api.id} baseUrl={api.baseUrl} />
                                <Link href={`/contribute?report=${api.id}`} className="block w-full">
                                    <Button variant="secondary" size="sm" className="w-full justify-center">
                                        Report Issue
                                    </Button>
                                </Link>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatItem({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-tertiary text-xs font-medium uppercase tracking-wide">
                {icon}
                {label}
            </div>
            <div className="text-sm font-semibold text-text-primary">{value}</div>
        </div>
    )
}

function DetailRow({
    label,
    value,
    mono = false,
    copyable = false
}: {
    label: string;
    value: string;
    mono?: boolean;
    copyable?: boolean;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-bg-secondary/40 transition-colors">
            <span className="text-sm font-medium text-text-secondary">{label}</span>
            <div className="flex items-center gap-2 max-w-full">
                <span className={`text-sm text-text-primary truncate ${mono ? "font-mono" : ""}`}>
                    {value}
                </span>
                {copyable && (
                    <button
                        className="p-1 text-text-tertiary hover:text-accent transition-colors rounded hover:bg-bg-tertiary"
                        onClick={() => navigator.clipboard.writeText(value)}
                        title="Copy to clipboard"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}
