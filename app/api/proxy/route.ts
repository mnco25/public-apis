import { NextRequest, NextResponse } from "next/server";

// Use Node.js runtime for better fetch compatibility
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json(
            { error: "Missing 'url' parameter" },
            { status: 400 }
        );
    }

    // Validate URL
    try {
        new URL(url);
    } catch {
        return NextResponse.json(
            { error: "Invalid URL format" },
            { status: 400 }
        );
    }

    try {
        const startTime = Date.now();

        // Create an AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "PublicAPIs-Playground/1.0",
                "Accept": "application/json, text/plain, */*",
            },
            signal: controller.signal,
            // @ts-ignore - Next.js specific option
            cache: "no-store",
        });

        clearTimeout(timeoutId);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Get the response body
        let data: unknown;
        const contentType = response.headers.get("content-type") || "";

        try {
            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                // Try to parse as JSON anyway
                try {
                    data = JSON.parse(text);
                } catch {
                    data = text;
                }
            }
        } catch (parseError) {
            data = { parseError: "Could not parse response body" };
        }

        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            data: data,
            responseTime: responseTime,
        });
    } catch (error) {
        console.error("Proxy fetch error:", error);

        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === "AbortError") {
                return NextResponse.json(
                    { error: "Request timed out after 15 seconds" },
                    { status: 504 }
                );
            }

            // Check for common fetch errors
            if (error.message.includes("ENOTFOUND")) {
                return NextResponse.json(
                    { error: "Could not resolve hostname. Check the URL." },
                    { status: 502 }
                );
            }

            if (error.message.includes("ECONNREFUSED")) {
                return NextResponse.json(
                    { error: "Connection refused. The server may be down." },
                    { status: 502 }
                );
            }

            return NextResponse.json(
                { error: `Fetch failed: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
