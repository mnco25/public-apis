"use client";

import type { HealthStatus } from "@/lib/types";
import {
  getHealthStatusLabel,
  getHealthStatusColor,
  getHealthStatusBgColor,
  formatRelativeTime,
  cn,
} from "@/lib/utils";

interface HealthBadgeProps {
  status: HealthStatus;
  lastChecked?: string;
  showLastChecked?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function HealthBadge({
  status,
  lastChecked,
  showLastChecked = false,
  size = "md",
  showLabel = true,
}: HealthBadgeProps) {
  const label = getHealthStatusLabel(status);
  const colorClass = getHealthStatusColor(status);
  const bgColorClass = getHealthStatusBgColor(status);

  const sizeStyles = {
    sm: {
      dot: "w-1.5 h-1.5",
      text: "text-xs",
      gap: "gap-1",
    },
    md: {
      dot: "w-2 h-2",
      text: "text-sm",
      gap: "gap-1.5",
    },
    lg: {
      dot: "w-2.5 h-2.5",
      text: "text-base",
      gap: "gap-2",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={cn("inline-flex items-center", styles.gap)}
      role="status"
      aria-label={`Status: ${label}${
        lastChecked ? `, last checked ${formatRelativeTime(lastChecked)}` : ""
      }`}
    >
      <span
        className={cn(
          "rounded-full flex-shrink-0",
          styles.dot,
          bgColorClass,
          status === "operational" && "animate-pulse-slow"
        )}
        aria-hidden="true"
      />
      {showLabel && (
        <span className={cn(styles.text, colorClass, "font-medium")}>
          {label}
        </span>
      )}
      {showLastChecked && lastChecked && (
        <span className={cn(styles.text, "text-text-tertiary")}>
          ({formatRelativeTime(lastChecked)})
        </span>
      )}
    </div>
  );
}

export function HealthStatusDot({
  status,
  className,
}: {
  status: HealthStatus;
  className?: string;
}) {
  const bgColorClass = getHealthStatusBgColor(status);

  return (
    <span
      className={cn(
        "w-2 h-2 rounded-full flex-shrink-0",
        bgColorClass,
        status === "operational" && "animate-pulse-slow",
        className
      )}
      aria-hidden="true"
    />
  );
}
