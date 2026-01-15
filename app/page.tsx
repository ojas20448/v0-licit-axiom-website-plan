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
import { ArrowRight, Building2, Handshake, Scale, Home, Lightbulb, Users, Award, Globe, Clock } from "lucide-react"
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
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Why Choose Licit Axiom?
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  For over two decades, we have been the trusted legal partner for businesses navigating complex
                  challenges. Our commitment to excellence and client service sets us apart.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Industry Recognition</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Ranked among top law firms by Chambers & Partners and Legal 500.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Global Reach</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Cross-border expertise with a network spanning major financial centers.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Responsive Service</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        24/7 availability for urgent matters with dedicated client teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/professional-law-team-meeting-in-modern-conference.jpg"
                  alt="Our team in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Attorneys Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Meet Our Team
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
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
                      <Card className="overflow-hidden bg-card transition-all hover:shadow-lg h-full">
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
              <Button variant="outline" asChild>
                <Link href="/attorneys">View All Team Members</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Trusted by Leading Organizations
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our partners have assisted some of India's most prestigious organizations
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-12">
              <AnimatedSection animation="fadeIn" delay={0.2}>
                <h3 className="text-center text-sm font-semibold text-accent mb-6">EMPANELLED WITH</h3>
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-12">
                {["ONGC", "Coal India Ltd.", "BSNL", "State Bank of India"].map((client, index) => (
                  <AnimatedSection key={client} animation="fadeUp" delay={0.3 + index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="flex items-center justify-center p-6 bg-card rounded-lg border border-border h-full"
                    >
                      <span className="font-semibold text-foreground text-center">{client}</span>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>

              <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">SELECT CLIENTS</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {[
                  "PVR Cinemas",
                  "Neemrana Hotels",
                  "National Housing Bank",
                  "Karim Hotels",
                  "Promotech Fabrication",
                  "Premier Safeguards",
                  "Keltech Infrastructure",
                  "YG Consulting",
                  "Pedo Planet Dental",
                  "Hi-Tech Sweet Water"
                ].map((client) => (
                  <div key={client} className="flex items-center justify-center p-4 bg-background rounded border border-border">
                    <span className="text-sm text-muted-foreground text-center">{client}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20">
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
