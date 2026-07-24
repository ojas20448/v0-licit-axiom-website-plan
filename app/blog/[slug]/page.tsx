import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, CalendarDays, User } from "lucide-react"
import blogPosts from "@/data/blog.json"
import attorneys from "@/data/attorneys.json"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

import { SITE_URL, SITE_NAME } from "@/lib/site"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Post Not Found | Licit Axiom",
    }
  }

  const pageUrl = `${SITE_URL}/blog/${post.slug}`

  return {
    title: `${post.title} | Licit Axiom Insights`,
    description: post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: SITE_NAME,
      title: `${post.title} | Licit Axiom`,
      description: post.excerpt,
      locale: "en_IN",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: post.image && !post.image.includes("placeholder") ? post.image : "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Licit Axiom`,
      description: post.excerpt,
      images: [post.image && !post.image.includes("placeholder") ? post.image : "/og-image.png"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const author = attorneys.find((a) => a.slug === post.authorSlug)
  const pageUrl = `${SITE_URL}/blog/${post.slug}`

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Licit Axiom",
    },
    publisher: {
      "@type": "LegalService",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/licit-axiom-logo-dark.png`,
      },
    },
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              {/* Header */}
              <header className="text-center">
                <AnimatedSection animation="fadeUp">
                  <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
                    {post.category}
                  </span>
                  <h1 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
                    {post.title}
                  </h1>
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              </header>

              {/* Featured Image */}
              <AnimatedSection animation="scale" delay={0.1}>
                <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
                </div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <div className="prose prose-gray dark:prose-invert mx-auto mt-10 max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="mt-10 font-serif text-2xl font-semibold text-foreground">
                          {paragraph.replace("## ", "")}
                        </h2>
                      )
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="mt-8 font-serif text-xl font-semibold text-foreground">
                          {paragraph.replace("### ", "")}
                        </h3>
                      )
                    }
                    if (paragraph.startsWith("- ")) {
                      const items = paragraph.split("\n").filter((line) => line.startsWith("- "))
                      return (
                        <ul key={index} className="mt-4 space-y-2">
                          {items.map((item, i) => (
                            <li key={i} className="text-muted-foreground">
                              {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph.split("\n").filter((line) => line.match(/^\d+\./))
                      return (
                        <ol key={index} className="mt-4 list-decimal space-y-2 pl-6">
                          {items.map((item, i) => (
                            <li key={i} className="text-muted-foreground">
                              {item.replace(/^\d+\.\s*/, "")}
                            </li>
                          ))}
                        </ol>
                      )
                    }
                    return (
                      <p key={index} className="mt-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </AnimatedSection>

              {/* Author */}
              {author && (
                <div className="mt-12 border-t border-border pt-8">
                  <h3 className="text-sm font-medium text-muted-foreground">Written by</h3>
                  <Link
                    href={`/attorneys/${author.slug}`}
                    className="mt-4 flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-secondary"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{author.name}</p>
                      <p className="text-sm text-accent">{author.title}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
