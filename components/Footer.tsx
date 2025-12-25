import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Browse APIs", href: "/search" },
    { name: "Categories", href: "/search" },
    { name: "Contribute", href: "/contribute" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Guidelines", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "License", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary mt-auto">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary"
            >
              <LogoIcon />
              <span className="text-h3 font-medium">Public APIs</span>
            </Link>
            <p className="mt-3 text-body-sm text-text-secondary max-w-xs">
              A curated registry of public APIs for developers. Find, validate,
              and integrate APIs with confidence.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8 md:col-span-3">
            <div>
              <h3 className="text-body-sm font-medium text-text-primary mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-body-sm font-medium text-text-primary mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-body-sm font-medium text-text-primary mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-text-tertiary">
            {new Date().getFullYear()} Public APIs. Open source under MIT.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LogoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M9 12H23M9 16H23M9 20H17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
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

function TwitterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9 5.2c-.6.3-1.2.5-1.9.6.7-.4 1.2-1.1 1.5-1.8-.7.4-1.4.7-2.2.8-.6-.7-1.5-1.1-2.5-1.1-1.9 0-3.4 1.5-3.4 3.4 0 .3 0 .5.1.8C7.7 7.7 5.1 6.4 3.3 4.4c-.3.5-.5 1.1-.5 1.8 0 1.2.6 2.2 1.5 2.8-.6 0-1.1-.2-1.6-.4v.1c0 1.6 1.2 3 2.7 3.3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3.1 2.2-1.1.9-2.5 1.4-4.1 1.4H2c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8-.6.3-1.3.5-2 .5z"
        fill="currentColor"
      />
    </svg>
  );
}
