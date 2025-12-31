import { MetadataRoute } from "next";
import { getAPIs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://public-apis.vercel.app";
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contribute`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/settings`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Dynamic API pages
    try {
        const apis = await getAPIs();
        const apiPages: MetadataRoute.Sitemap = apis.map((api) => ({
            url: `${baseUrl}/api/${api.id}`,
            lastModified: api.lastChecked
                ? new Date(api.lastChecked)
                : currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

        return [...staticPages, ...apiPages];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        // Return at least the static pages if there's an error
        return staticPages;
    }
}
