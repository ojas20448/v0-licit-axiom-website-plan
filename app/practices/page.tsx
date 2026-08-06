import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowRight, Building2, Handshake, Scale, Home, Lightbulb, Users } from "lucide-react"
import practices from "@/data/practices.json"
import type { Metadata } from "next"

import { SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Practice Areas & Legal Solutions | Licit Axiom",
  description:
    "Explore our full spectrum of specialized legal services including Arbitration, Corporate Law, Litigation, IPR, Insolvency & Bankruptcy, M&A, and Regulatory Advisory across India.",
  alternates: {
    canonical: `${SITE_URL}/practices`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/practices`,
    siteName: SITE_NAME,
    title: "Practice Areas & Legal Solutions | Licit Axiom",
    description: "Explore Licit Axiom's comprehensive practice areas and legal solutions.",
    locale: "en_IN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Areas & Legal Solutions | Licit Axiom",
    description: "Explore Licit Axiom's comprehensive practice areas and legal solutions.",
    images: ["/og-image.png"],
  },
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Handshake,
  Scale,
  Home,
  Lightbulb,
  Users,
}

export default function PracticesPage() {
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
        name: "Practices",
        item: `${SITE_URL}/practices`,
      },
    ],
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Licit Axiom Practice Areas",
    description: "Comprehensive legal services provided by Licit Axiom.",
    url: `${SITE_URL}/practices`,
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
                  Practice Areas
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
                  We provide comprehensive legal services across a wide range of practice areas. Our experienced attorneys
                  deliver strategic counsel tailored to your specific needs.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="section">
          <div className="container mx-auto px-4 md:px-6">
            {/* 26 practice areas in a single mobile column ran to roughly six
                phone screens. Two-up with compact cards halves that. */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {practices.map((practice, index) => {
                const Icon = iconMap[practice.icon] || Building2
                return (
                  <AnimatedSection
                    key={practice.id}
                    animation="fadeUp"
                    /* Stagger resets every row so cards near the bottom of a
                       26-item list don't wait ~2.5s to appear. */
                    delay={(index % 3) * 0.1}
                  >
                    <Link href={`/practices/${practice.slug}`} className="group h-full block">
                      <Card className="py-0 gap-0 h-full bg-card transition-colors hover:bg-secondary">
                        <CardContent className="flex h-full flex-col p-4 sm:p-6">
                          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 sm:mb-4 sm:h-14 sm:w-14">
                            <Icon className="h-5 w-5 text-accent sm:h-7 sm:w-7" />
                          </div>
                          <h2 className="font-serif text-base sm:text-xl font-semibold text-foreground text-balance">
                            {practice.name}
                          </h2>
                          <p className="mt-2 text-xs sm:text-base text-muted-foreground leading-relaxed sm:mt-3">
                            {practice.shortDescription}
                          </p>
                          <div className="mt-auto pt-3 inline-flex items-center text-xs sm:text-sm font-medium text-primary group-hover:text-accent">
                            Learn More
                            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
