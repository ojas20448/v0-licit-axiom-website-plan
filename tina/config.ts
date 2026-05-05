import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ==================== ATTORNEYS ====================
      {
        name: "attorney",
        label: "Attorneys",
        path: "content/attorneys",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Full Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Job Title",
            required: true,
            description: "e.g. Managing Partner, Senior Partner, Partner, Senior Associate",
          },
          {
            type: "image",
            name: "photo",
            label: "Photo",
            description: "Professional headshot (recommended 600x800px)",
          },
          {
            type: "string",
            name: "email",
            label: "Email Address",
            required: true,
          },
          {
            type: "string",
            name: "phone",
            label: "Phone Number",
            required: true,
          },
          {
            type: "string",
            name: "education",
            label: "Education",
            list: true,
            description: "One entry per degree/qualification",
          },
          {
            type: "string",
            name: "experience",
            label: "Experience Highlights",
            list: true,
            description: "Key experience bullet points",
          },
          {
            type: "string",
            name: "practiceAreas",
            label: "Practice Areas",
            list: true,
            description: "Areas of specialization",
          },
          {
            type: "string",
            name: "bio",
            label: "Biography",
            ui: {
              component: "textarea",
            },
            required: true,
          },
        ],
      },

      // ==================== BLOG POSTS ====================
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
            required: true,
            description: "Short summary shown in listings",
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true,
          },
          {
            type: "string",
            name: "authorSlug",
            label: "Author Slug",
            required: true,
            description: "Must match an attorney slug for profile linking",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Corporate Law",
              "Employment Law",
              "Intellectual Property",
              "Real Estate",
              "Dispute Resolution",
              "Banking & Finance",
              "Technology Law",
              "Mergers & Acquisitions",
            ],
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            description: "e.g. '5 min read'",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },

      // ==================== CAREERS ====================
      {
        name: "career",
        label: "Job Postings",
        path: "content/careers",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Job Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Employment Type",
            required: true,
            options: ["Full-time", "Part-time", "Internship", "Contract"],
          },
          {
            type: "string",
            name: "department",
            label: "Department",
            required: true,
          },
          {
            type: "string",
            name: "experience",
            label: "Experience Required",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Job Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "responsibilities",
            label: "Key Responsibilities",
            list: true,
          },
          {
            type: "string",
            name: "requirements",
            label: "Requirements",
            list: true,
          },
          {
            type: "string",
            name: "benefits",
            label: "Benefits",
            list: true,
          },
          {
            type: "datetime",
            name: "postedDate",
            label: "Posted Date",
          },
        ],
      },

      // ==================== PRACTICE AREAS ====================
      {
        name: "practice",
        label: "Practice Areas",
        path: "content/practices",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Practice Area Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon Emoji",
            required: true,
            description: "Single emoji character (e.g. 🏢, ⚖️, 💡)",
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            required: true,
            description: "One-liner shown in cards",
          },
          {
            type: "string",
            name: "description",
            label: "Full Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "services",
            label: "Services",
            list: true,
            description: "List of services offered under this practice",
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQs",
            list: true,
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true,
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "relatedAttorneys",
            label: "Related Attorney Slugs",
            list: true,
            description: "Slugs of attorneys who handle this practice area",
          },
        ],
      },
    ],
  },
});
