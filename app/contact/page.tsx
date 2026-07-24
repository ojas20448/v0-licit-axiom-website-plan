"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Phone, Send, CheckCircle, ExternalLink } from "lucide-react"

const practiceAreas = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Litigation",
  "Real Estate",
  "Intellectual Property",
  "Employment Law",
  "Other",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Ready to discuss your legal needs? Our team is here to help. Reach out to schedule a consultation or
                learn more about our services.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Send Us a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we will get back to you within one business day.
                </p>

                {submitted ? (
                  <Card className="mt-8 bg-card">
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">Thank You!</h3>
                      <p className="mt-2 text-muted-foreground">
                        Your message has been received. A member of our team will contact you shortly.
                      </p>
                      <Button className="mt-6" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Amit" required className="bg-card" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Sharma" required className="bg-card" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="amit.sharma@example.com" required className="bg-card" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" className="bg-card" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="practiceArea">Practice Area of Interest</Label>
                      <Select>
                        <SelectTrigger className="bg-card">
                          <SelectValue placeholder="Select a practice area" />
                        </SelectTrigger>
                        <SelectContent>
                          {practiceAreas.map((area) => (
                            <SelectItem key={area} value={area.toLowerCase().replace(/\s+/g, "-")}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe how we can help you..."
                        rows={5}
                        required
                        className="bg-card resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Contact Information</h2>
                  <p className="mt-2 text-muted-foreground">
                    Prefer to reach out directly? Here is how you can contact us.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="bg-card">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Office Address</h3>
                        <p className="mt-1 text-muted-foreground">
                          G-I/75, Lajpat Nagar-1<br />
                          New Delhi 110024
                        </p>
                        <a
                          href="https://share.google/LYXy1OUAUESDdzkWC"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-xs font-semibold text-accent hover:underline"
                        >
                          View Location on Google Maps
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <p className="mt-1 text-muted-foreground">
                          <a href="tel:+911147504976" className="hover:text-accent font-medium text-foreground block text-base">
                            +91 11 47504976
                          </a>
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">Monday - Saturday, 10am - 6pm IST</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="mt-1 text-muted-foreground">
                          <a href="mailto:mail@licitaxiom.com" className="hover:text-accent font-medium text-foreground block text-base">
                            mail@licitaxiom.com
                          </a>
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">We respond within 24 hours</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Map Section */}
                <Card className="overflow-hidden bg-card border border-border shadow-sm">
                  <div className="aspect-video w-full bg-secondary relative">
                    <iframe
                      src="https://maps.google.com/maps?q=G-I%2F75%2C%20Lajpat%20Nagar-1%2C%20New%20Delhi%20110024&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Licit Axiom Office Location"
                    />
                  </div>
                  <div className="p-4 bg-card border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">G-I/75, Lajpat Nagar-1, New Delhi 110024</span>
                    <a
                      href="https://share.google/LYXy1OUAUESDdzkWC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-accent hover:underline"
                    >
                      Open in Maps
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
