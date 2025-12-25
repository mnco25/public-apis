import { z } from "zod";

/** Health status enum */
export const HealthStatusSchema = z.enum(["operational", "degraded", "down", "unknown"]);

/** Authentication type enum */
export const AuthTypeSchema = z.enum(["none", "api_key", "oauth2", "jwt"]);

/** Pricing type enum */
export const PricingTypeSchema = z.enum(["free", "freemium", "paid"]);

/** Sort option enum */
export const SortOptionSchema = z.enum(["relevance", "newest", "most_validated", "fastest"]);

/** Issue type enum */
export const IssueTypeSchema = z.enum(["broken", "slow", "down", "incorrect_info"]);

/** Contributors schema */
export const ContributorsSchema = z.object({
  added: z.string().min(1),
  lastValidated: z.string().min(1),
});

/** API Entry schema */
export const APIEntrySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.string().min(1),
  baseUrl: z.string().url(),
  authType: AuthTypeSchema,
  cors: z.boolean(),
  https: z.boolean(),
  healthStatus: HealthStatusSchema,
  lastChecked: z.string().datetime(),
  rateLimit: z.string().optional(),
  pricing: PricingTypeSchema,
  documentation: z.string().url(),
  tags: z.array(z.string()).min(1).max(10),
  contributors: ContributorsSchema,
  responseTime: z.number().positive().optional(),
  uptime: z.number().min(0).max(100).optional(),
});

/** Category schema */
export const CategorySchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  description: z.string().min(1),
  count: z.number().optional(),
});

/** Filter state schema */
export const FilterStateSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  pricing: PricingTypeSchema.optional(),
  authType: AuthTypeSchema.optional(),
  healthStatus: HealthStatusSchema.optional(),
  sort: SortOptionSchema.optional(),
  page: z.number().positive().optional(),
  limit: z.number().positive().max(100).optional(),
});

/** Validate single API request schema */
export const ValidateRequestSchema = z.object({
  apiId: z.string().min(1),
  baseUrl: z.string().url(),
});

/** Bulk validate request schema */
export const BulkValidateRequestSchema = z.object({
  apiIds: z.array(z.string().min(1)).min(1).max(50),
});

/** Issue report request schema */
export const IssueReportSchema = z.object({
  apiId: z.string().min(1),
  issueType: IssueTypeSchema,
  description: z.string().min(10).max(1000),
  email: z.string().email().optional(),
});

/** New API submission schema */
export const NewAPISchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  baseUrl: z.string().url(),
  category: z.string().min(1),
  authType: AuthTypeSchema,
  cors: z.boolean(),
  https: z.boolean(),
  rateLimit: z.string().optional(),
  pricing: PricingTypeSchema,
  documentation: z.string().url(),
  tags: z.array(z.string()).min(1).max(10),
});

/** Search query params schema */
export const SearchParamsSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  pricing: z.string().optional(),
  authType: z.string().optional(),
  healthStatus: z.string().optional(),
  sort: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

/** Type exports */
export type ValidateRequest = z.infer<typeof ValidateRequestSchema>;
export type BulkValidateRequest = z.infer<typeof BulkValidateRequestSchema>;
export type IssueReportRequest = z.infer<typeof IssueReportSchema>;
export type NewAPIRequest = z.infer<typeof NewAPISchema>;
export type SearchParams = z.infer<typeof SearchParamsSchema>;
