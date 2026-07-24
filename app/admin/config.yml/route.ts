import { NextResponse } from "next/server"

const yamlConfig = `backend:
  name: github
  repo: ojas20448/v0-licit-axiom-website-plan
  branch: main
  site_domain: licitaxiom.com

display_url: https://licitaxiom.com
media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "blog"
    label: "Blog Posts"
    label_singular: "Blog Post"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    format: "json"
    file: "data/blog.json"
    extension: "json"
    fields:
      - { label: "ID", name: "id", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Category", name: "category", widget: "string" }
      - { label: "Author", name: "author", widget: "string" }
      - { label: "Author Slug", name: "authorSlug", widget: "string" }
      - { label: "Date", name: "date", widget: "date", format: "YYYY-MM-DD" }
      - { label: "Cover Image", name: "image", widget: "image", required: false }
      - { label: "Full Content", name: "content", widget: "markdown" }

  - name: "careers"
    label: "Career Openings"
    label_singular: "Career Opening"
    folder: "content/careers"
    create: true
    slug: "{{slug}}"
    format: "json"
    file: "data/careers.json"
    extension: "json"
    fields:
      - { label: "ID", name: "id", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Job Title", name: "title", widget: "string" }
      - { label: "Department", name: "department", widget: "string" }
      - { label: "Location", name: "location", widget: "string" }
      - { label: "Job Type", name: "type", widget: "select", options: ["Full-time", "Part-time", "Internship", "Contract"] }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Responsibilities", name: "responsibilities", widget: "list" }
      - { label: "Requirements", name: "requirements", widget: "list" }
      - { label: "Benefits", name: "benefits", widget: "list" }
`

export async function GET() {
  return new NextResponse(yamlConfig, {
    headers: {
      "Content-Type": "text/yaml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
