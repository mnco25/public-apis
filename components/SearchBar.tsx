"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, debounce } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  showHotkey?: boolean;
}

export default function SearchBar({
  placeholder = "Search APIs...",
  defaultValue = "",
  onSearch,
  autoFocus = false,
  className,
  size = "md",
  showHotkey = false,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(
    defaultValue || searchParams.get("search") || ""
  );

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      } else {
        // Default behavior: update URL params
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
          params.set("search", query);
        } else {
          params.delete("search");
        }
        params.set("page", "1"); // Reset to first page on search
        router.push(`/search?${params.toString()}`);
      }
    }, 300),
    [onSearch, router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    debouncedSearch("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`/search?${params.toString()}`);
    }
  };

  const sizeStyles = {
    sm: "h-9 text-sm px-3",
    md: "h-11 text-base px-4",
    lg: "h-14 text-lg px-5",
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative group", className)}>
      <div className="relative transform transition-all duration-200">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent pointer-events-none">
          <SearchIcon size={size} />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "w-full rounded-xl border border-border bg-white/50 backdrop-blur-sm text-text-primary placeholder:text-text-tertiary shadow-sm",
            "focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent",
            "transition-all duration-300 ease-out",
            sizeStyles[size],
            size === "sm" ? "pl-9 pr-8" : size === "lg" ? "pl-14 pr-12" : "pl-11 pr-10"
          )}
          aria-label="Search APIs"
        />

        {/* Clear Button / Hotkey Hint */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-text-tertiary hover:text-text-primary transition-colors p-1 rounded-full hover:bg-bg-secondary"
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
          {showHotkey && !value && (
            <kbd className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 bg-bg-secondary border border-border-light rounded-md text-[10px] font-medium text-text-tertiary">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </div>
      </div>
    </form>
  );
}

function SearchIcon({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: 16, md: 20, lg: 24 };
  const s = sizeMap[size];

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
