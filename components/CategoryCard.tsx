"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getCategoryIcon } from "@/components/CategoryIcons";

export default function CategoryCard({
    category,
}: {
    category: { name: string; count?: number };
}) {
    return (
        <Link
            href={`/search?category=${encodeURIComponent(category.name)}`}
            className="block group"
        >
            <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="h-full p-5 bg-card border border-border rounded-xl hover:shadow-md hover:border-accent/30 transition-all duration-300 flex flex-col items-center text-center gap-3"
            >
                <div className="p-3 rounded-xl bg-bg-secondary text-text-secondary group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                    {getCategoryIcon(category.name)}
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {category.name}
                    </h3>
                    {category.count !== undefined && (
                        <p className="text-xs text-text-tertiary mt-1">
                            {category.count} APIs
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
