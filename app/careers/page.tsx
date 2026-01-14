import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react"
import careers from "@/data/careers.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | Licit Axiom",
  description: "Join our team of talented legal professionals. Explore career opportunities at Licit Axiom.",
}

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Join Our Team
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                We are always looking for talented individuals who share our commitment to excellence and client
                service. Explore our current openings and take the next step in your legal career.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Why Join Licit Axiom?
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">Challenging Work</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Work on complex, high-stakes matters alongside experienced attorneys.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">Work-Life Balance</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Flexible arrangements and supportive culture that values your wellbeing.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">Growth Opportunities</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Clear paths to advancement with mentorship and professional development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">Open Positions</h2>
            <div className="mt-8 space-y-4">
              {careers.map((job) => (
                <Link key={job.id} href={`/careers/${job.slug}`} className="group block">
                  <Card className="bg-card transition-colors hover:bg-card/80">
                    <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{job.type}</Badge>
                        <ArrowRight className="h-5 w-5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
