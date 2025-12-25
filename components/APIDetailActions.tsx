"use client";

import { useState } from "react";
import Button from "./Button";
import { useToast } from "./Toast";
import { copyToClipboard } from "@/lib/utils";

export function CopyUrlButton({ url }: { url: string }) {
  const { success, error } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const result = await copyToClipboard(url);
    if (result) {
      success("URL copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      error("Failed to copy URL");
    }
  };

  return (
    <Button variant="secondary" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy URL"}
    </Button>
  );
}

export function ValidateButton({
  apiId,
  baseUrl,
}: {
  apiId: string;
  baseUrl: string;
}) {
  const [isValidating, setIsValidating] = useState(false);
  const { success, error } = useToast();

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiId, baseUrl }),
      });

      const data = await response.json();

      if (data.success) {
        success(
          `Validation complete: ${data.status} (${data.responseTime}ms)`
        );
      } else {
        error("Validation failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      error("Failed to validate API");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Button variant="primary" onClick={handleValidate} isLoading={isValidating}>
      {isValidating ? "Validating..." : "Validate Now"}
    </Button>
  );
}
