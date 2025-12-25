import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Search Page
const searchPage = `import { Suspense } from "react";
import { getCategories, searchAPIs } from "@/lib/db";
import FilterSidebar from "@/components/FilterSidebar";
import APICard from "@/components/APICard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

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
            <SearchBar
              defaultValue={params.search || ""}
              placeholder="Search by name, description, or tags..."
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div className="skeleton h-96 w-full" />}>
                <FilterSidebar categories={categoryOptions} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-4">
              <FilterSidebar categories={categoryOptions} />
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
                <Pagination currentPage={page} totalPages={pages} />
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
`;

fs.writeFileSync(path.join(rootDir, 'app/search/page.tsx'), searchPage);
console.log('Written: app/search/page.tsx');

// API Detail Page
fs.mkdirSync(path.join(rootDir, 'app/api/[slug]'), { recursive: true });
const apiDetailPage = `import { notFound } from "next/navigation";
import Link from "next/link";
import { getAPIBySlug, getRelatedAPIs } from "@/lib/db";
import HealthBadge from "@/components/HealthBadge";
import APICard from "@/components/APICard";
import Button from "@/components/Button";
import {
  formatDate,
  formatRelativeTime,
  formatResponseTime,
  formatUptime,
  getAuthTypeLabel,
  getPricingLabel,
  getPricingColor,
  copyToClipboard,
} from "@/lib/utils";

interface APIDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function APIDetailPage({ params }: APIDetailPageProps) {
  const { slug } = await params;
  const api = await getAPIBySlug(slug);

  if (!api) {
    notFound();
  }

  const relatedAPIs = await getRelatedAPIs(api.id, 3);

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-body-sm">
          <Link href="/search" className="text-text-secondary hover:text-text-primary">
            Browse
          </Link>
          <span className="mx-2 text-text-tertiary">/</span>
          <span className="text-text-primary">{api.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-display-md mb-2">{api.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-body-sm text-text-secondary">
                  {api.category}
                </span>
                <span
                  className={\`px-2 py-0.5 rounded text-caption font-medium \${getPricingColor(api.pricing)}\`}
                >
                  {getPricingLabel(api.pricing)}
                </span>
                <HealthBadge
                  status={api.healthStatus}
                  lastChecked={api.lastChecked}
                  showLastChecked
                />
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={api.documentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">View Docs</Button>
              </a>
              <CopyUrlButton url={api.baseUrl} />
            </div>
          </div>
        </header>

        {/* Description */}
        <section className="mb-8">
          <p className="text-body-lg text-text-secondary">{api.description}</p>
        </section>

        {/* Overview Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <InfoCard
            label="Base URL"
            value={api.baseUrl}
            copyable
            mono
          />
          <InfoCard label="Authentication" value={getAuthTypeLabel(api.authType)} />
          <InfoCard label="CORS" value={api.cors ? "Supported" : "Not Supported"} />
          <InfoCard label="Rate Limit" value={api.rateLimit || "Not specified"} />
        </section>

        {/* Performance & Health */}
        <section className="card-base p-6 mb-8">
          <h2 className="text-h3 mb-4">Performance & Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-caption text-text-tertiary mb-1">Status</div>
              <HealthBadge status={api.healthStatus} size="lg" />
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">
                Response Time
              </div>
              <div className="text-h3 text-text-primary">
                {formatResponseTime(api.responseTime)}
              </div>
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">Uptime</div>
              <div className="text-h3 text-text-primary">
                {formatUptime(api.uptime)}
              </div>
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">
                Last Checked
              </div>
              <div className="text-body text-text-primary">
                {formatRelativeTime(api.lastChecked)}
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        {api.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-h3 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {api.tags.map((tag) => (
                <Link
                  key={tag}
                  href={\`/search?search=\${encodeURIComponent(tag)}\`}
                  className="px-3 py-1.5 bg-bg-secondary text-text-secondary text-body-sm rounded-lg hover:bg-bg-tertiary transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Contributors */}
        <section className="mb-8">
          <h2 className="text-h3 mb-4">Contributors</h2>
          <div className="flex gap-6 text-body-sm">
            <div>
              <span className="text-text-tertiary">Added by:</span>{" "}
              <span className="text-text-primary">{api.contributors.added}</span>
            </div>
            <div>
              <span className="text-text-tertiary">Last validated by:</span>{" "}
              <span className="text-text-primary">
                {api.contributors.lastValidated}
              </span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="card-base p-6 mb-8">
          <h2 className="text-h3 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <ValidateButton apiId={api.id} baseUrl={api.baseUrl} />
            <Link href={\`/contribute?report=\${api.id}\`}>
              <Button variant="secondary">Report Issue</Button>
            </Link>
          </div>
        </section>

        {/* Related APIs */}
        {relatedAPIs.length > 0 && (
          <section>
            <h2 className="text-h3 mb-4">Related APIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedAPIs.map((relatedApi) => (
                <APICard key={relatedApi.id} api={relatedApi} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  copyable = false,
  mono = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="card-base p-4">
      <div className="text-caption text-text-tertiary mb-1">{label}</div>
      <div
        className={\`text-body-sm text-text-primary \${mono ? "font-mono" : ""} truncate\`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

function CopyUrlButton({ url }: { url: string }) {
  return (
    <Button
      variant="secondary"
      onClick={() => copyToClipboard(url)}
    >
      Copy URL
    </Button>
  );
}

function ValidateButton({ apiId, baseUrl }: { apiId: string; baseUrl: string }) {
  return (
    <Button variant="primary">
      Validate Now
    </Button>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/[slug]/page.tsx'), apiDetailPage);
console.log('Written: app/api/[slug]/page.tsx');

// 404 Page
const notFoundPage = `import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display-xl text-text-tertiary mb-4">404</h1>
        <h2 className="text-h2 mb-4">Page not found</h2>
        <p className="text-body text-text-secondary mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'app/not-found.tsx'), notFoundPage);
console.log('Written: app/not-found.tsx');

console.log('Done!');
