import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Mail, Phone, GraduationCap, Briefcase, FileText } from "lucide-react"
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
    description: attorney.bio,
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
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={attorney.image || "/placeholder.svg"}
                      alt={attorney.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

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
                        <Link href={`/contact?attorney=${attorney.slug}`}>Contact {attorney.name.split(" ")[0]}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Header */}
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

                  {/* Bio */}
                  <div>
                    <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
                      <Briefcase className="h-5 w-5 text-accent" />
                      Biography
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{attorney.bio}</p>
                  </div>

                  {/* Education */}
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

                  {/* Publications */}
                  {attorney.publications.length > 0 && (
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
