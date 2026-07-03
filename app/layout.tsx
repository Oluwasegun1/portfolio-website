/** Root layout — wraps every page with providers, global header, and footer. */
import type React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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

export const metadata: Metadata = {
  title: "Oluwasegun — Frontend Developer",
  description:
    "Frontend Developer crafting beautiful, performant, and responsive web experiences with React, Next.js, and modern web technologies. Based in Lagos, Nigeria.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Oluwasegun",
    "Lagos",
    "Web Developer",
    "UI Developer",
  ],
  authors: [{ name: "Ogunbanjo Oluwasegun" }],
  creator: "Ogunbanjo Oluwasegun",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Oluwasegun — Frontend Developer",
    description:
      "Crafting beautiful, performant web experiences with React & Next.js.",
    siteName: "Oluwasegun Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwasegun — Frontend Developer",
    description:
      "Crafting beautiful, performant web experiences with React & Next.js.",
    creator: "@OgunbanjoSegun2",
  },
  icons: {
    icon: [
      { url: "/myImage.jpeg", sizes: "16x16", type: "image/jpeg" },
      { url: "/myImage.jpeg", sizes: "32x32", type: "image/jpeg" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
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
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-500">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
