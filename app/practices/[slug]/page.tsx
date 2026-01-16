import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, ArrowRight, CheckCircle, Building2, Handshake, Scale, Home, Lightbulb, Users } from "lucide-react"
import practices from "@/data/practices.json"
import attorneys from "@/data/attorneys.json"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Handshake,
  Scale,
  Home,
  Lightbulb,
  Users,
}

export async function generateStaticParams() {
  return practices.map((practice) => ({
    slug: practice.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const practice = practices.find((p) => p.slug === slug)

  if (!practice) {
    return {
      title: "Practice Area Not Found | Licit Axiom",
    }
  }

  return {
    title: `${practice.name} | Licit Axiom`,
    description: practice.description,
  }
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params
  const practice = practices.find((p) => p.slug === slug)

  if (!practice) {
    notFound()
  }

  const Icon = iconMap[practice.icon] || Building2
  const keyAttorneys = attorneys.filter((a) => practice.keyAttorneys.includes(a.slug))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <Link
              href="/practices"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Practice Areas
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        {/* Hero Section */}
        <section className="bg-primary bg-pattern py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-start gap-6">
              <AnimatedSection animation="scale" className="hidden md:block">
                <div className="h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/20 flex">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
              </AnimatedSection>
              <div>
                <AnimatedSection animation="fadeUp">
                  <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">{practice.name}</h1>
                  <p className="mt-4 max-w-3xl text-lg text-primary-foreground/80 leading-relaxed">
                    {practice.description}
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Services */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Our Services</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {practice.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="mt-6">
                    {practice.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Key Attorneys */}
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">Key Attorneys</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {keyAttorneys.map((attorney) => (
                        <Link
                          key={attorney.id}
                          href={`/attorneys/${attorney.slug}`}
                          className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-secondary"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={attorney.image || "/placeholder.svg"}
                              alt={attorney.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{attorney.name}</p>
                            <p className="truncate text-sm text-muted-foreground">{attorney.title}</p>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-semibold">Need Legal Assistance?</h3>
                      <p className="mt-2 text-sm text-primary-foreground/80">
                        Contact us to discuss how we can help with your {practice.name.toLowerCase()} matters.
                      </p>
                      <Button variant="secondary" className="mt-4 w-full" asChild>
                        <Link href="/contact">
                          Schedule Consultation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
