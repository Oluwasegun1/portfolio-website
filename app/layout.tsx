import type React from "react";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";

const inter: ReturnType<typeof Inter> = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devvo Portfolio",
  description: "A showcase of my web development projects and skills",
  icons: {
    icon: [
      { url: "/app/devvo.png", sizes: "16x16", type: "image/png" },
      { url: "/app/devvo.png", sizes: "32x32", type: "image/png" },
      { url: "/app/devvo.png", sizes: "96x96", type: "image/png" },
      { url: "/app/devvo.png", sizes: "192x192", type: "image/png" },
      { url: "/app/devvo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
