"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, Check, Loader2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface APIPlaygroundProps {
    baseUrl: string;
    apiName: string;
    authType: string;
}

export default function APIPlayground({ baseUrl, apiName, authType }: APIPlaygroundProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [endpoint, setEndpoint] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [responseTime, setResponseTime] = useState<number | null>(null);

    // Common endpoints to try
    const suggestedEndpoints = getSuggestedEndpoints(apiName);

    const handleTryIt = useCallback(async () => {
        setIsLoading(true);
        setResponse(null);
        setError(null);
        setStatusCode(null);
        setResponseTime(null);

        const fullUrl = endpoint ? `${baseUrl}${endpoint}` : baseUrl;

        try {
            const startTime = performance.now();

            // Use a CORS proxy for demo purposes
            // In production, you'd want to handle this server-side
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`;

            const res = await fetch(proxyUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });

            const endTime = performance.now();
            setResponseTime(Math.round(endTime - startTime));
            setStatusCode(res.status);

            const data = await res.json();

            // allorigins wraps the response
            if (data.contents) {
                try {
                    const parsed = JSON.parse(data.contents);
                    setResponse(JSON.stringify(parsed, null, 2));
                } catch {
                    setResponse(data.contents);
                }
            } else {
                setResponse(JSON.stringify(data, null, 2));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch. The API might not support CORS or the endpoint is invalid.");
        } finally {
            setIsLoading(false);
        }
    }, [baseUrl, endpoint]);

    const handleCopy = useCallback(() => {
        if (response) {
            navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [response]);

    // Only show for APIs without auth or with optional auth
    if (authType !== "none") {
        return (
            <div className="mt-6 p-4 bg-bg-secondary/50 border border-border rounded-xl">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>This API requires authentication. Visit the documentation to get started.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
                <Play className="w-4 h-4" />
                Try it out
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 p-4 bg-bg-secondary/50 border border-border rounded-xl space-y-4">
                            {/* Endpoint Input */}
                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-2">
                                    Endpoint (optional)
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center bg-card border border-border rounded-lg overflow-hidden">
                                        <span className="px-3 py-2 text-sm text-text-tertiary bg-bg-secondary border-r border-border">
                                            GET
                                        </span>
                                        <span className="px-2 text-sm text-text-secondary truncate max-w-[200px]">
                                            {baseUrl}
                                        </span>
                                        <input
                                            type="text"
                                            value={endpoint}
                                            onChange={(e) => setEndpoint(e.target.value)}
                                            placeholder="/endpoint"
                                            className="flex-1 px-2 py-2 text-sm bg-transparent text-text-primary placeholder:text-text-tertiary outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleTryIt}
                                        disabled={isLoading}
                                        className={cn(
                                            "px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg transition-all",
                                            "hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed",
                                            "flex items-center gap-2"
                                        )}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Play className="w-4 h-4" />
                                        )}
                                        Run
                                    </button>
                                </div>
                            </div>

                            {/* Suggested Endpoints */}
                            {suggestedEndpoints.length > 0 && (
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-2">
                                        Try these endpoints
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedEndpoints.map((ep) => (
                                            <button
                                                key={ep}
                                                onClick={() => setEndpoint(ep)}
                                                className={cn(
                                                    "px-3 py-1.5 text-xs font-mono bg-card border border-border rounded-lg transition-colors",
                                                    "hover:border-accent hover:text-accent",
                                                    endpoint === ep && "border-accent text-accent bg-accent/5"
                                                )}
                                            >
                                                {ep}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Response */}
                            <AnimatePresence>
                                {(response || error) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <label className="text-xs font-medium text-text-secondary">
                                                    Response
                                                </label>
                                                {statusCode && (
                                                    <span
                                                        className={cn(
                                                            "px-2 py-0.5 text-xs font-medium rounded",
                                                            statusCode >= 200 && statusCode < 300
                                                                ? "bg-success/10 text-success"
                                                                : "bg-error/10 text-error"
                                                        )}
                                                    >
                                                        {statusCode}
                                                    </span>
                                                )}
                                                {responseTime && (
                                                    <span className="text-xs text-text-tertiary">
                                                        {responseTime}ms
                                                    </span>
                                                )}
                                            </div>
                                            {response && (
                                                <button
                                                    onClick={handleCopy}
                                                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <Check className="w-3 h-3 text-success" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3 h-3" />
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            {error ? (
                                                <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
                                                    {error}
                                                </div>
                                            ) : (
                                                <pre className="p-4 bg-[#1e1e2e] border border-border rounded-lg text-sm text-[#cdd6f4] overflow-x-auto max-h-[300px] overflow-y-auto">
                                                    <code>{response}</code>
                                                </pre>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper to suggest endpoints based on the API
function getSuggestedEndpoints(apiName: string): string[] {
    const suggestions: Record<string, string[]> = {
        "PokeAPI": ["/pokemon/pikachu", "/pokemon/1", "/type/electric"],
        "The Rick and Morty API": ["/character", "/location", "/episode"],
        "REST Countries": ["/all", "/name/france", "/alpha/us"],
        "JSONPlaceholder": ["/posts", "/users", "/todos/1"],
        "Random User Generator": ["/?results=5", "/?gender=female"],
        "Official Joke API": ["/random_joke", "/jokes/ten"],
        "ipify": ["/?format=json"],
        "NASA APIs": ["/planetary/apod?api_key=DEMO_KEY"],
        "CoinGecko": ["/ping", "/simple/price?ids=bitcoin&vs_currencies=usd"],
        "Open Library": ["/search.json?q=the+lord+of+the+rings&limit=5"],
    };

    return suggestions[apiName] || [];
}
