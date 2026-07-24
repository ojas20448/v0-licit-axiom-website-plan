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

export default function HomePage() {
  const featuredPractices = practices.slice(0, 4)
  const featuredSlugs = ["udayan-khandelwal", "rahul-dubey"]
  const featuredAttorneys = featuredSlugs
    .map((slug) => attorneys.find((a) => a.slug === slug))
    .filter(Boolean) as typeof attorneys

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

          <div className="container relative z-10 mx-auto px-4 py-20 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 inline-block"
            >
              <Image
                src="/images/licit-axiom-logo-gold.png"
                alt="Licit Axiom Logo"
                width={220}
                height={180}
                className="h-20 md:h-28 w-auto mx-auto object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
            <motion.h1
              className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              LICIT AXIOM
            </motion.h1>
            <motion.p
              className="mx-auto mt-3 text-lg font-semibold tracking-widest text-accent uppercase font-serif md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              Advocates &amp; Solicitors
            </motion.p>
            <motion.div
              className="mx-auto mt-6 max-w-3xl text-sm md:text-base text-primary-foreground/80 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <p className="mb-6">
                An integrated legal platform, offering a full spectrum of specialized legal services, across multiple forums and jurisdictions. Our strength lies in our team of experienced professionals and domain experts. Backed by our dedicated in-house team and strategic collaborations we deliver practical solutions to even the most complex legal problems with a commitment to professionalism, responsiveness, and result-oriented legal counsel.
              </p>
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-6 border-t border-primary-foreground/10 pt-6 text-left max-w-2xl mx-auto">
                <div className="flex-1">
                  <span className="text-accent font-semibold tracking-wider block text-xs uppercase mb-1 font-serif">One Point Contact</span>
                  <p className="text-xs md:text-sm text-primary-foreground/70">
                    Delivering cost-effective, seamless legal solutions through a single, dedicated point of contact for every client.
                  </p>
                </div>
                <div className="w-px bg-primary-foreground/10 hidden md:block" />
                <div className="flex-1">
                  <span className="text-accent font-semibold tracking-wider block text-xs uppercase mb-1 font-serif">Our Clients</span>
                  <p className="text-xs md:text-sm text-primary-foreground/70">
                    Our client list has prominent business entities, including corporates, start-ups, HNIs, reputed NGOs, as well as Insolvency professionals among others.
                  </p>
                </div>
              </div>
            </motion.div>
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
                  Meet Our Leadership
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Our partners bring deep legal expertise, strategic vision, and commitment to delivering practical, result-oriented legal counsel.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {featuredAttorneys.map((attorney, index) => {
                const cleanName = attorney.name.replace(/^(Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs|Dr\.|Dr)\s+/i, "").trim()
                const nameParts = cleanName.split(" ").filter(Boolean)
                const initials = nameParts.length >= 2
                  ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                  : cleanName.slice(0, 2).toUpperCase()
                const hasRealImage = attorney.image && !attorney.image.includes("placeholder")

                return (
                  <AnimatedSection key={attorney.id} animation="fadeUp" delay={index * 0.15}>
                    <Link href={`/attorneys/${attorney.slug}`} className="group block h-full">
                      <motion.div
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className="h-full"
                      >
                        <Card className="overflow-hidden bg-card border border-border/80 group-hover:border-accent/60 transition-all hover:shadow-xl h-full flex flex-col justify-between">
                          {/* Header Avatar / Monogram Section */}
                          <div className="relative h-48 bg-gradient-to-br from-slate-950 via-primary to-slate-900 overflow-hidden flex flex-col items-center justify-center border-b border-accent/20">
                            <Scale className="absolute -right-4 -bottom-4 h-32 w-32 text-accent/5 -rotate-12 pointer-events-none" />
                            {hasRealImage ? (
                              <Image
                                src={attorney.image}
                                alt={attorney.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center space-y-2 z-10">
                                <div className="h-20 w-20 rounded-full bg-accent/15 border-2 border-accent/60 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-accent group-hover:scale-105 transition-all duration-300">
                                  <span className="font-serif text-2xl font-bold text-accent tracking-wider">
                                    {initials}
                                  </span>
                                </div>
                                <span className="text-[10px] tracking-widest text-accent/80 font-mono uppercase">
                                  Licit Axiom
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Card Content */}
                          <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                                  {attorney.title}
                                </span>
                                <span className="text-[11px] text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full font-medium">
                                  {attorney.experience}
                                </span>
                              </div>
                              <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                                {attorney.name}
                              </h3>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {attorney.bio}
                            </p>

                            {/* Practice Area Badges */}
                            <div className="space-y-3 pt-2">
                              <div className="flex flex-wrap gap-1.5">
                                {attorney.practiceAreas.slice(0, 3).map((practice) => (
                                  <span
                                    key={practice}
                                    className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-secondary text-foreground/80 border border-border/60"
                                  >
                                    {practice}
                                  </span>
                                ))}
                                {attorney.practiceAreas.length > 3 && (
                                  <span className="inline-block px-2 py-1 rounded-md text-[11px] font-medium bg-secondary text-muted-foreground">
                                    +{attorney.practiceAreas.length - 3} more
                                  </span>
                                )}
                              </div>

                              <div className="pt-3 border-t border-border/40 flex items-center text-xs font-semibold text-accent group-hover:text-accent/80 transition-colors">
                                <span>View Full Profile</span>
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Button variant="secondary" asChild>
                <Link href="/attorneys">View Full Team & Advisors</Link>
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
