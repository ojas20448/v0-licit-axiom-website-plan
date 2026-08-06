import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { CalendarDays, User } from "lucide-react"
import blogPosts from "@/data/blog.json"
import type { Metadata } from "next"

import { SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Legal Blog & Industry Insights | Licit Axiom",
  description: "Read the latest legal insights, regulatory analysis, arbitration updates, and commercial law commentaries from Licit Axiom.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    title: "Legal Blog & Industry Insights | Licit Axiom",
    description: "Read legal insights, regulatory analysis, and commentaries from Licit Axiom.",
    locale: "en_IN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Blog & Industry Insights | Licit Axiom",
    description: "Read legal insights, regulatory analysis, and commentaries from Licit Axiom.",
    images: ["/og-image.png"],
  },
}

export default function BlogPage() {
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
    ],
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Licit Axiom Blog & Insights",
    description: "Read the latest legal insights, regulatory analysis, arbitration updates, and commercial law commentaries from Licit Axiom.",
    url: `${SITE_URL}/blog`,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <Header />

      <main className="flex-1">
        <section className="section-hero bg-primary bg-pattern">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <AnimatedSection animation="fadeUp">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                  Blog & Insights
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
                  Stay informed with the latest legal developments, industry insights, and thought leadership from our
                  experienced attorneys.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.id} animation="fadeUp" delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group h-full block">
                    <Card className="py-0 gap-0 h-full overflow-hidden bg-card transition-colors hover:bg-secondary">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <h2 className="font-serif text-xl font-semibold text-foreground line-clamp-2">{post.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
