/** Health status of an API */
export type HealthStatus = "operational" | "degraded" | "down" | "unknown";

/** Authentication type required by an API */
export type AuthType = "none" | "api_key" | "oauth2" | "jwt";

/** Pricing model of an API */
export type PricingType = "free" | "freemium" | "paid";

/** Contributor information for an API */
export interface Contributors {
  added: string;
  lastValidated: string;
}

/** Complete API entry structure */
export interface APIEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  baseUrl: string;
  authType: AuthType;
  cors: boolean;
  https: boolean;
  healthStatus: HealthStatus;
  lastChecked: string;
  rateLimit?: string;
  pricing: PricingType;
  documentation: string;
  tags: string[];
  contributors: Contributors;
  responseTime?: number;
  uptime?: number;
}

/** Category metadata */
export interface Category {
  name: string;
  icon: string;
  description: string;
  count?: number;
}

/** Filter state for search */
export interface FilterState {
  search?: string;
  category?: string;
  pricing?: PricingType;
  authType?: AuthType;
  healthStatus?: HealthStatus;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

/** Available sort options */
export type SortOption = "relevance" | "newest" | "most_validated" | "fastest";

/** Paginated response */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

/** Health check result */
export interface HealthCheckResult {
  status: HealthStatus;
  responseTime: number;
  statusCode: number;
  timestamp: string;
  message?: string;
}

/** Bulk validation result */
export interface BulkValidationResult {
  results: Array<{
    apiId: string;
    status: HealthStatus;
    responseTime: number;
  }>;
  timestamp: string;
}

/** Issue report types */
export type IssueType = "broken" | "slow" | "down" | "incorrect_info";

/** Issue report request */
export interface IssueReport {
  apiId: string;
  issueType: IssueType;
  description: string;
  email?: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Toast notification types */
export type ToastType = "success" | "error" | "warning" | "info";

/** Toast notification */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
