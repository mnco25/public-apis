"use client";

import { useMemo } from "react";

interface JsonViewerProps {
    data: string;
    maxHeight?: string;
}

export default function JsonViewer({ data, maxHeight = "400px" }: JsonViewerProps) {
    const highlighted = useMemo(() => {
        try {
            // Parse and re-stringify to ensure valid JSON formatting
            const parsed = JSON.parse(data);
            return syntaxHighlight(JSON.stringify(parsed, null, 2));
        } catch {
            // If not valid JSON, return as plain text
            return escapeHtml(data);
        }
    }, [data]);

    return (
        <div
            className="json-viewer rounded-xl overflow-hidden border border-border"
            style={{ maxHeight }}
        >
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-border/50">
                <span className="text-xs font-medium text-[#6c7086]">Response Body</span>
                <span className="text-xs text-[#6c7086]">JSON</span>
            </div>
            <pre
                className="p-4 bg-[#1e1e2e] text-sm font-mono overflow-auto m-0"
                style={{ maxHeight: `calc(${maxHeight} - 40px)` }}
            >
                <code
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                    className="leading-relaxed"
                />
            </pre>
        </div>
    );
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function syntaxHighlight(json: string): string {
    // Syntax highlighting with Catpuccin Mocha colors
    const colors = {
        key: "#89b4fa",      // Blue
        string: "#a6e3a1",   // Green
        number: "#fab387",   // Peach
        boolean: "#cba6f7",  // Mauve
        null: "#f38ba8",     // Red
        punctuation: "#6c7086", // Overlay
    };

    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        (match) => {
            let color = colors.number;
            let fontWeight = "normal";

            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    // Key
                    color = colors.key;
                    fontWeight = "500";
                    // Remove the colon for styling, we'll add it back
                    match = match.slice(0, -1);
                    return `<span style="color: ${color}; font-weight: ${fontWeight}">${escapeHtml(match)}</span><span style="color: ${colors.punctuation}">:</span>`;
                } else {
                    // String value
                    color = colors.string;
                }
            } else if (/true|false/.test(match)) {
                color = colors.boolean;
            } else if (/null/.test(match)) {
                color = colors.null;
            }

            return `<span style="color: ${color}; font-weight: ${fontWeight}">${escapeHtml(match)}</span>`;
        }
    )
        // Style brackets and braces
        .replace(/([{}\[\],])/g, `<span style="color: ${colors.punctuation}">$1</span>`);
}
