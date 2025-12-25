"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-0.5 p-1 bg-bg-secondary border border-border rounded-full">
                <div className="w-7 h-7 rounded-full bg-bg-tertiary animate-pulse" />
                <div className="w-7 h-7 rounded-full bg-bg-tertiary animate-pulse" />
                <div className="w-7 h-7 rounded-full bg-bg-tertiary animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-0.5 p-1 bg-bg-secondary border border-border rounded-full">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "light"
                        ? "bg-bg-primary text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "system"
                        ? "bg-bg-primary text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="System Mode"
            >
                <Monitor className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "dark"
                        ? "bg-bg-primary text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    );
}
