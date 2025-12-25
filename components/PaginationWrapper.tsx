"use client";

import { Suspense } from "react";
import Pagination from "./Pagination";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

function PaginationFallback() {
  return (
    <div className="flex items-center justify-center gap-1 animate-pulse">
      <div className="w-20 h-9 bg-bg-secondary rounded-lg" />
      <div className="flex gap-1">
        <div className="w-9 h-9 bg-bg-secondary rounded-lg" />
        <div className="w-9 h-9 bg-bg-secondary rounded-lg" />
        <div className="w-9 h-9 bg-bg-secondary rounded-lg" />
      </div>
      <div className="w-16 h-9 bg-bg-secondary rounded-lg" />
    </div>
  );
}

export default function PaginationWrapper(props: PaginationWrapperProps) {
  return (
    <Suspense fallback={<PaginationFallback />}>
      <Pagination {...props} />
    </Suspense>
  );
}
