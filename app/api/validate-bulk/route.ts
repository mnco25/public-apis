import { NextRequest, NextResponse } from "next/server";
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
