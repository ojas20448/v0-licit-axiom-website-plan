import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, Mail, Phone, GraduationCap, Briefcase, FileText, Scale } from "lucide-react"
import attorneys from "@/data/attorneys.json"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return attorneys.map((attorney) => ({
    slug: attorney.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const attorney = attorneys.find((a) => a.slug === slug)

  if (!attorney) {
    return {
      title: "Attorney Not Found | Licit Axiom",
    }
  }

  return {
    title: `${attorney.name} - ${attorney.title} | Licit Axiom`,
    description: attorney.bio.split("\n")[0],
  }
}

export default async function AttorneyPage({ params }: Props) {
  const { slug } = await params
  const attorney = attorneys.find((a) => a.slug === slug)

  if (!attorney) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <Link
              href="/attorneys"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Attorneys
            </Link>
          </div>
        </div>

        {/* Attorney Profile */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <AnimatedSection animation="scale">
                    {attorney.image && !attorney.image.includes("placeholder") ? (
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border shadow-md">
                        <Image
                          src={attorney.image}
                          alt={attorney.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-primary to-slate-900 flex flex-col items-center justify-center border border-accent/30 shadow-lg">
                        <Scale className="absolute -right-4 -bottom-4 h-36 w-36 text-accent/5 -rotate-12 pointer-events-none" />
                        <div className="flex flex-col items-center justify-center space-y-3 z-10 p-6 text-center">
                          <div className="h-24 w-24 rounded-full bg-accent/15 border-2 border-accent/60 flex items-center justify-center shadow-xl shadow-black/40">
                            <span className="font-serif text-3xl font-bold text-accent tracking-wider">
                              {(() => {
                                const clean = attorney.name.replace(/^(Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs|Dr\.|Dr)\s+/i, "").trim()
                                const parts = clean.split(" ").filter(Boolean)
                                return parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : clean.slice(0, 2).toUpperCase()
                              })()}
                            </span>
                          </div>
                          <span className="text-xs tracking-widest text-accent/80 font-mono uppercase font-semibold">
                            Licit Axiom
                          </span>
                        </div>
                      </div>
                    )}
                  </AnimatedSection>

                  <AnimatedSection animation="fadeUp" delay={0.1}>
                    <Card className="bg-card">
                      <CardContent className="space-y-4 p-6">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-accent" />
                          <a href={`mailto:${attorney.email}`} className="text-sm text-foreground hover:text-accent">
                            {attorney.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-accent" />
                          <a href={`tel:${attorney.phone}`} className="text-sm text-foreground hover:text-accent">
                            {attorney.phone}
                          </a>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href={`/contact?attorney=${attorney.slug}`}>
                            Contact {attorney.name.replace(/^(Mr\.?|Ms\.?|Mrs\.?|Dr\.?)\s+/i, "").split(" ")[0]}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Header */}
                  <AnimatedSection animation="fadeUp">
                    <div>
                      <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{attorney.name}</h1>
                      <p className="mt-2 text-xl text-accent">{attorney.title}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {attorney.practiceAreas.map((area) => (
                          <span key={area} className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Bio */}
                  <AnimatedSection animation="fadeUp" delay={0.1}>
                    <div>
                      <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
                        <Briefcase className="h-5 w-5 text-accent" />
                        Biography
                      </h2>
                      <p className="mt-4 whitespace-pre-line text-muted-foreground leading-relaxed">{attorney.bio}</p>
                    </div>
                  </AnimatedSection>

                  {/* Education */}
                  <AnimatedSection animation="fadeUp" delay={0.2}>
                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-serif text-lg">
                          <GraduationCap className="h-5 w-5 text-accent" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {attorney.education.map((edu, index) => (
                            <li key={index} className="text-muted-foreground">
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedSection>

                  {/* Publications */}
                  {attorney.publications.length > 0 && (
                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <Card className="bg-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 font-serif text-lg">
                            <FileText className="h-5 w-5 text-accent" />
                            Publications
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {attorney.publications.map((pub, index) => (
                              <li key={index} className="text-muted-foreground">
                                {pub}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  )}
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
