import type { HealthStatus, HealthCheckResult } from "./types";

/**
 * Perform a health check on an API endpoint
 */
export async function performHealthCheck(
  baseUrl: string,
  timeout: number = 10000
): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(baseUrl, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    const responseTime = Date.now() - startTime;
    const status = classifyHealthStatus(response.status, responseTime);

    return {
      status,
      responseTime,
      statusCode: response.status,
      timestamp: new Date().toISOString(),
      message: getStatusMessage(status, response.status, responseTime),
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error instanceof Error && error.name === "AbortError") {
      return {
        status: "down",
        responseTime,
        statusCode: 0,
        timestamp: new Date().toISOString(),
        message: `Request timed out after ${timeout}ms`,
      };
    }

    return {
      status: "down",
      responseTime,
      statusCode: 0,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Classify health status based on HTTP status code and response time
 */
function classifyHealthStatus(
  statusCode: number,
  responseTime: number
): HealthStatus {
  // Server errors
  if (statusCode >= 500) {
    return "down";
  }

  // Client errors (excluding 4xx which might be expected for HEAD requests)
  if (statusCode >= 400 && statusCode < 500) {
    // 401, 403 are often expected for APIs requiring auth
    if (statusCode === 401 || statusCode === 403) {
      return responseTime > 3000 ? "degraded" : "operational";
    }
    return "degraded";
  }

  // Success responses
  if (statusCode >= 200 && statusCode < 400) {
    // Slow responses indicate degraded performance
    if (responseTime > 5000) {
      return "degraded";
    }
    return "operational";
  }

  return "unknown";
}

/**
 * Get human-readable status message
 */
function getStatusMessage(
  status: HealthStatus,
  statusCode: number,
  responseTime: number
): string {
  switch (status) {
    case "operational":
      return `API is healthy (${statusCode}, ${responseTime}ms)`;
    case "degraded":
      if (responseTime > 3000) {
        return `API is slow (${responseTime}ms response time)`;
      }
      return `API returned status ${statusCode}`;
    case "down":
      if (statusCode === 0) {
        return "API is unreachable";
      }
      return `API is down (status ${statusCode})`;
    case "unknown":
    default:
      return "Unable to determine API status";
  }
}

/**
 * Perform bulk health checks
 */
export async function performBulkHealthCheck(
  apis: Array<{ id: string; baseUrl: string }>
): Promise<Array<{ apiId: string; result: HealthCheckResult }>> {
  const results = await Promise.allSettled(
    apis.map(async (api) => ({
      apiId: api.id,
      result: await performHealthCheck(api.baseUrl),
    }))
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    return {
      apiId: apis[index].id,
      result: {
        status: "down" as HealthStatus,
        responseTime: 0,
        statusCode: 0,
        timestamp: new Date().toISOString(),
        message: "Health check failed",
      },
    };
  });
}

/**
 * Validate if a URL is reachable (simplified check)
 */
export async function isUrlReachable(url: string): Promise<boolean> {
  try {
    const result = await performHealthCheck(url, 5000);
    return result.status !== "down";
  } catch {
    return false;
  }
}
