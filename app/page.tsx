'use client'

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedStat } from "@/components/animated-counter"
import { ArrowRight, Building2, Handshake, Scale, Home, Lightbulb, Users, Award, Globe, Clock, HeartHandshake, Coins, Gavel, ShieldCheck, Zap } from "lucide-react"
import attorneys from "@/data/attorneys.json"
import practices from "@/data/practices.json"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Handshake,
  Scale,
  Home,
  Lightbulb,
  Users,
}

const stats = [
  { value: "26+", label: "Practice Areas" },
  { value: "9+", label: "Expert Professionals" },
  { value: "100+", label: "Years Combined Experience" },
  { value: "100%", label: "Client Focused" },
]

export default function HomePage() {
  const featuredPractices = practices.slice(0, 4)
  const featuredAttorneys = attorneys.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <Image
              src="/elegant-law-office-interior-with-navy-blue-and-gol.jpg"
              alt="Law office"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 text-center md:px-6">
            <motion.h1
              className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              LICIT AXIOM
              <br />
              <span className="text-accent">The Only Axiom to Legal Recourse.</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              A federate and coherent rostrum providing clients varied specialised services at varied locations.
              We bring expert professionals, field experts, local lawyers, attorneys and solicitors to your cause.
              A sui generis structure delivering cost-effective legal solutions through dedicated one-point contact.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  asChild
                >
                  <Link href="/practices">Our Practice Areas</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border bg-background py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Our Practice Areas
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We offer comprehensive legal services across key practice areas, providing expert counsel tailored to
                  your specific needs.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredPractices.map((practice, index) => {
                const Icon = iconMap[practice.icon] || Building2
                return (
                  <AnimatedSection key={practice.id} animation="fadeUp" delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="h-full"
                    >
                      <Card className="group bg-card transition-all hover:shadow-lg h-full">
                        <CardContent className="p-6">
                          <motion.div
                            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="h-6 w-6 text-accent" />
                          </motion.div>
                          <h3 className="font-serif text-lg font-semibold text-foreground">{practice.name}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{practice.shortDescription}</p>
                          <Link
                            href={`/practices/${practice.slug}`}
                            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
                          >
                            Learn More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatedSection>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" asChild>
                <Link href="/practices">View All Practice Areas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Why Clients Trust Licit Axiom
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We believe that legal help should be accessible, expert-driven, and results-oriented.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  title: '"Step Into Your Shoes" Approach',
                  description: "We treat your legal challenges with the same urgency and care as if they were our own personal matters.",
                  icon: HeartHandshake
                },
                {
                  title: "Cost-Effective Solutions",
                  description: "Our primary goal is to provide relief that solves your problem without unnecessary financial burden.",
                  icon: Coins
                },
                {
                  title: "Diverse Brain Trust",
                  description: "Our team includes professionals with decades of experience in the bureaucracy, Chartered Accountancy, and Corporate Leadership.",
                  icon: Users
                },
                {
                  title: "Proven Courtroom Success",
                  description: "Our advocates have handled high-stakes cases and secured landmark judgments in the Supreme Court of India, High Courts, and tribunals.",
                  icon: Gavel
                },
                {
                  title: "Comprehensive Coverage",
                  description: "We assist with the entire lifecycle of a business, including company registration, taxation, contract drafting, and mergers.",
                  icon: ShieldCheck
                },
                {
                  title: "Future-Ready Expertise",
                  description: "We stay ahead of the curve by specializing in modern legal areas like drone laws, cybersecurity, data privacy, power and energy and e-commerce.",
                  icon: Zap
                },
                {
                  title: "Deep Industry Knowledge",
                  description: "We have specialized teams for sectors including Banking, Food & Beverage, Hospitality, Real Estate, power and energy, and Pharmaceuticals.",
                  icon: Building2
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border shadow-sm w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.34rem)] xl:w-[calc(25%-1.5rem)] flex flex-col"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Attorneys Section */}
        <section className="py-20 lg:py-28 bg-primary bg-pattern text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                  Meet Our Team
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Our team combines deep legal expertise with business acumen to deliver exceptional results for our
                  clients.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredAttorneys.map((attorney, index) => (
                <AnimatedSection key={attorney.id} animation="fadeUp" delay={index * 0.15}>
                  <Link href={`/attorneys/${attorney.slug}`} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="h-full"
                    >
                      <Card className="overflow-hidden bg-card border-none transition-all hover:shadow-lg h-full">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="h-full w-full"
                          >
                            <Image
                              src={attorney.image || "/placeholder.svg"}
                              alt={attorney.name}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-serif text-lg font-semibold text-foreground">{attorney.name}</h3>
                          <p className="text-sm text-accent">{attorney.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{attorney.practiceAreas.join(" • ")}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="secondary" asChild>
                <Link href="/attorneys">View All Team Members</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 lg:py-24 bg-secondary overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <div className="mx-auto max-w-3xl text-center mb-12">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Trusted by Leading Organizations
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our partners have assisted some of India's most prestigious organizations
                </p>
              </div>
            </AnimatedSection>

            <div className="relative w-full overflow-hidden pause-on-hover">
              <div className="flex w-max animate-scroll whitespace-nowrap items-center">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12 mx-6">
                    {[
                      { name: "ONGC", logo: "/clients/ongc.png" },
                      { name: "Coal India Ltd.", logo: "/clients/coal-india.png" },
                      { name: "BSNL", logo: "/clients/bsnl.png" },
                      { name: "State Bank of India", logo: "/clients/sbi.png" },
                      { name: "PVR Cinemas", logo: "/clients/pvr.png" },
                      { name: "Neemrana Hotels", logo: "/clients/neemrana.png" },
                      { name: "National Housing Bank", logo: "/clients/nhb.png" },
                      { name: "Karim Hotels", logo: "/clients/karims.png" },
                    ].map((client) => (
                      <div key={`${i}-${client.name}`} className="relative h-24 w-48 shrink-0 transition-all duration-300">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-contain mix-blend-multiply"
                        />
                      </div>
                    ))}
                    <div className="text-xl font-serif font-semibold text-muted-foreground shrink-0 px-4">
                      And Many More...
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent z-10" />
            </div>
          </div>
        </section>

        <section className="bg-primary bg-pattern py-20">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Contact us today to schedule a consultation with one of our experienced attorneys. We are here to help you
              navigate complex legal challenges.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
