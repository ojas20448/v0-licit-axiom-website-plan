import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Target, Users, Handshake, Lightbulb, Scale } from "lucide-react"
import attorneys from "@/data/attorneys.json"

export const metadata: Metadata = {
    title: "About Us | Licit Axiom",
    description:
        "Licit Axiom is a full-service law firm designed to be a one-stop solution for all your legal and business needs.",
}

export default function AboutPage() {
    const featuredAttorneys = attorneys.filter((a) =>
        ["udayan-khandelwal", "surender-kumar", "hem-chandra-pant", "rahul-dubey"].includes(a.slug),
    )

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary py-16 lg:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <AnimatedSection animation="fadeUp">
                                <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                                    About Us
                                </h1>
                                <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                                    Navigating the law can be overwhelming. We bring together diverse experts to provide the high-level
                                    expertise you need with the personal attention you deserve.
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Who We Are */}
                <section className="py-16 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <AnimatedSection animation="slideRight">
                                    <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl relative inline-block">
                                        Who We Are
                                        <span className="absolute -bottom-2 left-0 h-1 w-1/3 bg-accent"></span>
                                    </h2>
                                    <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                                        <p>
                                            Licit Axiom is a full-service law firm and legal consultancy designed to be a one-stop solution
                                            for all your legal and business needs.
                                        </p>
                                        <p>
                                            We operate differently than traditional firms. Instead of just using general lawyers, we utilize a
                                            <span className="font-semibold text-foreground"> &quot;sui generis&quot; structure</span> that brings specific subject-matter experts directly to your case—from local attorneys to specialized field professionals and former high-ranking government officials.
                                        </p>
                                        <p>
                                            Whether you are an individual, a growing startup, or a large corporation, we provide the high-level
                                            expertise you need with the personal attention you deserve.
                                        </p>
                                    </div>
                                </AnimatedSection>
                            </div>
                            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                                <AnimatedSection animation="slideLeft" delay={0.2}>
                                    <Image
                                        src="/elegant-law-office-interior-with-navy-blue-and-gol.jpg"
                                        alt="Licit Axiom Office Interior"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                        <div className="text-white">
                                            <p className="font-serif text-2xl font-bold">Excellence in Practice</p>
                                            <p className="text-white/80 mt-2">Dedicated to your success</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Philosophy */}
                <section className="bg-secondary py-16 lg:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <AnimatedSection animation="fadeUp">
                            <div className="mx-auto max-w-3xl text-center mb-16">
                                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                    Our Philosophy
                                </h2>
                                <p className="mt-4 text-muted-foreground">The core principles that drive our practice</p>
                            </div>
                        </AnimatedSection>

                        <div className="grid gap-8 md:grid-cols-2">
                            <AnimatedSection animation="fadeUp" delay={0.1}>
                                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-8 flex flex-col items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Scale className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">A Sui Generis Structure</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                The name Licit Axiom represents our fundamental belief: that a lawful, ethical approach is the
                                                only true way to resolve a conflict. We operate differently, bringing specialized subject-matter experts directly to your case.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.2}>
                                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-8 flex flex-col items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Target className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Understanding the &quot;Pith&quot;</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Our core philosophy is to handle your work as if it were our own. We endeavor to step into your
                                                shoes to truly understand the &quot;pith&quot; or heart of your situation.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.3}>
                                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-8 flex flex-col items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Lightbulb className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Practical Strategy</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                By looking at the problem from your perspective, we can provide a strategy that isn&apos;t just
                                                legally sound, but also practical and effective for your specific goals.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.4}>
                                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-8 flex flex-col items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Users className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Dedicated Contact</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Every client is assigned a dedicated single point of contact, ensuring clear communication and a
                                                service that is tailored exclusively to your requirements.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Meet Our Experts Teaser */}
                <section className="py-16 lg:py-24 bg-primary bg-pattern text-primary-foreground">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="max-w-2xl">
                                <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-white">
                                    Meet Our Experts
                                </h2>
                                <p className="mt-4 text-white/80 text-lg">
                                    Our team combines deep legal expertise with practical business judgment.
                                </p>
                            </div>
                            <Button variant="secondary" asChild className="shrink-0">
                                <Link href="/attorneys">
                                    View Full Team <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredAttorneys.map((attorney, i) => (
                                <AnimatedSection key={attorney.id} animation="fadeUp" delay={i * 0.1}>
                                    <Link href={`/attorneys/${attorney.slug}`} className="group block h-full">
                                        <div className="relative h-full overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300 p-4 flex flex-col items-center text-center">
                                            <div className="relative h-24 w-24 mb-4 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
                                                <Image
                                                    src={attorney.image}
                                                    alt={attorney.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <h3 className="font-serif text-lg font-semibold text-white group-hover:text-accent transition-colors">
                                                {attorney.name}
                                            </h3>
                                            <p className="text-sm text-white/60 mb-2">{attorney.title}</p>
                                        </div>
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
