import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // In production, you'd fetch the API data from your database
    // For now, let's use dynamic data from the request
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name") || "Public APIs";
    const description = searchParams.get("description") || "Discover and explore free APIs for your next project";
    const category = searchParams.get("category") || "API Registry";
    const status = searchParams.get("status") || "operational";
    const uptime = searchParams.get("uptime") || "99.9%";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    backgroundColor: "#0a0a0f",
                    padding: "60px",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                {/* Top Section */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Category Badge */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            color: "#3b82f6",
                            fontSize: "20px",
                            fontWeight: 500,
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: status === "operational" ? "#22c55e" : "#f59e0b",
                            }}
                        />
                        {category}
                    </div>

                    {/* API Name */}
                    <div
                        style={{
                            fontSize: "72px",
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            maxWidth: "900px",
                        }}
                    >
                        {name}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            fontSize: "28px",
                            color: "#9ca3af",
                            maxWidth: "800px",
                            lineHeight: 1.4,
                        }}
                    >
                        {description.length > 120 ? description.slice(0, 120) + "..." : description}
                    </div>
                </div>

                {/* Bottom Section */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    {/* Brand */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Logo */}
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <div style={{ color: "#ffffff", fontSize: "24px", fontWeight: 600 }}>
                            Public APIs
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                            }}
                        >
                            <div style={{ color: "#9ca3af", fontSize: "16px" }}>Uptime</div>
                            <div style={{ color: "#22c55e", fontSize: "28px", fontWeight: 600 }}>
                                {uptime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
