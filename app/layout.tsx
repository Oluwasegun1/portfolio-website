/** Root layout — wraps every page with providers, global header, and footer. */
import type React from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Monospace face used for eyebrows, tags, and numerals — reinforces an engineering-tool feel */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in your Vercel environment variables to your canonical
// domain (e.g., "https://oluwasegundev.com"). If unset, falls back to the Vercel
// deployment URL. Keeping one source of truth here avoids split indexing.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oluwasegun-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oluwasegun Ogunbanjo — Frontend Engineer",
    template: "%s · Oluwasegun Ogunbanjo",
  },
  description:
    "Frontend Engineer at Voyatek Group — shipped 4 production platforms (travel, hospitality, finance, HR) with React 19, TypeScript & Next.js, including 3 AI assistants and RBAC across 30+ modules. Open to remote / relocation.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "AI Integration",
    "Oluwasegun Ogunbanjo",
    "Lagos",
    "Web Developer",
    "UI Engineer",
    "TanStack Query",
    "Gopaddi",
    "Voyatek",
  ],
  authors: [{ name: "Ogunbanjo Oluwasegun", url: SITE_URL }],
  creator: "Ogunbanjo Oluwasegun",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    title: "Oluwasegun Ogunbanjo — Frontend Engineer",
    description:
      "Frontend Engineer at Voyatek Group — 4 production platforms, 3 AI assistants, 30+ RBAC modules. React 19, TypeScript & Next.js.",
    siteName: "Oluwasegun Ogunbanjo",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Oluwasegun Ogunbanjo — Frontend Engineer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwasegun Ogunbanjo — Frontend Engineer",
    description:
      "Crafting precise, performant web experiences with React & Next.js. 4 production platforms, 3 AI assistants.",
    creator: "@OgunbanjoSegun2",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
};

/** Viewport — themeColor must live here (not in metadata) from Next.js 14+ */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
  ],
};

/** Structured data describing the site owner — helps search engines render a rich profile card */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ogunbanjo Oluwasegun",
  // Consistent with metadata title — avoid split signals
  jobTitle: "Frontend Engineer",
  url: SITE_URL,
  email: "ogunbanjosegun@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  // worksFor adds a rich Organization entity understood by Google's knowledge graph
  worksFor: {
    "@type": "Organization",
    name: "Voyatek Group",
    url: "https://voyatek.com",
  },
  sameAs: [
    "https://github.com/Oluwasegun1",
    "https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/",
    "https://x.com/OgunbanjoSegun2",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Fallback for users/bots with JavaScript disabled */}
        <noscript>
          <div style={{ padding: "1rem", textAlign: "center", fontFamily: "sans-serif" }}>
            This portfolio uses JavaScript for animations and interactivity.
            Please enable JavaScript for the best experience.
          </div>
        </noscript>
        <AppProviders>
          {/* Skip link — first focusable element, only visible while focused */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-500">
            <Header />
            {children}
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
