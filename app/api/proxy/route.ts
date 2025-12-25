
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
    }

    try {
        // Validate string starts with http/https
        if (!url.startsWith("http")) {
            return NextResponse.json({ error: "Invalid URL. Must start with http:// or https://" }, { status: 400 });
        }

        const startTime = performance.now();

        // Fetch from the target API
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "PublicAPIs-Playground/1.0",
                "Accept": "application/json, text/plain, */*",
            },
        });

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        // Get the response body
        let data;
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: data,
            responseTime: responseTime
        });

    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Failed to fetch from target API"
        }, { status: 500 });
    }
}
