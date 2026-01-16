import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"

export const metadata: Metadata = {
    title: "About Us | Licit Axiom",
    description:
        "Licit Axiom is a full-service law firm designed to be a one-stop solution for all your legal and business needs.",
}

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary py-16 lg:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                                About Us
                            </h1>
                            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                                Navigating the law can be overwhelming. We bring together diverse experts to provide the high-level expertise you need with the personal attention you deserve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Content */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <AnimatedSection animation="slideRight">
                                    <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                        Who We Are
                                    </h2>
                                    <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
                                        <p>
                                            Licit Axiom is a full-service law firm and legal consultancy designed to be a one-stop solution for all your legal and business needs.
                                        </p>
                                        <p>
                                            We understand that navigating the law can be overwhelming, which is why we have built a team that brings together diverse experts—from local attorneys and solicitors to specialized field professionals and former high-ranking government officials.
                                        </p>
                                        <p>
                                            Our practice covers everything from courtroom litigation and dispute resolution (like arbitration and mediation) to business advisory, real estate, intellectual property, and government compliance. Whether you are an individual, a growing startup, or a large corporation, we provide the high-level expertise you need with the personal attention you deserve.
                                        </p>
                                    </div>
                                </AnimatedSection>
                            </div>
                            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-lg">
                                <AnimatedSection animation="slideLeft" delay={0.2}>
                                    <Image
                                        src="/elegant-law-office-interior-with-navy-blue-and-gol.jpg"
                                        alt="Licit Axiom Office"
                                        fill
                                        className="object-cover"
                                    />
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Philosophy */}
                <section className="bg-secondary py-16 lg:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <AnimatedSection animation="fadeUp">
                            <div className="mx-auto max-w-3xl text-center mb-12">
                                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                    Detailed Philosophy
                                </h2>
                                <div className="h-1 w-20 bg-accent mx-auto mt-6"></div>
                            </div>
                        </AnimatedSection>

                        <div className="grid gap-12 lg:grid-cols-2">
                            <AnimatedSection animation="fadeUp" delay={0.1}>
                                <div className="bg-card p-8 rounded-lg shadow-sm border border-border h-full">
                                    <h3 className="text-xl font-bold text-foreground mb-4 font-serif">A Sui Generis Structure</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        The name Licit Axiom represents our fundamental belief: that a lawful, ethical approach is the only true way to resolve a conflict. We operate differently than traditional firms; instead of just using general lawyers, we utilize a sui generis structure that brings specific subject-matter experts directly to your case.
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.2}>
                                <div className="bg-card p-8 rounded-lg shadow-sm border border-border h-full">
                                    <h3 className="text-xl font-bold text-foreground mb-4 font-serif">Understanding the "Pith"</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Our core philosophy is to handle your work as if it were our own. We don’t just offer a standard legal service; we endeavor to step into your shoes to truly understand the "pith" or heart of your situation.
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.3}>
                                <div className="bg-card p-8 rounded-lg shadow-sm border border-border h-full">
                                    <h3 className="text-xl font-bold text-foreground mb-4 font-serif">Practical Strategy</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        By looking at the problem from your perspective, we can provide a strategy that isn't just legally sound, but also practical and effective for your specific goals.
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeUp" delay={0.4}>
                                <div className="bg-card p-8 rounded-lg shadow-sm border border-border h-full">
                                    <h3 className="text-xl font-bold text-foreground mb-4 font-serif">Dedicated Contact</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Every client is assigned a dedicated single point of contact, ensuring clear communication and a service that is tailored exclusively to your requirements.
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
