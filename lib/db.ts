import type { APIEntry, Category, FilterState, PaginatedResponse } from "./types";
import apisData from "@/data/apis.json";
import categoriesData from "@/data/categories.json";

/**
 * Get all APIs from the data store
 */
export async function getAPIs(): Promise<APIEntry[]> {
  return apisData.apis as APIEntry[];
}

/**
 * Get a single API by ID
 */
export async function getAPIById(id: string): Promise<APIEntry | null> {
  const apis = await getAPIs();
  return apis.find((api) => api.id === id) || null;
}

/**
 * Get a single API by slug (same as ID for now)
 */
export async function getAPIBySlug(slug: string): Promise<APIEntry | null> {
  return getAPIById(slug);
}

/**
 * Search and filter APIs with pagination
 */
export async function searchAPIs(
  filters: FilterState
): Promise<PaginatedResponse<APIEntry>> {
  let apis = await getAPIs();

  // Text search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    apis = apis.filter(
      (api) =>
        api.name.toLowerCase().includes(searchLower) ||
        api.description.toLowerCase().includes(searchLower) ||
        api.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        api.category.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (filters.category) {
    apis = apis.filter(
      (api) => api.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // Pricing filter
  if (filters.pricing) {
    apis = apis.filter((api) => api.pricing === filters.pricing);
  }

  // Auth type filter
  if (filters.authType) {
    apis = apis.filter((api) => api.authType === filters.authType);
  }

  // Health status filter
  if (filters.healthStatus) {
    apis = apis.filter((api) => api.healthStatus === filters.healthStatus);
  }

  // Sorting
  switch (filters.sort) {
    case "newest":
      apis.sort(
        (a, b) =>
          new Date(b.lastChecked).getTime() - new Date(a.lastChecked).getTime()
      );
      break;
    case "fastest":
      apis.sort((a, b) => (a.responseTime || 999) - (b.responseTime || 999));
      break;
    case "most_validated":
      apis.sort((a, b) => (b.uptime || 0) - (a.uptime || 0));
      break;
    case "relevance":
    default:
      // Keep original order or sort by name
      apis.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const total = apis.length;
  const pages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedApis = apis.slice(startIndex, endIndex);

  return {
    data: paginatedApis,
    total,
    page,
    pages,
    limit,
  };
}

/**
 * Get all categories with API counts
 */
export async function getCategories(): Promise<Category[]> {
  const apis = await getAPIs();
  const categories = categoriesData.categories as Category[];

  // Count APIs per category
  return categories.map((category) => ({
    ...category,
    count: apis.filter(
      (api) => api.category.toLowerCase() === category.name.toLowerCase()
    ).length,
  }));
}

/**
 * Get recently validated APIs
 */
export async function getRecentlyValidatedAPIs(
  limit: number = 6
): Promise<APIEntry[]> {
  const apis = await getAPIs();
  return apis
    .sort(
      (a, b) =>
        new Date(b.lastChecked).getTime() - new Date(a.lastChecked).getTime()
    )
    .slice(0, limit);
}

/**
 * Get APIs by category
 */
export async function getAPIsByCategory(category: string): Promise<APIEntry[]> {
  const apis = await getAPIs();
  return apis.filter(
    (api) => api.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get related APIs (same category, excluding the current API)
 */
export async function getRelatedAPIs(
  apiId: string,
  limit: number = 4
): Promise<APIEntry[]> {
  const api = await getAPIById(apiId);
  if (!api) return [];

  const apis = await getAPIs();
  return apis
    .filter(
      (a) =>
        a.id !== apiId &&
        a.category.toLowerCase() === api.category.toLowerCase()
    )
    .slice(0, limit);
}

/**
 * Add a new API (mock implementation - would write to DB in production)
 */
export async function addAPI(
  apiData: Omit<APIEntry, "id" | "healthStatus" | "lastChecked" | "contributors">
): Promise<APIEntry> {
  const newAPI: APIEntry = {
    ...apiData,
    id: apiData.name.toLowerCase().replace(/\s+/g, "-"),
    healthStatus: "unknown",
    lastChecked: new Date().toISOString(),
    contributors: {
      added: "anonymous",
      lastValidated: "anonymous",
    },
  };

  // In production, this would persist to a database
  // For now, we just return the new API object
  console.log("New API added:", newAPI);

  return newAPI;
}

/**
 * Update an existing API
 */
export async function updateAPI(
  id: string,
  updates: Partial<APIEntry>
): Promise<APIEntry | null> {
  const api = await getAPIById(id);
  if (!api) return null;

  const updatedAPI: APIEntry = {
    ...api,
    ...updates,
    id: api.id, // Prevent ID changes
  };

  // In production, this would persist to a database
  console.log("API updated:", updatedAPI);

  return updatedAPI;
}

/**
 * Get aggregate stats for the dashboard
 */
export async function getStats(): Promise<{
  totalApis: number;
  totalCategories: number;
  avgResponseTime: number;
  avgUptime: number;
}> {
  const apis = await getAPIs();
  const categories = await getCategories();

  const apisWithResponseTime = apis.filter((api) => api.responseTime);
  const apisWithUptime = apis.filter((api) => api.uptime);

  return {
    totalApis: apis.length,
    totalCategories: categories.length,
    avgResponseTime:
      apisWithResponseTime.length > 0
        ? Math.round(
            apisWithResponseTime.reduce(
              (sum, api) => sum + (api.responseTime || 0),
              0
            ) / apisWithResponseTime.length
          )
        : 0,
    avgUptime:
      apisWithUptime.length > 0
        ? Number(
            (
              apisWithUptime.reduce(
                (sum, api) => sum + (api.uptime || 0),
                0
              ) / apisWithUptime.length
            ).toFixed(2)
          )
        : 0,
  };
}
