import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export const alt = "Public APIs - Discover Free APIs for Your Next Project";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0a0a0f",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "32px",
                        zIndex: 10,
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="48"
                            height="48"
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

                    {/* Title */}
                    <div
                        style={{
                            fontSize: "72px",
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Public APIs
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: "28px",
                            color: "#9ca3af",
                            maxWidth: "600px",
                            textAlign: "center",
                        }}
                    >
                        Discover free APIs for your next project
                    </div>

                    {/* Stats */}
                    <div
                        style={{
                            display: "flex",
                            gap: "48px",
                            marginTop: "24px",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ fontSize: "40px", fontWeight: 700, color: "#3b82f6" }}>25+</div>
                            <div style={{ fontSize: "16px", color: "#6b7280" }}>APIs</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ fontSize: "40px", fontWeight: 700, color: "#8b5cf6" }}>12</div>
                            <div style={{ fontSize: "16px", color: "#6b7280" }}>Categories</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ fontSize: "40px", fontWeight: 700, color: "#22c55e" }}>99.9%</div>
                            <div style={{ fontSize: "16px", color: "#6b7280" }}>Uptime</div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
