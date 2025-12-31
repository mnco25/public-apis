import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAPIBySlug, getRelatedAPIs } from "@/lib/db";
import APIDetailView from "@/components/APIDetailView";

interface APIDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: APIDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const api = await getAPIBySlug(slug);

  if (!api) {
    return {
      title: "API Not Found",
    };
  }

  const title = `${api.name} - ${api.category} API`;
  const description = `${api.description} ${api.pricing === "free" ? "Free" : api.pricing === "freemium" ? "Freemium" : "Paid"} API with ${api.authType === "none" ? "no authentication" : api.authType} authentication. Test it in our interactive playground.`;

  return {
    title,
    description,
    keywords: [
      api.name,
      api.category,
      ...api.tags,
      "api",
      "rest api",
      api.pricing,
      "api documentation",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://public-apis.vercel.app/api/${api.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/api/${api.id}`,
    },
  };
}

export default async function APIDetailPage({ params }: APIDetailPageProps) {
  const { slug } = await params;
  const api = await getAPIBySlug(slug);

  if (!api) {
    notFound();
  }

  const relatedAPIs = await getRelatedAPIs(api.id, 3);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: api.name,
    description: api.description,
    url: `https://public-apis.vercel.app/api/${api.id}`,
    applicationCategory: api.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: api.pricing === "free" ? "0" : undefined,
      priceCurrency: "USD",
    },
    aggregateRating:
      api.uptime !== undefined
        ? {
          "@type": "AggregateRating",
          ratingValue: (api.uptime / 20).toFixed(1), // Convert uptime to 0-5 scale
          bestRating: "5",
          worstRating: "0",
        }
        : undefined,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <APIDetailView api={api} relatedAPIs={relatedAPIs} />
    </>
  );
}
