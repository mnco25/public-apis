import Link from "next/link";
import { getCategories, getRecentlyValidatedAPIs, getStats } from "@/lib/db";
import APICard from "@/components/APICard";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";

export default async function HomePage() {
  const categories = await getCategories();
  const recentAPIs = await getRecentlyValidatedAPIs(6);
  const stats = await getStats();

  return (
    <div className="animate-fade-in">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-8 border-y border-border bg-bg-secondary">
        <div className="container-padding">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <StatItem label="Total APIs" value={stats.totalApis.toString()} />
            <StatItem
              label="Categories"
              value={stats.totalCategories.toString()}
            />
            <StatItem
              label="Avg Response"
              value={`${stats.avgResponseTime}ms`}
            />
            <StatItem label="Uptime" value={`${stats.avgUptime}%`} />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container-padding">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h2">Browse by Category</h2>
            <Link
              href="/search"
              className="text-body-sm text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 stagger-children">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Validated */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="container-padding">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h2">Recently Validated</h2>
            <Link
              href="/search?sort=newest"
              className="text-body-sm text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {recentAPIs.map((api) => (
              <APICard key={api.id} api={api} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 mb-4">Know an API we're missing?</h2>
            <p className="text-body text-text-secondary mb-6">
              Help us grow the registry. Contribute APIs, validate endpoints,
              and keep the data fresh.
            </p>
            <Link
              href="/contribute"
              className="inline-flex items-center justify-center h-12 px-8 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors"
            >
              Contribute an API
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-display-md text-text-primary font-medium">
        {value}
      </div>
      <div className="text-body-sm text-text-secondary">{label}</div>
    </div>
  );
}
