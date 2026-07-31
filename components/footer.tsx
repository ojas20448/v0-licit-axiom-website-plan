import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

const navigation = {
  practices: [
    { name: "Corporate Law", href: "/practices/corporate-commercial" },
    { name: "Mergers & Acquisitions", href: "/practices/mergers-acquisitions" },
    { name: "Litigation", href: "/practices/litigation" },
    { name: "Real Estate", href: "/practices/real-estate" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Team", href: "/attorneys" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
        {/* Two-up on phones so four columns become two short rows rather than
            one four-deep stack. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 space-y-3 lg:col-span-1 lg:space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/licit-axiom-logo-dark.png"
                alt="Licit Axiom Legal Consultants"
                width={280}
                height={220}
                className="h-10 sm:h-16 md:h-24 w-auto object-contain"
              />
            </Link>
            <p className="max-w-prose text-sm text-muted-foreground leading-relaxed">
              Expert legal counsel for businesses and individuals. Trusted advisors in corporate law, M&A, litigation,
              and more.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground lg:mb-4">Practice Areas</h3>
            <ul className="lg:space-y-2">
              {navigation.practices.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-primary lg:min-h-0"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground lg:mb-4">Company</h3>
            <ul className="lg:space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-primary lg:min-h-0"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-foreground lg:mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a
                    href="https://share.google/LYXy1OUAUESDdzkWC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors block"
                    title="Open location in Google Maps"
                  >
                    <p>G-I/75, Lajpat Nagar-1</p>
                    <p>New Delhi 110024</p>
                  </a>
                </div>
              </li>
              {/* Phone and email are the two highest-intent taps in the footer;
                  give them a full-height hit area rather than a 20px text line. */}
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="tel:+911147504976" className="flex min-h-11 items-center hover:text-primary sm:min-h-0">
                    +91 11 47504976
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="mailto:mail@licitaxiom.com" className="flex min-h-11 items-center hover:text-primary sm:min-h-0">
                    mail@licitaxiom.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 lg:mt-12 lg:pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Licit Axiom LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
