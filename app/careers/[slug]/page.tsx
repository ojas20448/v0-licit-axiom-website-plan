import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, MapPin, Briefcase, CheckCircle } from "lucide-react"
import careers from "@/data/careers.json"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return careers.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = careers.find((j) => j.slug === slug)

  if (!job) {
    return {
      title: "Position Not Found | Licit Axiom",
    }
  }

  return {
    title: `${job.title} | Careers at Licit Axiom`,
    description: job.description,
  }
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params
  const job = careers.find((j) => j.slug === slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <Link href="/careers" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Link>
          </div>
        </div>

        {/* Job Details */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  </div>
                  <h1 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">{job.title}</h1>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Responsibilities</h2>
                  <ul className="mt-4 space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Requirements</h2>
                  <ul className="mt-4 space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Benefits</h2>
                  <ul className="mt-4 space-y-3">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="font-serif text-xl">Apply for this Position</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-primary-foreground/80">
                        Interested in this role? Send your resume and cover letter to our recruiting team.
                      </p>
                      <Button variant="secondary" className="w-full" asChild>
                        <a href={`mailto:careers@licitaxiom.com?subject=Application for ${job.title}`}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <p className="text-center text-xs text-primary-foreground/60">Or email careers@licitaxiom.com</p>
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
