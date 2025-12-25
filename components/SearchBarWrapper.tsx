"use client";

import { Suspense } from "react";
import SearchBar from "./SearchBar";

interface SearchBarWrapperProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  showHotkey?: boolean;
}

function SearchBarFallback({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeStyles = {
    sm: "h-9",
    md: "h-11",
    lg: "h-14",
  };

  return (
    <div
      className={`w-full rounded-lg border border-border bg-bg-primary animate-pulse ${sizeStyles[size]}`}
    />
  );
}

export default function SearchBarWrapper(props: SearchBarWrapperProps) {
  return (
    <Suspense fallback={<SearchBarFallback size={props.size} />}>
      <SearchBar {...props} />
    </Suspense>
  );
}
