import type React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, ArrowRight, CheckCircle, Building2, Handshake, Scale, Home, Lightbulb, Users } from "lucide-react"
import practices from "@/data/practices.json"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Handshake,
  Scale,
  Home,
  Lightbulb,
  Users,
}

export async function generateStaticParams() {
  return practices.map((practice) => ({
    slug: practice.slug,
  }))
}

import { SITE_URL, SITE_NAME } from "@/lib/site"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const practice = practices.find((p) => p.slug === slug)

  if (!practice) {
    return {
      title: "Practice Area Not Found | Licit Axiom",
    }
  }

  const pageUrl = `${SITE_URL}/practices/${practice.slug}`

  return {
    title: `${practice.name} - Specialized Legal Services | Licit Axiom`,
    description: practice.description || practice.shortDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: SITE_NAME,
      title: `${practice.name} | Licit Axiom`,
      description: practice.description || practice.shortDescription,
      locale: "en_IN",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${practice.name} Legal Services - Licit Axiom`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${practice.name} | Licit Axiom`,
      description: practice.description || practice.shortDescription,
      images: ["/og-image.png"],
    },
  }
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params
  const practice = practices.find((p) => p.slug === slug)

  if (!practice) {
    notFound()
  }

  const Icon = iconMap[practice.icon] || Building2
  const pageUrl = `${SITE_URL}/practices/${practice.slug}`

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: practice.name,
    description: practice.description || practice.shortDescription,
    provider: {
      "@type": "LegalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    url: pageUrl,
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
        name: "Practice Areas",
        item: `${SITE_URL}/practices`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: practice.name,
        item: pageUrl,
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
            <Link
              href="/practices"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Practice Areas
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        {/* Hero Section */}
        <section className="bg-primary bg-pattern py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-start gap-6">
              <AnimatedSection animation="scale" className="hidden md:block">
                <div className="h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/20 flex">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
              </AnimatedSection>
              <div>
                <AnimatedSection animation="fadeUp">
                  <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">{practice.name}</h1>
                  <p className="mt-4 max-w-3xl text-lg text-primary-foreground/80 leading-relaxed">
                    {practice.description}
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Services */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Our Services</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {practice.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA */}
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-semibold">Need Legal Assistance?</h3>
                      <p className="mt-2 text-sm text-primary-foreground/80">
                        Contact us to discuss how we can help with your {practice.name.toLowerCase()} matters.
                      </p>
                      <Button variant="secondary" className="mt-4 w-full" asChild>
                        <Link href="/contact">
                          Schedule Consultation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
