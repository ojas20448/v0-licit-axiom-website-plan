import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Lightbulb, Scale } from "lucide-react"

export const metadata: Metadata = {
    title: "About Us | Licit Axiom",
    description:
        "We bring together diverse experts to deliver expert-driven legal and business counsel with the precision, responsiveness, and personalised attention that you deserve.",
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
                            <AnimatedSection animation="fadeUp">
                                <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                                    About Us
                                </h1>
                                <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                                    We bring together diverse experts to deliver expert-driven legal and business counsel with the precision, responsiveness, and personalised attention that you deserve.
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
                                <p className="mt-4 text-muted-foreground">The core principles that drive us</p>
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
                                                We bring together diverse experts to deliver strategic, expert-driven legal and business counsel with precision, responsiveness, and the personalised attention every client deserves.
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
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Understanding the Path</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Our approach is rooted in developing a comprehensive understanding of each client’s objectives, challenges, and commercial realities. By examining the path of every matter, we aim to deliver practical, strategic, and result-oriented legal solutions tailored to our clients’ specific needs.
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
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Strategic Thinking</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We adopt a forward-thinking approach, combining legal insight with practical understanding to develop strategies that address complex challenges with clarity, innovation, and commercial sensibility.
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
