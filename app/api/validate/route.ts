import { NextRequest, NextResponse } from "next/server";
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
