import { NextRequest, NextResponse } from "next/server";
import { searchAPIs } from "@/lib/db";
import { SearchParamsSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      pricing: searchParams.get("pricing") || undefined,
      authType: searchParams.get("authType") || undefined,
      healthStatus: searchParams.get("healthStatus") || undefined,
      sort: searchParams.get("sort") || "relevance",
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "20",
    };

    // Validate params
    const validated = SearchParamsSchema.safeParse(params);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: validated.error.issues },
        { status: 400 }
      );
    }

    const filters = {
      search: params.search,
      category: params.category,
      pricing: params.pricing as "free" | "freemium" | "paid" | undefined,
      authType: params.authType as "none" | "api_key" | "oauth2" | "jwt" | undefined,
      healthStatus: params.healthStatus as "operational" | "degraded" | "down" | undefined,
      sort: (params.sort || "relevance") as "relevance" | "newest" | "fastest" | "most_validated",
      page: parseInt(params.page || "1"),
      limit: Math.min(parseInt(params.limit || "20"), 100),
    };

    const result = await searchAPIs(filters);

    return NextResponse.json({
      success: true,
      apis: result.data,
      total: result.total,
      page: result.page,
      pages: result.pages,
      limit: result.limit,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
