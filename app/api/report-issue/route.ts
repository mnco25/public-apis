import { NextRequest, NextResponse } from "next/server";
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
