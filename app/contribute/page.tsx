"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "add" | "validate" | "report";

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="container-padding py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-display-md mb-3 font-bold tracking-tight text-text-primary">Contribute</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Help us grow the API registry. Add new APIs, validate existing ones,
              or report issues.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-1 p-1.5 bg-bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-full">
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
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "add" && (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AddAPIForm />
                </motion.div>
              )}
              {activeTab === "validate" && (
                <motion.div
                  key="validate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ValidateSection />
                </motion.div>
              )}
              {activeTab === "report" && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReportIssueForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
        "relative px-6 py-2 text-sm font-medium rounded-full transition-colors outline-none focus-visible:ring-2 ring-accent/50",
        active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
      )}
    >
      {active && (
        <motion.div
          layoutId="contribute-tab"
          className="absolute inset-0 bg-card shadow-sm rounded-full border border-border"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
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
      <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">API Submitted!</h3>
        <p className="text-text-secondary mb-8">
          Thank you for your contribution. We'll review it shortly.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Add Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h3">Add New API</h2>
        <a
          href="https://github.com/your-username/public-apis/issues/new?template=add-api.yml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
        >
          Or submit via GitHub →
        </a>
      </div>

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
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
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
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
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
