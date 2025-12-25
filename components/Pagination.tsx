"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  className,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/search?${params.toString()}`);
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate middle section
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at edges
    if (currentPage <= 3) {
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    // Add ellipsis or page numbers
    if (start > 2) {
      pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!canGoPrev}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          canGoPrev
            ? "text-text-primary hover:bg-bg-secondary"
            : "text-text-tertiary cursor-not-allowed"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 px-2">
        {getPageNumbers().map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-text-tertiary"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-colors",
                page === currentPage
                  ? "bg-accent text-white"
                  : "text-text-primary hover:bg-bg-secondary"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!canGoNext}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          canGoNext
            ? "text-text-primary hover:bg-bg-secondary"
            : "text-text-tertiary cursor-not-allowed"
        )}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon />
      </button>
    </nav>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
