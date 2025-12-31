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
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  metadataBase: new URL("https://public-apis.vercel.app"),
  title: {
    default: "Public APIs - Discover and Validate APIs for Developers",
    template: "%s | Public APIs",
  },
  description:
    "A curated registry of public APIs for developers. Find, validate, and integrate APIs across weather, finance, health, and more. Test APIs directly in your browser with our interactive playground.",
  keywords: [
    "public apis",
    "api directory",
    "api registry",
    "developer tools",
    "rest api",
    "api documentation",
    "free apis",
    "api testing",
    "api playground",
  ],
  authors: [{ name: "Public APIs", url: "https://public-apis.vercel.app" }],
  creator: "Public APIs",
  publisher: "Public APIs",
  openGraph: {
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
    type: "website",
    locale: "en_US",
    url: "https://public-apis.vercel.app",
    siteName: "Public APIs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Public APIs - Discover and Validate APIs",
    description:
      "A curated registry of public APIs for developers. Find, validate, and integrate APIs with confidence.",
    creator: "@publicapis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "/",
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
