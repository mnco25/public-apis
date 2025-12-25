"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Filter, X, ChevronDown, Trash2 } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  className?: string;
}

const pricingOptions: FilterOption[] = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
];

const authOptions: FilterOption[] = [
  { value: "none", label: "No Auth" },
  { value: "api_key", label: "API Key" },
  { value: "oauth2", label: "OAuth 2.0" },
  { value: "jwt", label: "JWT" },
];

const healthOptions: FilterOption[] = [
  { value: "operational", label: "Operational" },
  { value: "degraded", label: "Degraded" },
  { value: "down", label: "Down" },
];

const sortOptions: FilterOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "fastest", label: "Fastest" },
  { value: "most_validated", label: "Most Validated" },
];

export default function FilterSidebar({
  categories,
  className,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentPricing = searchParams.get("pricing") || "";
  const currentAuthType = searchParams.get("authType") || "";
  const currentHealth = searchParams.get("healthStatus") || "";
  const currentSort = searchParams.get("sort") || "relevance";

  const hasActiveFilters =
    currentCategory || currentPricing || currentAuthType || currentHealth;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to first page
    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);
    router.push(`/search?${params.toString()}`);
  };

  const toggleFilter = (key: string, value: string) => {
    const currentValue = searchParams.get(key);
    updateFilter(key, currentValue === value ? "" : value);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          leftIcon={<Filter className="w-4 h-4" />}
          className="w-full bg-bg-card border-border"
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center bg-accent text-white text-[10px] rounded-full">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-bg-primary border-r border-border h-[calc(100vh-4rem)] sticky top-20 overflow-y-auto hidden lg:block pr-6",
          className
        )}
      >
        <SidebarContent
          categories={categories}
          currentSort={currentSort}
          updateFilter={updateFilter}
          currentCategory={currentCategory}
          toggleFilter={toggleFilter}
          currentPricing={currentPricing}
          currentAuthType={currentAuthType}
          currentHealth={currentHealth}
          hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
        />
      </aside>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-bg-primary shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto pb-20">
          <SidebarContent
            categories={categories}
            currentSort={currentSort}
            updateFilter={updateFilter}
            currentCategory={currentCategory}
            toggleFilter={toggleFilter}
            currentPricing={currentPricing}
            currentAuthType={currentAuthType}
            currentHealth={currentHealth}
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
          />
          <div className="pt-6 mt-4 border-t border-border">
            <Button onClick={() => setIsOpen(false)} variant="primary" className="w-full">Show Results</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Extracted for reuse between desktop sidebar and mobile drawer
function SidebarContent({
  categories,
  currentSort,
  updateFilter,
  currentCategory,
  toggleFilter,
  currentPricing,
  currentAuthType,
  currentHealth,
  hasActiveFilters,
  clearAllFilters
}: any) {
  return (
    <div className="space-y-1 pb-10">
      {/* Sort */}
      <FilterSection title="Sort By" defaultOpen={true}>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="w-full h-10 pl-3 pr-8 text-sm border border-border rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent appearance-none cursor-pointer transition-shadow"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-text-tertiary pointer-events-none" />
        </div>
      </FilterSection>

      {/* Pricing */}
      <FilterSection title="Pricing" defaultOpen={true}>
        <div className="space-y-1">
          {pricingOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={currentPricing === option.value}
              onChange={() => toggleFilter("pricing", option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-1 max-h-60 overflow-y-auto pr-1 thin-scrollbar">
          {categories.map((category: any) => (
            <FilterCheckbox
              key={category.value}
              label={category.label}
              count={category.count}
              checked={currentCategory === category.value}
              onChange={() => toggleFilter("category", category.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Auth Type */}
      <FilterSection title="Authentication">
        <div className="space-y-1">
          {authOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={currentAuthType === option.value}
              onChange={() => toggleFilter("authType", option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Health Status */}
      <FilterSection title="Status">
        <div className="space-y-1">
          {healthOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={currentHealth === option.value}
              onChange={() => toggleFilter("healthStatus", option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Clear All */}
      {hasActiveFilters && (
        <div className="pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full justify-center text-text-tertiary hover:text-error hover:bg-error/5"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = false,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group py-1"
      >
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-text-tertiary group-hover:text-accent transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={cn(
      "flex items-center gap-2.5 py-1.5 px-2 rounded-lg cursor-pointer transition-colors group",
      checked ? "bg-accent/5" : "hover:bg-bg-secondary"
    )}>
      <div className={cn(
        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
        checked ? "bg-accent border-accent" : "border-border-neutral bg-white group-hover:border-accent"
      )}>
        {checked && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white"><svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></motion.div>}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden" // hide default checkbox
      />
      <span className={cn("flex-1 text-sm transition-colors", checked ? "font-medium text-text-primary" : "text-text-secondary")}>{label}</span>
      {count !== undefined && (
        <span className="text-xs text-text-tertiary bg-bg-secondary px-1.5 py-0.5 rounded-full">{count}</span>
      )}
    </label>
  );
}
