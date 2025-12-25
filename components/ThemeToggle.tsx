"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "@/components/Button";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="flex items-center gap-1 p-1 bg-bg-secondary border border-border rounded-full">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "light"
                        ? "bg-white text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "system"
                        ? "bg-white text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="System Mode"
            >
                <Laptop className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "dark"
                        ? "bg-bg-tertiary text-accent shadow-sm"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                aria-label="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    );
}
