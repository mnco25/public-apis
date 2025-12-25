import { notFound } from "next/navigation";
import { getAPIBySlug, getRelatedAPIs } from "@/lib/db";
import APIDetailView from "@/components/APIDetailView";

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

  return <APIDetailView api={api} relatedAPIs={relatedAPIs} />;
}
