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
                whileHover={{ y: -4 }}
                className="h-full p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-4 bg-bg-primary"
            >
                <div className="p-3 rounded-full bg-bg-secondary text-text-secondary group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                    {getCategoryIcon(category.name)}
                </div>

                <div>
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors mb-1">
                        {category.name}
                    </h3>
                    {category.count !== undefined && (
                        <p className="text-sm text-text-tertiary">
                            {category.count} APIs
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
