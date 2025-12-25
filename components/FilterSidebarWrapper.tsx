"use client";

import { Suspense } from "react";
import FilterSidebar from "./FilterSidebar";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterSidebarWrapperProps {
  categories: FilterOption[];
  className?: string;
}

function FilterSidebarFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-9 bg-bg-secondary rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 w-20 bg-bg-secondary rounded" />
        <div className="h-8 bg-bg-secondary rounded" />
        <div className="h-8 bg-bg-secondary rounded" />
        <div className="h-8 bg-bg-secondary rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-16 bg-bg-secondary rounded" />
        <div className="h-8 bg-bg-secondary rounded" />
        <div className="h-8 bg-bg-secondary rounded" />
      </div>
    </div>
  );
}

export default function FilterSidebarWrapper(props: FilterSidebarWrapperProps) {
  return (
    <Suspense fallback={<FilterSidebarFallback />}>
      <FilterSidebar {...props} />
    </Suspense>
  );
}
