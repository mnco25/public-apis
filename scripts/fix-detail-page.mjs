import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const apiDetailPage = `import { notFound } from "next/navigation";
import Link from "next/link";
import { getAPIBySlug, getRelatedAPIs } from "@/lib/db";
import HealthBadge from "@/components/HealthBadge";
import APICard from "@/components/APICard";
import Button from "@/components/Button";
import { CopyUrlButton, ValidateButton } from "@/components/APIDetailActions";
import {
  formatRelativeTime,
  formatResponseTime,
  formatUptime,
  getAuthTypeLabel,
  getPricingLabel,
  getPricingColor,
} from "@/lib/utils";

interface APIDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function APIDetailPage({ params }: APIDetailPageProps) {
  const { slug } = await params;
  const api = await getAPIBySlug(slug);

  if (!api) {
    notFound();
  }

  const relatedAPIs = await getRelatedAPIs(api.id, 3);

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-body-sm">
          <Link href="/search" className="text-text-secondary hover:text-text-primary">
            Browse
          </Link>
          <span className="mx-2 text-text-tertiary">/</span>
          <span className="text-text-primary">{api.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-display-md mb-2">{api.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-body-sm text-text-secondary">
                  {api.category}
                </span>
                <span
                  className={\`px-2 py-0.5 rounded text-caption font-medium \${getPricingColor(api.pricing)}\`}
                >
                  {getPricingLabel(api.pricing)}
                </span>
                <HealthBadge
                  status={api.healthStatus}
                  lastChecked={api.lastChecked}
                  showLastChecked
                />
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={api.documentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">View Docs</Button>
              </a>
              <CopyUrlButton url={api.baseUrl} />
            </div>
          </div>
        </header>

        {/* Description */}
        <section className="mb-8">
          <p className="text-body-lg text-text-secondary">{api.description}</p>
        </section>

        {/* Overview Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <InfoCard label="Base URL" value={api.baseUrl} mono />
          <InfoCard label="Authentication" value={getAuthTypeLabel(api.authType)} />
          <InfoCard label="CORS" value={api.cors ? "Supported" : "Not Supported"} />
          <InfoCard label="Rate Limit" value={api.rateLimit || "Not specified"} />
        </section>

        {/* Performance & Health */}
        <section className="card-base p-6 mb-8">
          <h2 className="text-h3 mb-4">Performance & Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-caption text-text-tertiary mb-1">Status</div>
              <HealthBadge status={api.healthStatus} size="lg" />
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">Response Time</div>
              <div className="text-h3 text-text-primary">
                {formatResponseTime(api.responseTime)}
              </div>
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">Uptime</div>
              <div className="text-h3 text-text-primary">
                {formatUptime(api.uptime)}
              </div>
            </div>
            <div>
              <div className="text-caption text-text-tertiary mb-1">Last Checked</div>
              <div className="text-body text-text-primary">
                {formatRelativeTime(api.lastChecked)}
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        {api.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-h3 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {api.tags.map((tag) => (
                <Link
                  key={tag}
                  href={\`/search?search=\${encodeURIComponent(tag)}\`}
                  className="px-3 py-1.5 bg-bg-secondary text-text-secondary text-body-sm rounded-lg hover:bg-bg-tertiary transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Contributors */}
        <section className="mb-8">
          <h2 className="text-h3 mb-4">Contributors</h2>
          <div className="flex gap-6 text-body-sm">
            <div>
              <span className="text-text-tertiary">Added by:</span>{" "}
              <span className="text-text-primary">{api.contributors.added}</span>
            </div>
            <div>
              <span className="text-text-tertiary">Last validated by:</span>{" "}
              <span className="text-text-primary">{api.contributors.lastValidated}</span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="card-base p-6 mb-8">
          <h2 className="text-h3 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <ValidateButton apiId={api.id} baseUrl={api.baseUrl} />
            <Link href={\`/contribute?report=\${api.id}\`}>
              <Button variant="secondary">Report Issue</Button>
            </Link>
          </div>
        </section>

        {/* Related APIs */}
        {relatedAPIs.length > 0 && (
          <section>
            <h2 className="text-h3 mb-4">Related APIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedAPIs.map((relatedApi) => (
                <APICard key={relatedApi.id} api={relatedApi} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="card-base p-4">
      <div className="text-caption text-text-tertiary mb-1">{label}</div>
      <div
        className={\`text-body-sm text-text-primary \${mono ? "font-mono text-xs" : ""} truncate\`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'app/api/[slug]/page.tsx'), apiDetailPage);
console.log('Fixed: app/api/[slug]/page.tsx');
