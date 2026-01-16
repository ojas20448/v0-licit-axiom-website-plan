import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import attorneys from "@/data/attorneys.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team | Licit Axiom",
  description:
    "Meet the experienced attorneys at Licit Axiom. Our team brings decades of legal expertise across corporate law, M&A, litigation, and more.",
}

export default function AttorneysPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary bg-pattern py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <AnimatedSection animation="fadeUp">
                <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                  Our Team
                </h1>
                <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                  Our team combines deep legal expertise with practical business judgment to deliver exceptional results.
                  Each attorney brings unique experience and perspectives to serve our clients.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Attorneys Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attorneys.map((attorney, index) => (
                <AnimatedSection key={attorney.id} animation="fadeUp" delay={index * 0.1}>
                  <Link href={`/attorneys/${attorney.slug}`} className="group h-full block">
                    <Card className="h-full overflow-hidden bg-card transition-colors hover:bg-secondary">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={attorney.image || "/placeholder.svg"}
                          alt={attorney.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h2 className="font-serif text-xl font-semibold text-foreground">{attorney.name}</h2>
                        <p className="text-sm font-medium text-accent">{attorney.title}</p>
                        <p className="mt-3 text-sm text-muted-foreground">{attorney.practiceAreas.join(" • ")}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{attorney.experience}</p>
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
