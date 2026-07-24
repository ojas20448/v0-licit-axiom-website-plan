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
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/licit-axiom-logo-dark.png"
                alt="Licit Axiom Legal Consultants"
                width={200}
                height={160}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Expert legal counsel for businesses and individuals. Trusted advisors in corporate law, M&A, litigation,
              and more.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Practice Areas</h3>
            <ul className="space-y-2">
              {navigation.practices.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
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
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="tel:+911147504976" className="hover:text-primary block">
                    +91 11 47504976
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="mailto:mail@licitaxiom.com" className="hover:text-primary block">
                    mail@licitaxiom.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Licit Axiom LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
