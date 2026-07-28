/** Sitemap — derived from the same project data that drives the /work routes, so it can't drift out of sync. */
import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oluwasegun-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
