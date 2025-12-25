import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Ensure directories exist
const dirs = [
  'app/api/search',
  'app/api/categories',
  'app/api/validate',
  'app/api/validate-bulk',
  'app/api/report-issue',
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(rootDir, dir), { recursive: true });
});

// Search API Route
const searchRoute = `import { NextRequest, NextResponse } from "next/server";
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
`;

fs.writeFileSync(path.join(rootDir, 'app/api/search/route.ts'), searchRoute);
console.log('Written: app/api/search/route.ts');

// Categories API Route
const categoriesRoute = `import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db";

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/categories/route.ts'), categoriesRoute);
console.log('Written: app/api/categories/route.ts');

// Validate API Route
const validateRoute = `import { NextRequest, NextResponse } from "next/server";
import { ValidateRequestSchema } from "@/lib/validation";
import { performHealthCheck } from "@/lib/health-check";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validated = ValidateRequestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validated.error.issues },
        { status: 400 }
      );
    }

    const { baseUrl } = validated.data;

    // Perform health check
    const result = await performHealthCheck(baseUrl);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Validate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/validate/route.ts'), validateRoute);
console.log('Written: app/api/validate/route.ts');

// Bulk Validate API Route
const bulkValidateRoute = `import { NextRequest, NextResponse } from "next/server";
import { BulkValidateRequestSchema } from "@/lib/validation";
import { performBulkHealthCheck } from "@/lib/health-check";
import { getAPIById } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validated = BulkValidateRequestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validated.error.issues },
        { status: 400 }
      );
    }

    const { apiIds } = validated.data;

    // Get API details for each ID
    const apis = await Promise.all(
      apiIds.map(async (id) => {
        const api = await getAPIById(id);
        return api ? { id: api.id, baseUrl: api.baseUrl } : null;
      })
    );

    const validApis = apis.filter((api): api is { id: string; baseUrl: string } => api !== null);

    if (validApis.length === 0) {
      return NextResponse.json(
        { error: "No valid APIs found" },
        { status: 400 }
      );
    }

    // Perform bulk health check
    const results = await performBulkHealthCheck(validApis);

    return NextResponse.json({
      success: true,
      results: results.map((r) => ({
        apiId: r.apiId,
        status: r.result.status,
        responseTime: r.result.responseTime,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bulk validate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/validate-bulk/route.ts'), bulkValidateRoute);
console.log('Written: app/api/validate-bulk/route.ts');

// Report Issue API Route
const reportIssueRoute = `import { NextRequest, NextResponse } from "next/server";
import { IssueReportSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validated = IssueReportSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validated.error.issues },
        { status: 400 }
      );
    }

    const { apiId, issueType, description, email } = validated.data;

    // In production, this would:
    // 1. Store the issue in a database
    // 2. Send notifications to maintainers
    // 3. Create a GitHub issue if configured

    console.log("Issue reported:", {
      apiId,
      issueType,
      description,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Issue reported successfully. Thank you for your feedback!",
    });
  } catch (error) {
    console.error("Report issue API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/report-issue/route.ts'), reportIssueRoute);
console.log('Written: app/api/report-issue/route.ts');

console.log('API routes created!');
