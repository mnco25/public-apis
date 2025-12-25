"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { APIEntry } from "@/lib/types";
import HealthBadge from "./HealthBadge";
import {
  cn,
  getAuthTypeLabel,
  getPricingLabel,
  getPricingColor,
  formatResponseTime,
} from "@/lib/utils";
import { ExternalLink, ArrowRight } from "lucide-react";

interface APICardProps {
  api: APIEntry;
  variant?: "compact" | "detailed";
  isValidating?: boolean;
}

export default function APICard({
  api,
  variant = "compact",
  isValidating = false,
}: APICardProps) {
  if (isValidating) {
    return <APICardSkeleton variant={variant} />;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative flex flex-col justify-between bg-card border border-border rounded-xl transition-all duration-300 overflow-hidden",
        "hover:shadow-lg hover:border-accent/30 bg-bg-primary",
        variant === "compact" ? "p-5" : "p-6"
      )}
    >
      <Link
        href={`/api/${api.id}`}
        className="block focus:outline-none flex-1"
        aria-label={`View details for ${api.name}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary truncate group-hover:text-accent transition-colors duration-200">
              {api.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs font-medium text-text-tertiary">
                {api.category}
              </span>
              <span className="text-text-tertiary/30">•</span>
              <span
                className={cn(
                  "text-xs font-medium",
                  getPricingColor(api.pricing)
                )}
              >
                {getPricingLabel(api.pricing)}
              </span>
            </div>
          </div>
          <HealthBadge status={api.healthStatus} size="sm" />
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {api.description}
        </p>

        {/* Detailed Stats */}
        {variant === "detailed" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-2 mb-5 py-3 border-y border-border-light">
            <StatItem label="Response" value={formatResponseTime(api.responseTime)} />
            <StatItem label="Auth" value={getAuthTypeLabel(api.authType)} />
            <StatItem label="CORS" value={api.cors ? "Yes" : "No"} />
            <StatItem label="HTTPS" value={api.https ? "Yes" : "No"} />
          </div>
        )}

        {/* Tags */}
        {api.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {api.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-bg-secondary text-text-secondary text-[11px] font-medium rounded-md border border-transparent hover:border-border-neutral transition-colors"
                onClick={(e) => {
                  e.preventDefault(); // Don't trigger card click
                  // could allow navigation to tag search here
                }}
              >
                {tag}
              </span>
            ))}
            {api.tags.length > 3 && (
              <span className="text-[10px] text-text-tertiary font-medium self-center px-1">
                +{api.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Actions Footer - Only for detailed view to keep compact view clean */}
      {variant === "detailed" && (
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <a
            href={api.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent transition-colors"
          >
            Docs <ExternalLink className="w-3 h-3" />
          </a>

          <Link
            href={`/api/${api.id}`}
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </motion.article>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-text-tertiary mb-0.5 uppercase tracking-wide">{label}</div>
      <div className="text-xs font-medium text-text-primary truncate" title={value}>{value}</div>
    </div>
  );
}

function APICardSkeleton({ variant }: { variant: "compact" | "detailed" }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl", variant === "compact" ? "p-5" : "p-6")}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="skeleton h-5 w-32 mb-2 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton h-4 w-full mb-2 rounded" />
      <div className="skeleton h-4 w-2/3 mb-4 rounded" />

      {variant === "detailed" && (
        <div className="grid grid-cols-4 gap-2 py-3 my-3">
          <div className="skeleton h-8 w-full rounded" />
          <div className="skeleton h-8 w-full rounded" />
          <div className="skeleton h-8 w-full rounded" />
          <div className="skeleton h-8 w-full rounded" />
        </div>
      )}
      <div className="flex gap-2 mt-auto">
        <div className="skeleton h-5 w-12 rounded" />
        <div className="skeleton h-5 w-12 rounded" />
        <div className="skeleton h-5 w-12 rounded" />
      </div>
    </div>
  );
}

export { APICardSkeleton };
