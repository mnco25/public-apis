"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ArrowRight,
    Zap,
    Sun,
    Moon,
    Monitor,
    Plus,
    BookOpen,
    ExternalLink,
    Layers
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { getCategoryIcon } from "./CategoryIcons";

// Mock data - in production this would come from an API
import apisData from "@/data/apis.json";
import categoriesData from "@/data/categories.json";

const apis = apisData.apis;
const categories = categoriesData.categories;

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { setTheme, theme } = useTheme();

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    // Filter APIs based on search
    const filteredApis = apis.filter((api) =>
        api.name.toLowerCase().includes(search.toLowerCase()) ||
        api.description.toLowerCase().includes(search.toLowerCase()) ||
        api.category.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);

    // Filter categories based on search
    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 4);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary bg-bg-secondary/50 hover:bg-bg-secondary border border-border rounded-lg transition-all duration-200"
            >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-bg-primary border border-border rounded text-text-tertiary">
                    ⌘K
                </kbd>
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Command Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2"
                        >
                            <Command
                                className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                                shouldFilter={false}
                            >
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-4 border-b border-border">
                                    <Search className="w-5 h-5 text-text-tertiary" />
                                    <Command.Input
                                        value={search}
                                        onValueChange={setSearch}
                                        placeholder="Search APIs, categories, or actions..."
                                        className="flex-1 h-14 bg-transparent text-text-primary placeholder:text-text-tertiary outline-none"
                                    />
                                    <kbd className="px-2 py-1 text-xs font-medium bg-bg-secondary border border-border rounded text-text-tertiary">
                                        ESC
                                    </kbd>
                                </div>

                                {/* Results */}
                                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                                    <Command.Empty className="py-8 text-center text-text-tertiary">
                                        No results found.
                                    </Command.Empty>

                                    {/* Quick Actions */}
                                    {!search && (
                                        <Command.Group heading="Quick Actions" className="mb-2">
                                            <GroupHeading>Quick Actions</GroupHeading>
                                            <CommandItem
                                                onSelect={() => runCommand(() => router.push("/search"))}
                                                icon={<Search className="w-4 h-4" />}
                                            >
                                                Browse all APIs
                                            </CommandItem>
                                            <CommandItem
                                                onSelect={() => runCommand(() => router.push("/contribute"))}
                                                icon={<Plus className="w-4 h-4" />}
                                            >
                                                Contribute an API
                                            </CommandItem>
                                            <CommandItem
                                                onSelect={() => runCommand(() => window.open("https://github.com/", "_blank"))}
                                                icon={<BookOpen className="w-4 h-4" />}
                                            >
                                                View on GitHub
                                                <ExternalLink className="w-3 h-3 ml-auto text-text-tertiary" />
                                            </CommandItem>
                                        </Command.Group>
                                    )}

                                    {/* Theme Switcher */}
                                    {!search && (
                                        <Command.Group heading="Theme" className="mb-2">
                                            <GroupHeading>Theme</GroupHeading>
                                            <CommandItem
                                                onSelect={() => runCommand(() => setTheme("light"))}
                                                icon={<Sun className="w-4 h-4" />}
                                                active={theme === "light"}
                                            >
                                                Light Mode
                                            </CommandItem>
                                            <CommandItem
                                                onSelect={() => runCommand(() => setTheme("dark"))}
                                                icon={<Moon className="w-4 h-4" />}
                                                active={theme === "dark"}
                                            >
                                                Dark Mode
                                            </CommandItem>
                                            <CommandItem
                                                onSelect={() => runCommand(() => setTheme("system"))}
                                                icon={<Monitor className="w-4 h-4" />}
                                                active={theme === "system"}
                                            >
                                                System Default
                                            </CommandItem>
                                        </Command.Group>
                                    )}

                                    {/* Categories */}
                                    {(search ? filteredCategories.length > 0 : true) && (
                                        <Command.Group heading="Categories" className="mb-2">
                                            <GroupHeading>Categories</GroupHeading>
                                            {(search ? filteredCategories : categories.slice(0, 4)).map((category) => {
                                                const categoryIcon = getCategoryIcon(category.name);
                                                return (
                                                    <CommandItem
                                                        key={category.name}
                                                        onSelect={() => runCommand(() => router.push(`/search?category=${encodeURIComponent(category.name)}`))}
                                                        icon={<span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{categoryIcon}</span>}
                                                    >
                                                        {category.name}
                                                        <ArrowRight className="w-3 h-3 ml-auto text-text-tertiary opacity-0 group-aria-selected:opacity-100 transition-opacity" />
                                                    </CommandItem>
                                                );
                                            })}
                                        </Command.Group>
                                    )}

                                    {/* APIs */}
                                    {filteredApis.length > 0 && (
                                        <Command.Group heading="APIs" className="mb-2">
                                            <GroupHeading>APIs</GroupHeading>
                                            {filteredApis.map((api) => (
                                                <CommandItem
                                                    key={api.id}
                                                    onSelect={() => runCommand(() => router.push(`/api/${api.id}`))}
                                                    icon={<Zap className="w-4 h-4" />}
                                                >
                                                    <div className="flex flex-col">
                                                        <span>{api.name}</span>
                                                        <span className="text-xs text-text-tertiary truncate max-w-[300px]">
                                                            {api.description}
                                                        </span>
                                                    </div>
                                                    <span className="ml-auto text-xs text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded">
                                                        {api.category}
                                                    </span>
                                                </CommandItem>
                                            ))}
                                        </Command.Group>
                                    )}
                                </Command.List>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-bg-secondary/50 text-xs text-text-tertiary">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-bg-primary border border-border rounded">↑↓</kbd>
                                            Navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-bg-primary border border-border rounded">↵</kbd>
                                            Select
                                        </span>
                                    </div>
                                    <span className="flex items-center gap-1">
                                        <Layers className="w-3 h-3" />
                                        Public APIs
                                    </span>
                                </div>
                            </Command>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-2 py-1.5 text-xs font-medium text-text-tertiary uppercase tracking-wider">
            {children}
        </div>
    );
}

function CommandItem({
    children,
    icon,
    onSelect,
    active = false,
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onSelect: () => void;
    active?: boolean;
}) {
    return (
        <Command.Item
            onSelect={onSelect}
            className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                "aria-selected:bg-accent aria-selected:text-white",
                "text-text-primary",
                active && "bg-bg-secondary"
            )}
        >
            <span className="flex-shrink-0 text-text-secondary group-aria-selected:text-white/80">
                {icon}
            </span>
            {children}
        </Command.Item>
    );
}
