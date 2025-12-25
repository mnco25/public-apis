import type { HealthStatus, AuthType, PricingType } from "./types";

/**
 * Format a date string to a human-readable relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Format a date string to a full date
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format response time in milliseconds
 */
export function formatResponseTime(ms?: number): string {
  if (ms === undefined) return "N/A";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Format uptime percentage
 */
export function formatUptime(uptime?: number): string {
  if (uptime === undefined) return "N/A";
  return `${uptime.toFixed(2)}%`;
}

/**
 * Get the color class for a health status
 */
export function getHealthStatusColor(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "text-success";
    case "degraded":
      return "text-warning";
    case "down":
      return "text-error";
    case "unknown":
    default:
      return "text-neutral";
  }
}

/**
 * Get the background color class for a health status
 */
export function getHealthStatusBgColor(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "bg-success";
    case "degraded":
      return "bg-warning";
    case "down":
      return "bg-error";
    case "unknown":
    default:
      return "bg-neutral";
  }
}

/**
 * Get human-readable label for health status
 */
export function getHealthStatusLabel(status: HealthStatus): string {
  switch (status) {
    case "operational":
      return "Operational";
    case "degraded":
      return "Degraded";
    case "down":
      return "Down";
    case "unknown":
    default:
      return "Unknown";
  }
}

/**
 * Get human-readable label for auth type
 */
export function getAuthTypeLabel(authType: AuthType): string {
  switch (authType) {
    case "none":
      return "No Auth";
    case "api_key":
      return "API Key";
    case "oauth2":
      return "OAuth 2.0";
    case "jwt":
      return "JWT";
    default:
      return authType;
  }
}

/**
 * Get color class for pricing type
 */
export function getPricingColor(pricing: PricingType): string {
  switch (pricing) {
    case "free":
      return "text-success bg-success/10";
    case "freemium":
      return "text-accent bg-accent/10";
    case "paid":
      return "text-warning bg-warning/10";
    default:
      return "text-text-secondary bg-bg-tertiary";
  }
}

/**
 * Get human-readable label for pricing type
 */
export function getPricingLabel(pricing: PricingType): string {
  switch (pricing) {
    case "free":
      return "Free";
    case "freemium":
      return "Freemium";
    case "paid":
      return "Paid";
    default:
      return pricing;
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class names utility with tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse URL search params to filter state
 */
export function parseSearchParams(
  searchParams: URLSearchParams
): Record<string, string> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Build URL search params from filter state
 */
export function buildSearchParams(
  filters: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
}
