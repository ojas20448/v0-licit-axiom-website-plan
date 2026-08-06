import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react"
import careers from "@/data/careers.json"
import type { Metadata } from "next"

import { SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Careers & Opportunities | Licit Axiom",
  description: "Join our team of talented advocates, legal researchers, and domain specialists. Explore legal career and internship opportunities at Licit Axiom.",
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/careers`,
    siteName: SITE_NAME,
    title: "Careers & Opportunities | Licit Axiom",
    description: "Explore legal career and internship opportunities at Licit Axiom.",
    locale: "en_IN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Opportunities | Licit Axiom",
    description: "Explore legal career and internship opportunities at Licit Axiom.",
    images: ["/og-image.png"],
  },
}

export default function CareersPage() {
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
        name: "Careers",
        item: `${SITE_URL}/careers`,
      },
    ],
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Licit Axiom Careers",
    description: "Explore legal career and internship opportunities at Licit Axiom.",
    url: `${SITE_URL}/careers`,
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
                  Join Our Team
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
                  We are always looking for talented individuals who share our commitment to excellence and client
                  service. Explore our current openings and take the next step in your legal career.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Why Join Licit Axiom?
            </h2>
            <div className="mt-8 grid gap-4 sm:gap-6 md:mt-10 md:grid-cols-3">
              <AnimatedSection animation="fadeUp" delay={0.1}>
                <Card className="py-0 gap-0 bg-card h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <Briefcase className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">Challenging Work</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Work on complex, high-stakes matters alongside experienced attorneys.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <Card className="py-0 gap-0 bg-card h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">Work-Life Balance</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Flexible arrangements and supportive culture that values your wellbeing.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.3}>
                <Card className="py-0 gap-0 bg-card h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">Growth Opportunities</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clear paths to advancement with mentorship and professional development.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="bg-secondary section">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">Open Positions</h2>
            <div className="mt-8 space-y-4">
              {careers.map((job, index) => (
                <AnimatedSection key={job.id} animation="fadeUp" delay={index * 0.1}>
                  <Link href={`/careers/${job.slug}`} className="group block">
                    <Card className="py-0 gap-0 bg-card transition-colors hover:bg-card/80">
                      <CardContent className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{job.type}</Badge>
                          <ArrowRight className="h-5 w-5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
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
