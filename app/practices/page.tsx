import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowRight, Building2, Handshake, Scale, Home, Lightbulb, Users } from "lucide-react"
import practices from "@/data/practices.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Practice Areas | Licit Axiom",
  description:
    "Explore our comprehensive legal services including corporate law, M&A, litigation, real estate, intellectual property, and employment law.",
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary bg-pattern py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <AnimatedSection animation="fadeUp">
                <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                  Practice Areas
                </h1>
                <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                  We provide comprehensive legal services across a wide range of practice areas. Our experienced attorneys
                  deliver strategic counsel tailored to your specific needs.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {practices.map((practice, index) => {
                const Icon = iconMap[practice.icon] || Building2
                return (
                  <AnimatedSection key={practice.id} animation="fadeUp" delay={index * 0.1}>
                    <Link href={`/practices/${practice.slug}`} className="group h-full block">
                      <Card className="h-full bg-card transition-colors hover:bg-secondary">
                        <CardContent className="p-6">
                          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                            <Icon className="h-7 w-7 text-accent" />
                          </div>
                          <h2 className="font-serif text-xl font-semibold text-foreground">{practice.name}</h2>
                          <p className="mt-3 text-muted-foreground leading-relaxed">{practice.shortDescription}</p>
                          <div className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:text-accent">
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4" />
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
