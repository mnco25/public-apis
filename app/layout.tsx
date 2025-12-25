import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Public APIs - Discover and Validate APIs for Developers",
  description:
    "A curated registry of public APIs for developers. Find, validate, and integrate APIs across weather, finance, health, and more.",
  keywords: [
    "public apis",
    "api directory",
    "api registry",
    "developer tools",
    "rest api",
    "api documentation",
  ],
  authors: [{ name: "Public APIs" }],
  openGraph: {
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexMono.variable} antialiased min-h-screen flex flex-col bg-bg-primary text-text-primary transition-colors duration-300`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
