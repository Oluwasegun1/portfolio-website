/** Root layout — wraps every page with providers, global header, and footer. */
import type React from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oluwasegun-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oluwasegun Ogunbanjo — Frontend Developer",
    template: "%s · Oluwasegun Ogunbanjo",
  },
  description:
    "Frontend Developer crafting precise, performant, and accessible web experiences with React, Next.js, and TypeScript. Based in Lagos, Nigeria.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Oluwasegun Ogunbanjo",
    "Lagos",
    "Web Developer",
    "UI Engineer",
  ],
  authors: [{ name: "Ogunbanjo Oluwasegun", url: SITE_URL }],
  creator: "Ogunbanjo Oluwasegun",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    title: "Oluwasegun Ogunbanjo — Frontend Developer",
    description:
      "Crafting precise, performant web experiences with React & Next.js.",
    siteName: "Oluwasegun Ogunbanjo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwasegun Ogunbanjo — Frontend Developer",
    description:
      "Crafting precise, performant web experiences with React & Next.js.",
    creator: "@OgunbanjoSegun2",
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

/** Structured data describing the site owner — helps search engines render a rich profile card */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ogunbanjo Oluwasegun",
  jobTitle: "Frontend Developer",
  url: SITE_URL,
  email: "mailto:ogunbanjosegun@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
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
