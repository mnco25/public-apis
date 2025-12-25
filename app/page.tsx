import Link from "next/link";
import { getCategories, getRecentlyValidatedAPIs, getStats } from "@/lib/db";
import APICard from "@/components/APICard";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import HomeStats from "@/components/HomeStats";
import { ArrowRight, Zap } from "lucide-react";

export default async function HomePage() {
  const categories = await getCategories();
  const recentAPIs = await getRecentlyValidatedAPIs(6);
  const stats = await getStats();

  return (
    <div className="animate-fade-in">
      <HeroSection />

      {/* Stats Section - Premium & Animated */}
      <HomeStats stats={stats} />

      {/* Categories Grid */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="container-padding">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Browse by Category</h2>
              <p className="text-text-secondary mt-1 text-sm">Explore APIs organized by use case</p>
            </div>
            <Link
              href="/search"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
      <section className="py-16 md:py-20">
        <div className="container-padding">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Recently Validated</h2>
              <p className="text-text-secondary mt-1 text-sm">Fresh APIs verified by the community</p>
            </div>
            <Link
              href="/search?sort=newest"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {recentAPIs.map((api) => (
              <APICard key={api.id} api={api} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
              <Zap className="w-4 h-4" />
              Open Source Project
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Know an API we're missing?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
              Help us grow the registry. Contribute APIs, validate endpoints,
              and keep the data fresh for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contribute"
                className="group inline-flex items-center justify-center gap-2 h-12 px-8 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
              >
                Contribute an API
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-card text-text-primary font-medium rounded-xl border border-border hover:border-accent/30 hover:bg-bg-secondary transition-all duration-300"
              >
                Browse APIs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
