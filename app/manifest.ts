/** PWA manifest — replaces the two stray, empty site.webmanifest files that used to live in app/ and public/. */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oluwasegun Ogunbanjo — Frontend Developer",
    short_name: "Oluwasegun",
    description: "Frontend Developer crafting precise, performant web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0e",
    theme_color: "#0c0c0e",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
