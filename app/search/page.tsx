import { Metadata } from "next";
import { getCategories, searchAPIs } from "@/lib/db";
import FilterSidebarWrapper from "@/components/FilterSidebarWrapper";
import APICard from "@/components/APICard";
import SearchBarWrapper from "@/components/SearchBarWrapper";
import PaginationWrapper from "@/components/PaginationWrapper";

export const metadata: Metadata = {
  title: "Browse APIs - Search and Filter",
  description:
    "Search and filter through our curated collection of public APIs. Filter by category, pricing, authentication type, and health status to find the perfect API for your project.",
};


interface SearchPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    pricing?: string;
    authType?: string;
    healthStatus?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const categories = await getCategories();

  const filters = {
    search: params.search,
    category: params.category,
    pricing: params.pricing as "free" | "freemium" | "paid" | undefined,
    authType: params.authType as "none" | "api_key" | "oauth2" | "jwt" | undefined,
    healthStatus: params.healthStatus as "operational" | "degraded" | "down" | undefined,
    sort: (params.sort || "relevance") as "relevance" | "newest" | "fastest" | "most_validated",
    page: params.page ? parseInt(params.page) : 1,
    limit: 20,
  };

  const { data: apis, total, page, pages } = await searchAPIs(filters);

  const categoryOptions = categories.map((c) => ({
    value: c.name,
    label: c.name,
    count: c.count,
  }));

  return (
    <div className="min-h-screen">
      <div className="container-padding py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-h1 mb-4">Browse APIs</h1>
          <div className="max-w-xl">
            <SearchBarWrapper
              defaultValue={params.search || ""}
              placeholder="Search by name, description, or tags..."
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebarWrapper categories={categoryOptions} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-4">
              <FilterSidebarWrapper categories={categoryOptions} />
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-body-sm text-text-secondary">
                Showing {apis.length} of {total} APIs
              </p>
            </div>

            {/* API Grid */}
            {apis.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
                {apis.map((api) => (
                  <APICard key={api.id} api={api} variant="detailed" />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="mt-8">
                <PaginationWrapper currentPage={page} totalPages={pages} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-h3 mb-2">No APIs found</h3>
      <p className="text-body text-text-secondary">
        Try adjusting your search or filters
      </p>
    </div>
  );
}
