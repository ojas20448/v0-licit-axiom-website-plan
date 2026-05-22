import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { AttorneysList } from "@/components/attorneys-list"
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
        <section className="bg-primary bg-pattern pt-16 pb-12 lg:pt-24 lg:pb-16">
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
        <section className="pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <AttorneysList initialAttorneys={attorneys} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
