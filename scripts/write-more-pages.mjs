import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Contribute Page
const contributePage = `"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

type Tab = "add" | "validate" | "report";

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-8">
        <h1 className="text-display-md mb-2">Contribute</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          Help us grow the API registry. Add new APIs, validate existing ones,
          or report issues.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-bg-secondary rounded-lg w-fit mb-8">
          <TabButton
            active={activeTab === "add"}
            onClick={() => setActiveTab("add")}
          >
            Add API
          </TabButton>
          <TabButton
            active={activeTab === "validate"}
            onClick={() => setActiveTab("validate")}
          >
            Validate
          </TabButton>
          <TabButton
            active={activeTab === "report"}
            onClick={() => setActiveTab("report")}
          >
            Report Issue
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="max-w-2xl">
          {activeTab === "add" && <AddAPIForm />}
          {activeTab === "validate" && <ValidateSection />}
          {activeTab === "report" && <ReportIssueForm />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-body-sm font-medium rounded-md transition-colors",
        active
          ? "bg-bg-primary text-text-primary shadow-sm"
          : "text-text-secondary hover:text-text-primary"
      )}
    >
      {children}
    </button>
  );
}

function AddAPIForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="card-base p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-h3 mb-2">API Submitted!</h3>
        <p className="text-body text-text-secondary mb-6">
          Thank you for your contribution. We'll review it shortly.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Add Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 space-y-6">
      <h2 className="text-h3">Add New API</h2>

      <FormField label="API Name" required>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g., OpenWeatherMap"
          className="form-input"
        />
      </FormField>

      <FormField label="Description" required>
        <textarea
          name="description"
          required
          rows={3}
          placeholder="Brief description of what this API does..."
          className="form-input"
        />
      </FormField>

      <FormField label="Base URL" required>
        <input
          type="url"
          name="baseUrl"
          required
          placeholder="https://api.example.com/v1"
          className="form-input"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category" required>
          <select name="category" required className="form-input">
            <option value="">Select category</option>
            <option value="Weather">Weather</option>
            <option value="Finance & Markets">Finance & Markets</option>
            <option value="Development Tools">Development Tools</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Maps & Location">Maps & Location</option>
            <option value="News & Information">News & Information</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Communication">Communication</option>
            <option value="Education">Education</option>
          </select>
        </FormField>

        <FormField label="Authentication" required>
          <select name="authType" required className="form-input">
            <option value="none">No Auth</option>
            <option value="api_key">API Key</option>
            <option value="oauth2">OAuth 2.0</option>
            <option value="jwt">JWT</option>
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Pricing" required>
          <select name="pricing" required className="form-input">
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </FormField>

        <FormField label="Rate Limit">
          <input
            type="text"
            name="rateLimit"
            placeholder="e.g., 1000 req/day"
            className="form-input"
          />
        </FormField>
      </div>

      <FormField label="Documentation URL" required>
        <input
          type="url"
          name="documentation"
          required
          placeholder="https://docs.example.com"
          className="form-input"
        />
      </FormField>

      <FormField label="Tags">
        <input
          type="text"
          name="tags"
          placeholder="weather, forecast, climate (comma-separated)"
          className="form-input"
        />
      </FormField>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="cors" className="form-checkbox" />
          <span className="text-body-sm">CORS Supported</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="https"
            defaultChecked
            className="form-checkbox"
          />
          <span className="text-body-sm">HTTPS</span>
        </label>
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Submit API
      </Button>
    </form>
  );
}

function ValidateSection() {
  return (
    <div className="card-base p-6">
      <h2 className="text-h3 mb-4">Validation Queue</h2>
      <p className="text-body text-text-secondary mb-6">
        Help validate APIs in our registry. Click on an API to run a health
        check and update its status.
      </p>

      <div className="space-y-4">
        <ValidateItem
          name="OpenWeatherMap"
          category="Weather"
          lastChecked="2 hours ago"
        />
        <ValidateItem
          name="GitHub"
          category="Development Tools"
          lastChecked="1 day ago"
        />
        <ValidateItem
          name="CoinGecko"
          category="Finance & Markets"
          lastChecked="3 days ago"
        />
      </div>
    </div>
  );
}

function ValidateItem({
  name,
  category,
  lastChecked,
}: {
  name: string;
  category: string;
  lastChecked: string;
}) {
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleValidate = async () => {
    setIsValidating(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsValidating(false);
    setResult(Math.random() > 0.2 ? "success" : "error");
  };

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div>
        <div className="text-body font-medium">{name}</div>
        <div className="text-caption text-text-tertiary">
          {category} · Last checked {lastChecked}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {result === "success" && (
          <span className="text-success text-sm">✓ Operational</span>
        )}
        {result === "error" && (
          <span className="text-error text-sm">✕ Failed</span>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleValidate}
          isLoading={isValidating}
        >
          Validate
        </Button>
      </div>
    </div>
  );
}

function ReportIssueForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="card-base p-8 text-center">
        <div className="text-5xl mb-4">📨</div>
        <h3 className="text-h3 mb-2">Issue Reported!</h3>
        <p className="text-body text-text-secondary mb-6">
          Thank you for your report. We'll investigate and update the registry.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Report Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 space-y-6">
      <h2 className="text-h3">Report an Issue</h2>

      <FormField label="API Name or ID" required>
        <input
          type="text"
          name="apiId"
          required
          placeholder="e.g., openweathermap"
          className="form-input"
        />
      </FormField>

      <FormField label="Issue Type" required>
        <select name="issueType" required className="form-input">
          <option value="">Select issue type</option>
          <option value="broken">API is broken / not working</option>
          <option value="slow">API is slow / degraded</option>
          <option value="down">API is completely down</option>
          <option value="incorrect_info">Incorrect information</option>
        </select>
      </FormField>

      <FormField label="Description" required>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Describe the issue in detail..."
          className="form-input"
        />
      </FormField>

      <FormField label="Your Email (optional)">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="form-input"
        />
        <p className="text-caption text-text-tertiary mt-1">
          We'll only use this to follow up on your report
        </p>
      </FormField>

      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Submit Report
      </Button>
    </form>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-body-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
`;

fs.mkdirSync(path.join(rootDir, 'app/contribute'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'app/contribute/page.tsx'), contributePage);
console.log('Written: app/contribute/page.tsx');

// Settings Page
const settingsPage = `export default function SettingsPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-8">
        <h1 className="text-display-md mb-2">Settings</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          Manage your preferences and account settings.
        </p>

        <div className="max-w-2xl space-y-8">
          {/* Profile Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Profile</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="text-body font-medium">Guest User</p>
                <p className="text-body-sm text-text-secondary">
                  Sign in to track your contributions
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-text-primary text-bg-primary rounded-lg hover:opacity-90 transition-opacity">
              <GitHubIcon />
              Sign in with GitHub
            </button>
          </section>

          {/* Preferences Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between py-2">
                <div>
                  <p className="text-body font-medium">Email Notifications</p>
                  <p className="text-body-sm text-text-secondary">
                    Get notified when APIs you follow change status
                  </p>
                </div>
                <Toggle />
              </label>
              <label className="flex items-center justify-between py-2">
                <div>
                  <p className="text-body font-medium">Weekly Digest</p>
                  <p className="text-body-sm text-text-secondary">
                    Receive a weekly summary of new APIs and updates
                  </p>
                </div>
                <Toggle />
              </label>
            </div>
          </section>

          {/* Stats Section */}
          <section className="card-base p-6">
            <h2 className="text-h3 mb-4">Your Contributions</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">APIs Added</div>
              </div>
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">
                  Validations
                </div>
              </div>
              <div>
                <div className="text-display-md text-text-primary">0</div>
                <div className="text-body-sm text-text-secondary">
                  Issues Reported
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Toggle() {
  return (
    <button
      type="button"
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-bg-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      role="switch"
      aria-checked="false"
    >
      <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-text-tertiary transition-transform" />
    </button>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.477 0 0 4.477 0 10C0 14.418 2.865 18.166 6.839 19.489C7.339 19.581 7.521 19.272 7.521 19.007C7.521 18.769 7.513 18.14 7.508 17.306C4.726 17.91 4.139 15.967 4.139 15.967C3.685 14.812 3.029 14.503 3.029 14.503C2.121 13.882 3.098 13.895 3.098 13.895C4.101 13.966 4.629 14.926 4.629 14.926C5.521 16.455 6.97 16.013 7.539 15.756C7.631 15.115 7.889 14.673 8.175 14.42C5.954 14.164 3.62 13.307 3.62 9.477C3.62 8.386 4.009 7.493 4.649 6.794C4.546 6.537 4.203 5.518 4.747 4.147C4.747 4.147 5.587 3.873 7.497 5.163C8.313 4.936 9.16 4.823 10 4.819C10.84 4.823 11.687 4.936 12.503 5.163C14.413 3.873 15.253 4.147 15.253 4.147C15.797 5.518 15.454 6.537 15.351 6.794C15.991 7.493 16.38 8.386 16.38 9.477C16.38 13.317 14.043 14.161 11.816 14.411C12.173 14.723 12.497 15.338 12.497 16.27C12.497 17.602 12.485 18.675 12.485 19.007C12.485 19.274 12.665 19.586 13.173 19.488C17.14 18.163 20 14.417 20 10C20 4.477 15.523 0 10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
`;

fs.mkdirSync(path.join(rootDir, 'app/settings'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'app/settings/page.tsx'), settingsPage);
console.log('Written: app/settings/page.tsx');

console.log('Done!');
