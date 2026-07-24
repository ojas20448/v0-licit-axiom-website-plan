import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Licit Axiom | Advocates & Solicitors",
    short_name: "Licit Axiom",
    description: "An integrated legal platform offering specialized legal services across multiple forums and jurisdictions in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#1e3a5f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
