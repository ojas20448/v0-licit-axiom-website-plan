import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import attorneys from "@/data/attorneys.json"
import practices from "@/data/practices.json"
import blog from "@/data/blog.json"
import careers from "@/data/careers.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/attorneys`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/practices`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/careers`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ]

  const attorneyPages: MetadataRoute.Sitemap = attorneys.map((a) => ({
    url: `${SITE_URL}/attorneys/${a.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const practicePages: MetadataRoute.Sitemap = practices.map((p) => ({
    url: `${SITE_URL}/practices/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blog.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  const careerPages: MetadataRoute.Sitemap = careers.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.4,
  }))

  return [...staticPages, ...attorneyPages, ...practicePages, ...blogPages, ...careerPages]
}
