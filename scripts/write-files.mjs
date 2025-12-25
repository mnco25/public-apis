import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Layout file
const layoutContent = `import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Public APIs - Discover and Validate APIs for Developers",
  description:
    "A curated registry of public APIs for developers. Find, validate, and integrate APIs across weather, finance, health, and more.",
  keywords: [
    "public apis",
    "api directory",
    "api registry",
    "developer tools",
    "rest api",
    "api documentation",
  ],
  authors: [{ name: "Public APIs" }],
  openGraph: {
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${ibmPlexMono.variable} antialiased min-h-screen flex flex-col\`}>
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'app/layout.tsx'), layoutContent);
console.log('Written: app/layout.tsx');

// Home page
const homeContent = `import Link from "next/link";
import { getCategories, getRecentlyValidatedAPIs, getStats } from "@/lib/db";
import SearchBar from "@/components/SearchBar";
import APICard from "@/components/APICard";

export default async function HomePage() {
  const categories = await getCategories();
  const recentAPIs = await getRecentlyValidatedAPIs(6);
  const stats = await getStats();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-transparent pointer-events-none" />
        <div className="container-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-xl mb-6">
              Discover APIs.
              <br />
              <span className="text-text-secondary">No clutter. No chaos.</span>
            </h1>
            <p className="text-body-lg text-text-secondary mb-8 max-w-xl mx-auto">
              A curated registry of public APIs for developers. Find, validate,
              and integrate with confidence.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar size="lg" placeholder="Search APIs..." showHotkey />
            </div>
          </div>
        </div>
      </section>

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
              value={\`\${stats.avgResponseTime}ms\`}
            />
            <StatItem label="Uptime" value={\`\${stats.avgUptime}%\`} />
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

function CategoryCard({
  category,
}: {
  category: { name: string; icon: string; count?: number };
}) {
  return (
    <Link
      href={\`/search?category=\${encodeURIComponent(category.name)}\`}
      className="card-base card-hover p-4 text-center group"
    >
      <div className="text-2xl mb-2">
        <CategoryIcon name={category.icon} />
      </div>
      <h3 className="text-body-sm font-medium text-text-primary group-hover:text-accent transition-colors">
        {category.name}
      </h3>
      {category.count !== undefined && (
        <p className="text-caption text-text-tertiary mt-1">
          {category.count} APIs
        </p>
      )}
    </Link>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    cloud: "☁️",
    chart: "📈",
    heart: "❤️",
    book: "📚",
    car: "🚗",
    play: "🎮",
    users: "👥",
    map: "🗺️",
    "shopping-cart": "🛒",
    newspaper: "📰",
    code: "💻",
    message: "💬",
  };
  return <span>{icons[name] || "📦"}</span>;
}
`;

fs.writeFileSync(path.join(rootDir, 'app/page.tsx'), homeContent);
console.log('Written: app/page.tsx');

console.log('Done!');
