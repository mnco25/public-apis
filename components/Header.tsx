"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse", href: "/search" },
  { name: "Contribute", href: "/contribute" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg-primary/80 backdrop-blur-xl">
      <div className="container-padding">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-text-primary transition-colors"
          >
            <LogoIcon />
            <span className="text-lg font-semibold tracking-tight hidden sm:inline group-hover:text-accent transition-colors duration-300">
              Public APIs
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 bg-bg-secondary p-1 rounded-full border border-border">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) && item.href !== "/";

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 ring-accent/50",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-nav-pill"
                      className="absolute inset-0 bg-bg-primary shadow-sm rounded-full border border-border"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <CommandPalette />
            <ThemeToggle />

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors hover:bg-bg-secondary rounded-full"
              aria-label="View on GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-accent"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="8"
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
