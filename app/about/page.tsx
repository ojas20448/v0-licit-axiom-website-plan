import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Lightbulb, Scale } from "lucide-react"

import { SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Us | Licit Axiom - Advocates & Solicitors",
  description:
    "Learn about Licit Axiom, an integrated legal platform founded on a sui-generis structure bringing together senior advocates, domain experts, and former government officials.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: "About Us | Licit Axiom",
    description: "Learn about Licit Axiom's sui-generis structure, core legal philosophy, and team of experts.",
    locale: "en_IN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Licit Axiom",
    description: "Learn about Licit Axiom's sui-generis structure, core legal philosophy, and team of experts.",
    images: ["/og-image.png"],
  },
}

export default function AboutPage() {

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
        name: "About Us",
        item: `${SITE_URL}/about`,
      },
    ],
  }

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Licit Axiom",
    description: "Learn about Licit Axiom's sui-generis structure, core legal philosophy, and team of experts.",
    url: `${SITE_URL}/about`,
  }

    return (
        <div className="flex min-h-screen flex-col">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
            />
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="section-hero bg-primary">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <AnimatedSection animation="fadeUp">
                                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                                    About Us
                                </h1>
                                <p className="mt-3 sm:mt-6 text-base sm:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                                    We bring together diverse experts to deliver expert-driven legal and business counsel with the precision, responsiveness, and personalised attention that you deserve.
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Who We Are */}
                <section className="section bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <AnimatedSection animation="slideRight">
                                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground md:text-4xl relative inline-block">
                                        Who We Are
                                        <span className="absolute -bottom-2 left-0 h-1 w-1/3 bg-accent"></span>
                                    </h2>
                                    <div className="mt-6 space-y-4 text-base sm:mt-8 sm:space-y-6 sm:text-lg text-muted-foreground leading-relaxed">
                                        <p>
                                            Licit Axiom is a full-service law firm and legal consultancy offering integrated solutions for a wide spectrum of legal and business requirements.
                                        </p>
                                        <p>
                                            We understand that navigating the law can be overwhelming. Our approach is thus founded on a sui-generis structure that goes beyond the conventional law firm model. Through a distinctive and collaborative structure, we bring together subject-matter experts best suited to each matter — including experienced advocates, domain specialists, local counsel, and former senior government officials — enabling us to provide strategic, practical, and effective legal solutions.
                                        </p>
                                        <p>
                                            We represent individuals, start-ups, business entities, and established corporations with a commitment to strategic legal counsel, commercial understanding, responsiveness, and personalised attention.
                                        </p>
                                    </div>
                                </AnimatedSection>
                            </div>
                            {/* A full-width square is ~343px of image on a phone.
                                A 3:2 crop carries the same impression for less scroll. */}
                            <div className="relative aspect-[3/2] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                                <AnimatedSection animation="slideLeft" delay={0.2}>
                                    <Image
                                        src="/elegant-law-office-interior-with-navy-blue-and-gol.jpg"
                                        alt="Licit Axiom Office Interior"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 sm:p-8">
                                        <div className="text-white">
                                            <p className="font-serif text-xl sm:text-2xl font-bold">Excellence in Practice</p>
                                            <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2">Dedicated to your success</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Philosophy */}
                <section className="bg-secondary section">
                    <div className="container mx-auto px-4 md:px-6">
                        <AnimatedSection animation="fadeUp">
                            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-16">
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                    Our Philosophy
                                </h2>
                                <p className="mt-4 text-muted-foreground">The core principles that drive us</p>
                            </div>
                        </AnimatedSection>

                        <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
                            <AnimatedSection animation="fadeUp" delay={0.1}>
                                <Card className="py-0 gap-0 h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-5 sm:p-8 flex flex-col items-start gap-3 sm:gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Scale className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-serif">A Sui Generis Structure</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We bring together diverse experts to deliver strategic, expert-driven legal and business counsel with precision, responsiveness, and the personalised attention every client deserves.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.2}>
                                <Card className="py-0 gap-0 h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-5 sm:p-8 flex flex-col items-start gap-3 sm:gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Target className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-serif">Understanding the Path</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Our approach is rooted in developing a comprehensive understanding of each client’s objectives, challenges, and commercial realities. By examining the path of every matter, we aim to deliver practical, strategic, and result-oriented legal solutions tailored to our clients’ specific needs.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.3}>
                                <Card className="py-0 gap-0 h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-5 sm:p-8 flex flex-col items-start gap-3 sm:gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Lightbulb className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-serif">Strategic Thinking</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We adopt a forward-thinking approach, combining legal insight with practical understanding to develop strategies that address complex challenges with clarity, innovation, and commercial sensibility.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.4}>
                                <Card className="py-0 gap-0 h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-5 sm:p-8 flex flex-col items-start gap-3 sm:gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Users className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-serif">Dedicated Contact</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Every client is assigned a dedicated single point of contact, ensuring clear communication and a service that is tailored exclusively to your requirements.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    )
}
